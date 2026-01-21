import { useState, useEffect } from 'react';
import { getContentByType } from '../api/content';
import { Palette, X } from 'lucide-react';
import './Authors.css';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getContentByType('author');
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const closeModal = () => setSelectedAuthor(null);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="authors-page">
      <div className="authors-header">
        <h1>Authors</h1>
        <p>Meet the talented creators behind our featured animations</p>
      </div>

      {authors.length > 0 ? (
        <div className="authors-grid">
          {authors.map((author) => (
            <div 
              key={author._id} 
              className="author-card"
              onClick={() => setSelectedAuthor(author)}
            >
              <div className="author-avatar">
                {author.image ? (
                  <img 
                    src={author.image.startsWith('http') ? author.image : `http://localhost:5000${author.image}`} 
                    alt={author.title} 
                  />
                ) : (
                  <div className="author-placeholder">
                    <span>{author.title?.charAt(0) || '?'}</span>
                  </div>
                )}
              </div>
              <div className="author-info">
                <h3>{author.title}</h3>
                {author.country && <p className="author-country">{author.country}</p>}
                {author.bio && (
                  <p className="author-bio">{author.bio.substring(0, 100)}...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-authors">
          <div className="no-authors-icon"><Palette size={64} /></div>
          <h3>Coming Soon</h3>
          <p>Our author profiles are being prepared. Check back soon!</p>
        </div>
      )}

      {selectedAuthor && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content author-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={20} /></button>
            <div className="author-modal-body">
              <div className="author-modal-header">
                <div className="author-modal-avatar">
                  {selectedAuthor.image ? (
                    <img 
                      src={selectedAuthor.image.startsWith('http') ? selectedAuthor.image : `http://localhost:5000${selectedAuthor.image}`} 
                      alt={selectedAuthor.title} 
                    />
                  ) : (
                    <div className="author-placeholder large">
                      <span>{selectedAuthor.title?.charAt(0) || '?'}</span>
                    </div>
                  )}
                </div>
                <div className="author-modal-info">
                  <h2>{selectedAuthor.title}</h2>
                  {selectedAuthor.country && (
                    <p className="author-modal-country">{selectedAuthor.country}</p>
                  )}
                  {selectedAuthor.website && (
                    <a 
                      href={selectedAuthor.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="author-website"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
              {selectedAuthor.bio && (
                <div className="author-modal-bio">
                  <h4>Biography</h4>
                  <p>{selectedAuthor.bio}</p>
                </div>
              )}
              {selectedAuthor.video && (
                <div className="author-modal-video">
                  <h4>Featured Work</h4>
                  <video controls>
                    <source src={selectedAuthor.video.startsWith('http') ? selectedAuthor.video : `http://localhost:5000${selectedAuthor.video}`} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authors;
