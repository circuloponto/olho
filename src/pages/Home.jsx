import { Link } from 'react-router-dom';
import { Film, Palette, Globe } from 'lucide-react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">OLHO</h1>
          <p className="hero-subtitle">Animation Festival</p>
          <p className="hero-description">
            Celebrating the art of animation from around the world. 
            Discover extraordinary films and talented creators.
          </p>
          <div className="hero-buttons">
            <Link to="/films" className="btn btn-primary">Explore Films</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="eye-animation">
            <div className="eye-outer">
              <div className="eye-inner">
                <div className="eye-pupil"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon"><Film size={48} /></div>
          <h3>Curated Films</h3>
          <p>Hand-picked animated shorts and features from emerging and established artists.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Palette size={48} /></div>
          <h3>Diverse Styles</h3>
          <p>From traditional hand-drawn to cutting-edge digital animation techniques.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Globe size={48} /></div>
          <h3>Global Voices</h3>
          <p>Stories and perspectives from animators across continents and cultures.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
