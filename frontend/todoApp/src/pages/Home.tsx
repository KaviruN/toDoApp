import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;