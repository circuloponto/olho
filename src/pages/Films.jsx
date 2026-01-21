import { useState, useEffect } from 'react';
import { getContentByType } from '../api/content';
import { Play, Film, X } from 'lucide-react';
import './Films.css';

function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getContentByType('film');
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  const closeModal = () => setSelectedFilm(null);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="films-page">
      <div className="films-header">
        <h1>Films</h1>
        <p>Discover our curated selection of animated works</p>
      </div>

      {films.length > 0 ? (
        <div className="films-grid">
          {films.map((film) => (
            <div 
              key={film._id} 
              className="film-card"
              onClick={() => setSelectedFilm(film)}
            >
              <div className="film-poster">
                {film.image ? (
                  <img 
                    src={film.image.startsWith('http') ? film.image : `http://localhost:5000${film.image}`} 
                    alt={film.title} 
                  />
                ) : (
                  <div className="film-placeholder">
                    <Film size={48} />
                  </div>
                )}
                <div className="film-overlay">
                  <span className="play-icon"><Play size={24} /></span>
                </div>
              </div>
              <div className="film-info">
                <h3>{film.title}</h3>
                {film.authorId && (
                  <p className="film-author">by {film.authorId.title}</p>
                )}
                <div className="film-meta">
                  {film.year && <span>{film.year}</span>}
                  {film.duration && <span>{film.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-films">
          <div className="no-films-icon"><Film size={64} /></div>
          <h3>Coming Soon</h3>
          <p>Our film selection is being curated. Check back soon!</p>
        </div>
      )}

      {selectedFilm && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={20} /></button>
            <div className="modal-body">
              {selectedFilm.video ? (
                <video controls autoPlay>
                  <source src={selectedFilm.video.startsWith('http') ? selectedFilm.video : `http://localhost:5000${selectedFilm.video}`} type="video/mp4" />
                </video>
              ) : selectedFilm.image ? (
                <img 
                  src={selectedFilm.image.startsWith('http') ? selectedFilm.image : `http://localhost:5000${selectedFilm.image}`} 
                  alt={selectedFilm.title} 
                />
              ) : null}
              <div className="modal-info">
                <h2>{selectedFilm.title}</h2>
                {selectedFilm.authorId && (
                  <p className="modal-author">by {selectedFilm.authorId.title}</p>
                )}
                <div className="modal-meta">
                  {selectedFilm.year && <span>Year: {selectedFilm.year}</span>}
                  {selectedFilm.duration && <span>Duration: {selectedFilm.duration}</span>}
                  {selectedFilm.country && <span>Country: {selectedFilm.country}</span>}
                </div>
                {selectedFilm.description && (
                  <p className="modal-description">{selectedFilm.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Films;
