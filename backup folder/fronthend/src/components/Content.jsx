import React, { useState, useEffect, useRef } from "react";

const Content = () => {
  const [showChat, setShowChat] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I'm your ISRO virtual assistant. Ask me anything about India's space program, missions, or achievements.",
      time: "Just now",
      isError: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = 'http://localhost:5000/api/chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (message) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query: message }),
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Backend Error: ${response.status} - ${errorData.error || 'Unknown error'}`
        );
      }

      const data = await response.json();
      if (!data?.response) {
        throw new Error("Invalid response format from server");
      }
      
      return Array.isArray(data.response) ? data.response : [data.response];
    } catch (error) {
      console.error('[ERROR] Full error details:', error);
      return [
        "🚨 Connection Failed",
        `Error: ${error.message}`,
        "Troubleshooting:",
        "1. Ensure Flask is running on port 5000",
        "2. Check browser console (F12) for details",
        "3. Try refreshing the page"
      ];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = {
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isError: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      const botResponses = await sendMessage(inputValue);
      const botMessages = botResponses.map(text => ({ 
        sender: "bot",
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: text.includes("🚨 Connection Failed")
      }));
      setMessages(prev => [...prev, ...botMessages]);
    } catch (error) {
      setMessages(prev => [...prev, {
        sender: "bot",
        text: `Critical error: ${error.message}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => console.log('Backend health:', data))
      .catch(err => console.error('Health check failed:', err));
  }, []);

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#E84917",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          fontSize: "32px",
          display: showChat ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(232, 73, 23, 0.7)",
          zIndex: 999,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        title="Chat with ISRO Bot"
      >
        💬
      </button>

      {/* Chatbot - Default Position (Bottom Right) */}
      {showChat && !isExpanded && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "400px",
            height: "600px",
            backgroundColor: "#1a1a2e",
            color: "white",
            zIndex: 1000,
            borderRadius: "15px",
            boxShadow: "0 0 30px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #E84917",
            transition: "all 0.3s ease",
          }}
        >
          {/* Chat Header */}
          <div style={{
            backgroundColor: "#0a0a1a",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #E84917"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#E84917",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                fontSize: "20px"
              }}>
                🚀
              </div>
              <h3 style={{ margin: 0 }}>ISRO SpaceBot</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setIsExpanded(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#E84917"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                title="Maximize"
              >
                🗖
              </button>
              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#E84917"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                ×
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "15px"
                }}
              >
                <div style={{
                  backgroundColor: message.isError ? "#ff4444" : 
                                    message.sender === "user" ? "#E84917" : "#2d3748",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: message.sender === "user" 
                    ? "15px 15px 0 15px" 
                    : "15px 15px 15px 0",
                  maxWidth: "80%",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }}>
                  {message.text}
                </div>
                <span style={{
                  fontSize: "0.7rem",
                  color: "#a0aec0",
                  marginTop: "5px"
                }}>
                  {message.time}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: "15px"
              }}>
                <div style={{
                  backgroundColor: "#2d3748",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "15px 15px 15px 0",
                  maxWidth: "80%",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }}>
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: "15px",
            backgroundColor: "#0a0a1a",
            borderTop: "1px solid #2d3748",
            display: "flex"
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about ISRO missions..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "12px 15px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#2d3748",
                color: "white",
                outline: "none",
                marginRight: "10px",
                opacity: isLoading ? 0.7 : 1
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              style={{
                backgroundColor: isLoading || !inputValue.trim() ? "#6b7280" : "#E84917",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => !isLoading && inputValue.trim() && (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              {isLoading ? "..." : "↑"}
            </button>
          </div>
        </div>
      )}

      {/* Expanded Chat Modal */}
      {showChat && isExpanded && (
        <>
          {/* Blurred Background Overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 999,
            }}
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Expanded Chat Container */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "calc(100% - 160px)",
              height: "650px",
              backgroundColor: "#1a1a2e",
              color: "white",
              zIndex: 1000,
              borderRadius: "15px",
              boxShadow: "0 0 30px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              border: "1px solid #E84917",
              transition: "all 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div style={{
              backgroundColor: "#0a0a1a",
              padding: "15px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #E84917"
            }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#E84917",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  fontSize: "20px"
                }}>
                  🚀
                </div>
                <h3 style={{ margin: 0 }}>ISRO SpaceBot</h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => setIsExpanded(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#E84917"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  title="Minimize"
                >
                  🗗
                </button>
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#E84917"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: message.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "15px"
                  }}
                >
                  <div style={{
                    backgroundColor: message.isError ? "#ff4444" : 
                                      message.sender === "user" ? "#E84917" : "#2d3748",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: message.sender === "user" 
                      ? "15px 15px 0 15px" 
                      : "15px 15px 15px 0",
                    maxWidth: "80%",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                  }}>
                    {message.text}
                  </div>
                  <span style={{
                    fontSize: "0.7rem",
                    color: "#a0aec0",
                    marginTop: "5px"
                  }}>
                    {message.time}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: "15px"
                }}>
                  <div style={{
                    backgroundColor: "#2d3748",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "15px 15px 15px 0",
                    maxWidth: "80%",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                  }}>
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: "15px",
              backgroundColor: "#0a0a1a",
              borderTop: "1px solid #2d3748",
              display: "flex"
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about ISRO missions..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "12px 15px",
                  borderRadius: "25px",
                  border: "none",
                  backgroundColor: "#2d3748",
                  color: "white",
                  outline: "none",
                  marginRight: "10px",
                  opacity: isLoading ? 0.7 : 1
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                style={{
                  backgroundColor: isLoading || !inputValue.trim() ? "#6b7280" : "#E84917",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => !isLoading && inputValue.trim() && (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                {isLoading ? "..." : "↑"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Content;