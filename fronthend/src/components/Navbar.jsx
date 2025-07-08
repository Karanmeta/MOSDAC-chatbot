import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: ''
  });

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  // Check for logged in user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('isroUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Close dropdown/modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target) && 
          !event.target.classList.contains('login-button')) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      number: formData.number,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('isroUser', JSON.stringify(userData));
    setUser(userData);
    setShowLoginModal(false);
    setFormData({ name: '', email: '', number: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('isroUser');
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <header className="navbar-container">
      {/* Stars Background */}
      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={`nav-star-${i}`}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animation: `moveStar ${Math.random() * 40 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Navbar Content */}
      <div className="navbar-content">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div className="brand-logo">
            <span className="rocket-icon">🚀</span>
            <Link to="/" className="brand-name">
              ISRO Explorer
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/missions" className="nav-link">
              Missions
            </Link>
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
          </nav>

          {/* User Profile / Login Button */}
          <div className="user-section">
            {user ? (
              <div className="user-profile" ref={dropdownRef}>
                <button 
                  className="profile-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="dropdown-menu">
                  
<Link 
  to="/previous-chats" 
  className="dropdown-item" 
  onClick={() => setShowDropdown(false)}
>
  Previous Chats
</Link>
                    <button 
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="login-button"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          {/* Stars Background for Modal */}
          <div className="modal-stars">
            {[...Array(100)].map((_, i) => (
              <div
                key={`modal-star-${i}`}
                className="modal-star"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random(),
                  animation: `moveStar ${Math.random() * 30 + 15}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Modal Content */}
          <div className="modal-content" ref={modalRef}>
            <h2 className="modal-title">
              Welcome to ISRO Explorer
            </h2>
            <p className="modal-subtitle">Join India's space exploration journey</p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="E.g. Rakesh Sharma"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="E.g. your@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="number" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="E.g. +91 9876543210"
                />
              </div>
              
              <button
                type="submit"
                className="submit-button"
              >
                Continue Exploration
              </button>
            </form>
            
            <button
              onClick={() => setShowLoginModal(false)}
              className="close-button"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: rgba(10, 10, 26, 0.95);
          padding: 1rem 0;
          border-bottom: 1px solid #E84917;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          backdrop-filter: blur(8px);
        }

        .stars-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
        }

        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 1;
        }

        .rocket-icon {
          font-size: 1.8rem;
          color: #E84917;
        }

        .brand-name {
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 1px;
          transition: all 0.3s;
        }

        .brand-name:hover {
          color: #E84917;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          z-index: 1;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.3s;
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
          position: relative;
        }

        .nav-link:hover {
          color: #E84917;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #E84917;
          transition: width 0.3s;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .user-section {
          display: flex;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .login-button {
          background-color: #E84917;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 10px rgba(232, 73, 23, 0.5);
          font-size: 1rem;
        }

        .login-button:hover {
          box-shadow: 0 0 15px rgba(232, 73, 23, 0.8);
          transform: translateY(-2px);
        }

        .user-profile {
          position: relative;
        }

        .profile-button {
          background-color: transparent;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 0.5rem 1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .profile-button:hover {
          background-color: rgba(232, 73, 23, 0.1);
        }

        .user-avatar {
          width: 35px;
          height: 35px;
          background-color: #E84917;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: white;
        }

        .user-name {
          white-space: nowrap;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          background-color: #0a0a1a;
          border: 1px solid #E84917;
          border-radius: 5px;
          padding: 0.5rem 0;
          min-width: 180px;
          box-shadow: 0 0 15px rgba(232, 73, 23, 0.3);
          z-index: 1002;
          display: block;
        }

        .dropdown-item {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1.25rem;
          background-color: transparent;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
          text-decoration: none;
          display: block;
        }

        .dropdown-item:hover {
          background-color: #E84917;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1001;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
        }

        .modal-star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
        }

        .modal-content {
          background-color: #0a0a1a;
          padding: 2.5rem;
          border-radius: 10px;
          width: 450px;
          max-width: 90%;
          position: relative;
          z-index: 1;
          border: 1px solid #E84917;
          box-shadow: 0 0 30px rgba(232, 73, 23, 0.5);
        }

        .modal-title {
          color: #E84917;
          margin-top: 0;
          text-align: center;
          margin-bottom: 0.5rem;
          font-size: 1.8rem;
        }

        .modal-subtitle {
          color: #ccc;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          color: white;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 5px;
          border: 1px solid #2d3748;
          background-color: #1a1a2e;
          color: white;
          outline: none;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-input:focus {
          border-color: #E84917;
          box-shadow: 0 0 0 3px rgba(232, 73, 23, 0.3);
        }

        .form-input::placeholder {
          color: #718096;
          opacity: 0.7;
          font-size: 0.9rem;
        }

        .submit-button {
          width: 100%;
          padding: 0.85rem;
          background-color: #E84917;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 0.5rem;
          font-size: 1rem;
          letter-spacing: 0.5px;
        }

        .submit-button:hover {
          background-color: #f05a2a;
          box-shadow: 0 0 15px rgba(232, 73, 23, 0.5);
          transform: translateY(-2px);
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: transparent;
          border: none;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          transition: all 0.2s;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          line-height: 1;
        }

        .close-button:hover {
          color: #E84917;
          background-color: rgba(255, 255, 255, 0.1);
        }

        @keyframes moveStar {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  background-color: #0a0a1a;
  padding: 2.5rem;
  border-radius: 10px;
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 2;
  border: 1px solid #E84917;
  box-shadow: 0 0 30px rgba(232, 73, 23, 0.5);
}

      `}</style>
    </header>
  );
}

export default Navbar;