import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';

dotenv.config();

const sampleData = [
  // About content
  {
    type: 'about',
    title: 'Our History',
    description: 'OLHO Animation Festival was founded with a vision to celebrate the art of animation from around the world. Since our inception, we have showcased hundreds of animated works from emerging and established artists, creating a vibrant community of animation enthusiasts.',
    order: 1
  },
  {
    type: 'about',
    title: 'The Festival Experience',
    description: 'Each year, OLHO brings together filmmakers, artists, and audiences for a unique celebration of animated storytelling. From traditional hand-drawn animation to cutting-edge digital techniques, our program features diverse styles and perspectives from across the globe.',
    order: 2
  },
  // Authors
  {
    type: 'author',
    title: 'Maria Santos',
    country: 'Portugal',
    bio: 'Maria Santos is an award-winning animator known for her distinctive visual style that blends traditional techniques with digital innovation. Her work explores themes of memory, identity, and the passage of time.',
    website: 'https://example.com/maria',
    order: 1
  },
  {
    type: 'author',
    title: 'João Silva',
    country: 'Brazil',
    bio: 'João Silva brings stories to life through vibrant colors and fluid motion. His animations have been featured in festivals worldwide and have earned recognition for their emotional depth and technical excellence.',
    order: 2
  },
  {
    type: 'author',
    title: 'Ana Costa',
    country: 'Spain',
    bio: 'Ana Costa is a stop-motion animator whose intricate puppet work has captivated audiences globally. Her films often feature fantastical worlds populated by memorable characters.',
    order: 3
  },
  // Films
  {
    type: 'film',
    title: 'The Last Light',
    description: 'A poetic journey through a world where light is fading, following a young girl who discovers she holds the key to bringing color back to her village.',
    year: 2024,
    duration: '12 min',
    country: 'Portugal',
    order: 1
  },
  {
    type: 'film',
    title: 'Paper Dreams',
    description: 'An origami crane comes to life and embarks on an adventure through a bustling city, discovering the beauty in everyday moments.',
    year: 2024,
    duration: '8 min',
    country: 'Japan',
    order: 2
  },
  {
    type: 'film',
    title: 'Echoes of Tomorrow',
    description: 'In a future where memories can be shared, a young artist must decide whether to preserve the past or embrace an uncertain future.',
    year: 2023,
    duration: '15 min',
    country: 'France',
    order: 3
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Content.deleteMany({});
    console.log('Cleared existing content');

    // Insert sample data
    await Content.insertMany(sampleData);
    console.log('Sample data inserted successfully');

    // Link films to authors (optional - for demonstration)
    const authors = await Content.find({ type: 'author' });
    const films = await Content.find({ type: 'film' });

    if (authors.length > 0 && films.length > 0) {
      for (let i = 0; i < films.length; i++) {
        films[i].authorId = authors[i % authors.length]._id;
        await films[i].save();
      }
      console.log('Films linked to authors');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
