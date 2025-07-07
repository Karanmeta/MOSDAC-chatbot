import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleAskAboutMissions = () => {
    // Programmatically click the chat button if it exists
    const chatButton = document.querySelector('[title="Chat with ISRO Bot"]');
    if (chatButton) {
      chatButton.click();
    }
  };

  const handleLatestLaunches = () => {
    navigate('/missions');
  };

  return (
    <div
      className="hero-container"
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
        margin: '0',
      }}
    >
      {/* Stars Background */}
      <div
        className="stars"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              position: 'absolute',
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              backgroundColor: 'white',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animation: `moveStar ${Math.random() * 50 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="container-fluid h-100"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <div className="row w-100 align-items-center">
          <div className="col-lg-8 p-4 p-lg-5">
            <h1 className="display-3 fw-bold text-white mb-4">
              India's Journey to the Stars
            </h1>
            <p className="lead text-white-50 mb-4" style={{ fontSize: '1.25rem' }}>
              Explore ISRO's groundbreaking missions, from Chandrayaan to Gaganyaan. 
              Discover how India is reaching new frontiers in space exploration.
            </p>
            <div className="d-flex gap-3">
              <button
                className="btn btn-lg px-4 py-2 fw-bold"
                style={{
                  backgroundColor: '#E84917',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 0 15px #E84917',
                  transition: 'all 0.3s ease',
                }}
                onClick={handleAskAboutMissions}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 25px #E84917';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 0 15px #E84917';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Ask About ISRO Missions
              </button>
              <button 
                className="btn btn-outline-light btn-lg px-4 py-2"
                style={{
                  transition: 'all 0.3s ease',
                }}
                onClick={handleLatestLaunches}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Latest Launches
              </button>
            </div>
          </div>
        </div>
      </div>

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

        .hero-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
      `}</style>
    </div>
  );
}

export default Hero;