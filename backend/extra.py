from flask import Flask, request, jsonify
from flask_cors import CORS
from cli_chatbot import KnowledgeGraphChatbot
import os

app = Flask(_name_)
CORS(app)  # Enable CORS for all routes

# Initialize the chatbot
KG_FILE = os.path.join(os.path.dirname(_file_), 'data\all_extracted_kg.json')
chatbot = KnowledgeGraphChatbot(KG_FILE)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_query = data.get('message', '')
    
    if not user_query:
        return jsonify({'error': 'Empty message'}), 400
    
    try:
        response = chatbot.answer_query(user_query)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#if _name_ == '_main_':
    #app.run(host='0.0.0.0', port=5000, debug=True)