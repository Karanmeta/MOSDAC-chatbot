import React from 'react';

function Gallery() {
  const images = [
    {
      url: "https://www.airport-technology.com/wp-content/uploads/sites/14/2024/11/2-polar-satellite.jpg",
      title: "PSLV Launch",
      description: "Polar Satellite Launch Vehicle carrying multiple satellites"
    },
    {
      url: "https://img.etimg.com/photo/msid-102990730/Chandrayaan-3.jpg",
      title: "Chandrayaan-3 Landing",
      description: "Historic lunar landing near the Moon's south pole"
    },
    {
      url: "https://i0.wp.com/geographicbook.com/wp-content/uploads/2024/01/Mars-Orbiter-Mission-Mangalyaan.jpg?fit=2000%2C1125&ssl=1",
      title: "Mangalyaan at Mars",
      description: "India's Mars Orbiter Mission spacecraft"
    },
    {
      url: "https://www.financialexpress.com/wp-content/uploads/2019/07/GSLV-MK-III-Image-ISRO-660.jpg",
      title: "GSLV Mk III",
      description: "India's heaviest rocket carrying Chandrayaan-2"
    },
    {
      url: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/gaganyaan-astronaut-training-160744980-16x9.jpeg?VersionId=V1Hd2V6UqhZjqjtZdjxe_C23NuUsh4xW&size=690:388",
      title: "Astronaut Training",
      description: "Gaganyaan astronauts during training"
    },
    {
      url: "https://images.livemint.com/rf/Image-621x414/LiveMint/Period1/2013/11/05/Photos/mars_mission_scientists.jpg",
      title: "Satellite Assembly",
      description: "ISRO scientists working on satellite assembly"
    },
    {
      url: "https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2023/11/aditya.jpg",
      title: "Aditya-L1 Launch",
      description: "India's first solar mission to study the Sun"
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Artist%27s_concept_of_NISAR_over_Earth.jpg",
      title: "NISAR Satellite",
      description: "Joint NASA-ISRO Earth observation satellite"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      backgroundColor: '#0a0a0a'
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
          margin: '0 0 2rem 0',
          padding: '1rem 0',
          color: '#E84917',
          textAlign: 'center',
          height: '5rem',
          lineHeight: '5rem'
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
              cursor: 'pointer',
              height: '350px' // Fixed height for all cards
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderBottom: '1px solid #E84917'
              }} />
              <div style={{ 
                padding: '1.5rem',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{ 
                  color: '#E84917', 
                  marginBottom: '0.75rem',
                  fontSize: '1.3rem'
                }}>{image.title}</h3>
                <p style={{ 
                  color: '#a0aec0',
                  lineHeight: '1.5',
                  margin: 0
                }}>{image.description}</p>
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