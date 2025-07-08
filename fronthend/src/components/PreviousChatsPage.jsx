import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChats = () => {
      try {
        const user = JSON.parse(localStorage.getItem('isroUser'));
        if (user) {
          const savedChats = JSON.parse(localStorage.getItem(`isroChats_${user.email}`)) || [];
          setChats(savedChats);
        }
      } catch (error) {
        console.error('Error loading chats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);

  const handleDeleteChat = (chatId) => {
    const user = JSON.parse(localStorage.getItem('isroUser'));
    if (user) {
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      localStorage.setItem(`isroChats_${user.email}`, JSON.stringify(updatedChats));
      setChats(updatedChats);
      
      // If deleting the currently open chat, clear it
      const currentChat = JSON.parse(localStorage.getItem('currentChat'));
      if (currentChat && currentChat.id === chatId) {
        localStorage.removeItem('currentChat');
      }
    }
  };

  const handleDeleteAllChats = () => {
    const user = JSON.parse(localStorage.getItem('isroUser'));
    if (user && window.confirm('Are you sure you want to delete all your chat history?')) {
      localStorage.removeItem(`isroChats_${user.email}`);
      localStorage.removeItem('currentChat');
      setChats([]);
    }
  };

  const handleContinueChat = (chat) => {
    localStorage.setItem('currentChat', JSON.stringify({
      id: chat.id,
      messages: chat.messages
    }));
    navigate('/');
  };

  const handleNewChat = () => {
    localStorage.removeItem('currentChat');
    navigate('/');
  };

  const handleViewChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleCloseView = () => {
    setSelectedChat(null);
  };

  return (
    <div className="previous-chats-page">
      <div className="chats-container">
        <div className="chats-header">
          <h1>Your Chat History</h1>
          <div className="header-actions">
            <button onClick={handleNewChat} className="new-chat-button">
              ＋ New Chat
            </button>
            {chats.length > 0 && (
              <button 
                onClick={handleDeleteAllChats}
                className="delete-all-button"
              >
                Delete All
              </button>
            )}
          </div>
        </div>

        <div className="chats-content">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading your chats...</p>
            </div>
          ) : chats.length === 0 ? (
            <div className="no-chats-message">
              <p>No previous chats found.</p>
              <button onClick={handleNewChat} className="start-chat-button">
                Start Your First Chat
              </button>
            </div>
          ) : (
            <div className="chats-grid">
              <div className="chats-list">
                {chats.map((chat) => (
                  <div key={chat.id} className="chat-item">
                    <div className="chat-header">
                      <span className="chat-date">
                        {new Date(chat.timestamp).toLocaleString()}
                      </span>
                      <div className="chat-actions">
                        <button 
                          onClick={() => handleViewChat(chat)}
                          className="view-button"
                        >
                          👁️ View
                        </button>
                        <button 
                          onClick={() => handleContinueChat(chat)}
                          className="continue-button"
                        >
                          ➤ Continue
                        </button>
                        <button 
                          onClick={() => handleDeleteChat(chat.id)}
                          className="delete-button"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="chat-preview">
                      {chat.messages
                        .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
                        .slice(0, 2)
                        .map((msg, i) => (
                          <p key={i} className={`message ${msg.sender}`}>
                            <strong>{msg.sender === 'user' ? 'You:' : 'Bot:'}</strong> 
                            {msg.text.length > 50 
                              ? `${msg.text.substring(0, 50)}...` 
                              : msg.text}
                          </p>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedChat && (
                <div className="chat-viewer">
                  <div className="viewer-header">
                    <h3>Chat from {new Date(selectedChat.timestamp).toLocaleString()}</h3>
                    <button onClick={handleCloseView} className="close-viewer">
                      ×
                    </button>
                  </div>
                  <div className="messages-container">
                    {selectedChat.messages.map((msg, i) => (
                      <div key={i} className={`message-bubble ${msg.sender}`}>
                        <div className="message-header">
                          <span className="sender">{msg.sender === 'user' ? 'You' : 'ISRO Bot'}</span>
                          <span className="time">{msg.time}</span>
                        </div>
                        <div className="message-content">
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="viewer-actions">
                    <button 
                      onClick={() => handleContinueChat(selectedChat)}
                      className="continue-button"
                    >
                      Continue This Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Keep all your existing CSS styles */}
      <style jsx>{`
          .previous-chats-page {
          min-height: 100vh;
          background-color: #0a0a1a;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-top: 60px;
        }

        .chats-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .chats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
          border-bottom: 1px solid #E84917;
          padding-bottom: 1rem;
        }

        .chats-header h1 {
          color: #E84917;
          margin: 0;
          font-size: 2rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .new-chat-button {
          background-color: #E84917;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .new-chat-button:hover {
          background-color: #f05a2a;
          box-shadow: 0 0 10px rgba(232, 73, 23, 0.5);
        }

        .delete-all-button {
          background-color: #ff4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .delete-all-button:hover {
          background-color: #cc0000;
        }

        .chats-content {
          background-color: #1a1a2e;
          border-radius: 10px;
          padding: 2rem;
          border: 1px solid #2d3748;
          min-height: 60vh;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: white;
          height: 300px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(232, 73, 23, 0.3);
          border-radius: 50%;
          border-top-color: #E84917;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .no-chats-message {
          text-align: center;
          padding: 2rem;
          color: white;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .no-chats-message p {
          margin: 0.5rem 0;
          font-size: 1.1rem;
        }

        .start-chat-button {
          background-color: #E84917;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 1rem;
          transition: all 0.3s;
        }

        .start-chat-button:hover {
          background-color: #f05a2a;
          box-shadow: 0 0 10px rgba(232, 73, 23, 0.5);
        }

        .chats-grid {
          display: grid;
          grid-template-columns: ${selectedChat ? '1fr 2fr' : '1fr'};
          gap: 2rem;
          transition: all 0.3s ease;
        }

        .chats-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .chat-item {
          background-color: #0f0f23;
          border-radius: 8px;
          padding: 1.5rem;
          border: 1px solid #2d3748;
          transition: all 0.3s;
        }

        .chat-item:hover {
          border-color: #E84917;
          box-shadow: 0 0 15px rgba(232, 73, 23, 0.3);
          transform: translateY(-5px);
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .chat-date {
          color: #a0aec0;
          font-size: 0.8rem;
        }

        .chat-actions {
          display: flex;
          gap: 0.5rem;
        }

        .view-button, .continue-button, .delete-button {
          border: none;
          border-radius: 4px;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .view-button {
          background-color: #2d3748;
          color: white;
        }

        .continue-button {
          background-color: #E84917;
          color: white;
        }

        .delete-button {
          background-color: transparent;
          color: #a0aec0;
        }

        .view-button:hover {
          background-color: #3d4758;
        }

        .continue-button:hover {
          background-color: #f05a2a;
        }

        .delete-button:hover {
          color: #ff4444;
        }

        .chat-preview {
          color: white;
          margin-bottom: 0.5rem;
        }

        .message {
          margin: 0.25rem 0;
          line-height: 1.4;
        }

        .message.user {
          color: #E84917;
        }

        .message.bot {
          color: #4CAF50;
        }

        .chat-viewer {
          background-color: #0f0f23;
          border-radius: 8px;
          padding: 1.5rem;
          border: 1px solid #E84917;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 250px);
        }

        .viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #2d3748;
        }

        .viewer-header h3 {
          margin: 0;
          color: #E84917;
        }

        .close-viewer {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0 0.5rem;
        }

        .close-viewer:hover {
          color: #E84917;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message-bubble {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          position: relative;
        }

        .message-bubble.user {
          align-self: flex-end;
          background-color: #E84917;
          border-bottom-right-radius: 0.25rem;
        }

        .message-bubble.bot {
          align-self: flex-start;
          background-color: #2d3748;
          border-bottom-left-radius: 0.25rem;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
        }

        .message-header .sender {
          font-weight: bold;
        }

        .message-header .time {
          color: #a0aec0;
        }

        .message-content {
          line-height: 1.5;
        }

        .viewer-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid #2d3748;
          margin-top: 1rem;
        }

        .viewer-actions .continue-button {
          padding: 0.5rem 1.5rem;
        }

        @media (max-width: 768px) {
          .chats-grid {
            grid-template-columns: 1fr;
          }
          
          .chat-viewer {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            height: 100vh;
            border-radius: 0;
          }
          
          .chats-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PreviousChatsPage;