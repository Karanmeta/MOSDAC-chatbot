import React from 'react';

function Missions() {
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
          textAlign: 'center',
          textShadow: '0 0 10px rgba(232, 73, 23, 0.5)'
        }}>
          ISRO's Legendary Missions
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          padding: '1rem'
        }}>
          {[
            {
              name: "Chandrayaan-3",
              description: "India's successful lunar mission that made a historic landing near the Moon's south pole.",
              year: "2023",
              achievements: [
                "First country to land near lunar south pole",
                "Demonstrated rover operations on Moon",
                "Confirmed presence of sulfur and other elements"
              ],
              icon: "🌕"
            },
            {
              name: "Mangalyaan",
              description: "India's first interplanetary mission that made ISRO the fourth space agency to reach Mars.",
              year: "2013",
              achievements: [
                "First Asian nation to reach Martian orbit",
                "Completed mission at record low cost ($74M)",
                "Operated for 8 years (planned for 6 months)"
              ],
              icon: "🪐"
            },
            {
              name: "Gaganyaan",
              description: "India's first human spaceflight program aiming to send astronauts to space.",
              year: "2025",
              achievements: [
                "Will make India the 4th country with human spaceflight",
                "Includes indigenous crew module and systems",
                "Test vehicle launched successfully in 2023"
              ],
              icon: "👨‍🚀"
            },
            {
              name: "PSLV-C37",
              description: "Created world record by launching 104 satellites in a single mission.",
              year: "2017",
              achievements: [
                "World record for most satellites launched",
                "Primary payload was Cartosat-2D",
                "96 satellites were from USA"
              ],
              icon: "🚀"
            },
            {
              name: "AstroSat",
              description: "India's first dedicated multi-wavelength space observatory.",
              year: "2015",
              achievements: [
                "First Indian observatory in space",
                "Discovered extreme-UV light from galaxy",
                "Still operational after 8+ years"
              ],
              icon: "🔭"
            },
            {
              name: "IRNSS (NavIC)",
              description: "India's regional navigation satellite system providing accurate positioning.",
              year: "2016-2018",
              achievements: [
                "Accuracy better than 20m in Indian region",
                "7 satellites in constellation",
                "Used in smartphones and vehicles"
              ],
              icon: "🛰️"
            },
            // Additional cards
            {
              name: "Aditya-L1",
              description: "India's first solar mission to study the Sun's corona and solar winds.",
              year: "2023",
              achievements: [
                "First Indian mission to study the Sun",
                "Placed at Lagrange Point 1 (L1)",
                "Carries 7 scientific payloads"
              ],
              icon: "☀️"
            },
            {
              name: "NISAR",
              description: "Joint NASA-ISRO Earth observation satellite for global ecosystem monitoring.",
              year: "2024",
              achievements: [
                "Most expensive Earth imaging satellite",
                "Will map Earth every 12 days",
                "Uses dual frequency radar"
              ],
              icon: "🌍"
            }
          ].map((mission, index) => (
            <div key={index} style={{
              backgroundColor: '#0a0a1a',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1px solid #E84917',
              boxShadow: '0 0 20px rgba(232, 73, 23, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(232, 73, 23, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(232, 73, 23, 0.3)';
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '2rem',
                  marginRight: '1rem'
                }}>{mission.icon}</span>
                <h3 style={{ 
                  color: '#E84917', 
                  margin: 0,
                  fontSize: '1.5rem'
                }}>{mission.name}</h3>
              </div>
              
              <p style={{ 
                color: '#a0aec0', 
                marginBottom: '1.5rem',
                lineHeight: '1.5',
                flexGrow: 1
              }}>{mission.description}</p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '1.5rem',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  backgroundColor: '#E84917',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {mission.year}
                </span>
              </div>
              
              <div>
                <h4 style={{ 
                  color: 'white', 
                  marginBottom: '0.75rem', 
                  fontSize: '1.1rem',
                  borderBottom: '1px solid #2d3748',
                  paddingBottom: '0.5rem'
                }}>
                  Key Achievements
                </h4>
                <ul style={{ 
                  paddingLeft: '1rem', 
                  color: '#a0aec0',
                  margin: 0
                }}>
                  {mission.achievements.map((achievement, i) => (
                    <li key={i} style={{ 
                      marginBottom: '0.5rem',
                      position: 'relative',
                      paddingLeft: '1.25rem'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#E84917'
                      }}>•</span> 
                      {achievement}
                    </li>
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