import { put } from '@vercel/blob';
import connectDB from './lib/mongodb.js';
import Content from './lib/Content.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const contentType = req.headers['content-type'] || '';
    
    if (!contentType.includes('multipart/form-data')) {
      // JSON body for content without files
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      const data = JSON.parse(body);
      const content = new Content(data);
      const savedContent = await content.save();
      return res.status(201).json(savedContent);
    }

    // For file uploads, use Vercel Blob
    const formData = await parseMultipartForm(req);
    const contentData = { ...formData.fields };

    if (formData.files.image) {
      const blob = await put(formData.files.image.filename, formData.files.image.data, {
        access: 'public',
      });
      contentData.image = blob.url;
    }

    if (formData.files.video) {
      const blob = await put(formData.files.video.filename, formData.files.video.data, {
        access: 'public',
      });
      contentData.video = blob.url;
    }

    const content = new Content(contentData);
    const savedContent = await content.save();
    return res.status(201).json(savedContent);

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: error.message });
  }
}

async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    let data = Buffer.alloc(0);

    req.on('data', (chunk) => {
      data = Buffer.concat([data, chunk]);
    });

    req.on('end', () => {
      const result = { fields: {}, files: {} };
      const parts = data.toString('binary').split(`--${boundary}`);

      for (const part of parts) {
        if (part.includes('Content-Disposition')) {
          const nameMatch = part.match(/name="([^"]+)"/);
          const filenameMatch = part.match(/filename="([^"]+)"/);
          
          if (nameMatch) {
            const name = nameMatch[1];
            const contentStart = part.indexOf('\r\n\r\n') + 4;
            const contentEnd = part.lastIndexOf('\r\n');
            const content = part.slice(contentStart, contentEnd);

            if (filenameMatch) {
              result.files[name] = {
                filename: `${Date.now()}-${filenameMatch[1]}`,
                data: Buffer.from(content, 'binary'),
              };
            } else {
              result.fields[name] = content;
            }
          }
        }
      }
      resolve(result);
    });

    req.on('error', reject);
  });
}
