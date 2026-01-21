import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">OLHO</span>
          <span className="logo-subtitle">Animation Festival</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/films" 
              className={`nav-link ${location.pathname === '/films' ? 'active' : ''}`}
            >
              Films
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/authors" 
              className={`nav-link ${location.pathname === '/authors' ? 'active' : ''}`}
            >
              Authors
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
