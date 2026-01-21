import { useState, useEffect } from 'react';
import { getContentByType } from '../api/content';
import './About.css';

function About() {
  const [aboutContent, setAboutContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentByType('about');
        setAboutContent(data);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About OLHO</h1>
        <p className="about-intro">
          OLHO is an animation festival dedicated to celebrating the art of animation 
          in all its forms. Our mission is to bring together animators, filmmakers, 
          and audiences to experience the magic of animated storytelling.
        </p>
      </div>

      {aboutContent.length > 0 ? (
        <div className="about-sections">
          {aboutContent.map((section) => (
            <div key={section._id} className="about-section">
              {section.image && (
                <div className="section-image">
                  <img 
                    src={section.image.startsWith('http') ? section.image : `http://localhost:5000${section.image}`} 
                    alt={section.title} 
                  />
                </div>
              )}
              <div className="section-content">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              {section.video && (
                <div className="section-video">
                  <video controls>
                    <source src={section.video.startsWith('http') ? section.video : `http://localhost:5000${section.video}`} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="about-default">
          <div className="about-grid">
            <div className="about-card">
              <h3>Our Vision</h3>
              <p>
                To create a platform where animation is celebrated as a powerful 
                medium for storytelling, artistic expression, and cultural exchange.
              </p>
            </div>
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>
                To discover, showcase, and promote exceptional animated works from 
                around the world, fostering connections between creators and audiences.
              </p>
            </div>
            <div className="about-card">
              <h3>The Festival</h3>
              <p>
                OLHO brings together short films, feature animations, experimental 
                works, and interactive experiences in a celebration of the animated arts.
              </p>
            </div>
            <div className="about-card">
              <h3>Community</h3>
              <p>
                We believe in building a vibrant community of animators, students, 
                professionals, and enthusiasts who share a passion for animation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
