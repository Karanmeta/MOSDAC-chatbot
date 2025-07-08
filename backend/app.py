from flask import Flask, request, jsonify
from flask_cors import CORS
from kg_chatbot import KnowledgeGraphChatbot
import os

# Initialize Flask
app = Flask(__name__)

# Enhanced CORS Configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
        "expose_headers": ["Content-Type"]
    }
})

# Additional CORS headers middleware
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

# Configuration
KG_FILE = r"C:\backup folder\backend\data\all_extracted_kg.json"

# Initialize chatbot at startup
try:
    chatbot = KnowledgeGraphChatbot(KG_FILE)
    print(f"Knowledge Graph Chatbot initialized successfully with {len(chatbot.kg)} documents.")
except Exception as e:
    print(f"FATAL: Failed to initialize chatbot - {str(e)}")
    exit(1)

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def handle_chat():
    if request.method == 'OPTIONS':
        # Handle preflight request
        return jsonify({}), 200
    
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({'error': 'Missing query'}), 400
            
        response = chatbot.answer_query(data['query'])
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'service': 'MOSDAC Knowledge Graph Chatbot',
        'version': '1.0'
    })

@app.route('/')
def index():
    return jsonify({
        'service': 'MOSDAC Knowledge Graph API',
        'endpoints': {
            '/api/chat': 'POST {query: "your_question"}',
            '/api/health': 'GET health check'
        }
    })

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        use_reloader=False
    )