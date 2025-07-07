import React from 'react';

function Gallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "PSLV Launch",
      description: "Polar Satellite Launch Vehicle carrying multiple satellites"
    },
    {
      url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Chandrayaan-3 Landing",
      description: "Historic lunar landing near the Moon's south pole"
    },
    {
      url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Mangalyaan at Mars",
      description: "India's Mars Orbiter Mission spacecraft"
    },
    {
      url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "GSLV Mk III",
      description: "India's heaviest rocket carrying Chandrayaan-2"
    },
    {
      url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Astronaut Training",
      description: "Gaganyaan astronauts during training"
    },
    {
      url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Satellite Assembly",
      description: "ISRO scientists working on satellite assembly"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Stars Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}>
        {[...Array(200)].map((_, i) => (
          <div
            key={`gallery-star-${i}`}
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

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#E84917',
          textAlign: 'center'
        }}>
          ISRO's Visual Journey
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '1rem'
        }}>
          {images.map((image, index) => (
            <div key={index} style={{
              backgroundColor: '#0a0a1a',
              borderRadius: '15px',
              overflow: 'hidden',
              border: '1px solid #E84917',
              boxShadow: '0 0 20px rgba(232, 73, 23, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: '#E84917', marginBottom: '0.5rem' }}>{image.title}</h3>
                <p style={{ color: '#a0aec0' }}>{image.description}</p>
              </div>
            </div>
          ))}
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
      `}</style>
    </div>
  );
}

export default Gallery;