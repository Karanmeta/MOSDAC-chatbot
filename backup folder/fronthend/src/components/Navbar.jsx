import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        overflow: 'hidden',
        backgroundColor: '#0a0a1a',
        padding: '1rem 0',
        borderBottom: '1px solid #E84917'
      }}
    >
      {/* Stars Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={`nav-star-${i}`}
            style={{
              position: 'absolute',
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: 'white',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animation: `moveStar ${Math.random() * 40 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Navbar Content */}
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Brand Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.8rem',
              color: '#E84917'
            }}>🚀</span>
            <Link to="/" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              ISRO Explorer
            </Link>
          </div>

          {/* Navigation Links */}
          <nav style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <Link to="/" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              padding: '0.5rem 0',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#E84917';
              e.target.style.borderBottom = '2px solid #E84917';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'white';
              e.target.style.borderBottom = '2px solid transparent';
            }}>
              Home
            </Link>
            <Link to="/missions" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              padding: '0.5rem 0',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#E84917';
              e.target.style.borderBottom = '2px solid #E84917';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'white';
              e.target.style.borderBottom = '2px solid transparent';
            }}>
              Missions
            </Link>
            <Link to="/gallery" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              padding: '0.5rem 0',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#E84917';
              e.target.style.borderBottom = '2px solid #E84917';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'white';
              e.target.style.borderBottom = '2px solid transparent';
            }}>
              Gallery
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <button style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #E84917',
              borderRadius: '5px',
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#E84917';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}>
              Log-In
            </button>
            <button style={{
              backgroundColor: '#E84917',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 10px rgba(232, 73, 23, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 15px rgba(232, 73, 23, 0.8)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 0 10px rgba(232, 73, 23, 0.5)';
              e.target.style.transform = 'translateY(0)';
            }}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
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
      `}</style>
    </header>
  );
}

export default Navbar;