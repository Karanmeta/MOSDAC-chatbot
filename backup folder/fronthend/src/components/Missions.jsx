import React from 'react';

function Missions() {
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
            key={`mission-star-${i}`}
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
          ISRO's Legendary Missions
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '1rem'
        }}>
          {/* Mission Cards */}
          {[
            {
              name: "Chandrayaan-3",
              description: "India's successful lunar mission that made a historic landing near the Moon's south pole.",
              year: "2023",
              achievements: [
                "First country to land near lunar south pole",
                "Demonstrated rover operations on Moon"
              ]
            },
            {
              name: "Mangalyaan (Mars Orbiter Mission)",
              description: "India's first interplanetary mission that made ISRO the fourth space agency to reach Mars.",
              year: "2013",
              achievements: [
                "First Asian nation to reach Martian orbit",
                "Completed mission at record low cost"
              ]
            },
            {
              name: "Gaganyaan",
              description: "India's first human spaceflight program aiming to send astronauts to space.",
              year: "Upcoming (2025)",
              achievements: [
                "Will make India the 4th country with human spaceflight capability",
                "Includes indigenous crew module and life support systems"
              ]
            },
            {
              name: "PSLV-C37",
              description: "Created world record by launching 104 satellites in a single mission.",
              year: "2017",
              achievements: [
                "World record for most satellites launched in single mission",
                "Demonstrated ISRO's launch capability"
              ]
            },
            {
              name: "AstroSat",
              description: "India's first dedicated multi-wavelength space observatory.",
              year: "2015",
              achievements: [
                "First Indian observatory in space",
                "Has made several important astronomical discoveries"
              ]
            },
            {
              name: "IRNSS (NavIC)",
              description: "India's regional navigation satellite system providing accurate positioning.",
              year: "2016-2018",
              achievements: [
                "Provides accurate position information over India",
                "Alternative to GPS for Indian region"
              ]
            }
          ].map((mission, index) => (
            <div key={index} style={{
              backgroundColor: '#0a0a1a',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1px solid #E84917',
              boxShadow: '0 0 20px rgba(232, 73, 23, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <h3 style={{ color: '#E84917', marginBottom: '0.5rem' }}>{mission.name}</h3>
              <p style={{ color: '#a0aec0', marginBottom: '1rem' }}>{mission.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                  backgroundColor: '#E84917',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '5px',
                  fontSize: '0.8rem'
                }}>
                  {mission.year}
                </span>
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>Key Achievements:</h4>
                <ul style={{ paddingLeft: '1.5rem', color: '#a0aec0' }}>
                  {mission.achievements.map((achievement, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{achievement}</li>
                  ))}
                </ul>
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

export default Missions;