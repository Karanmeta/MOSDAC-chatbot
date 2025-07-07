# AI-based Help Bot for Information Retrieval from a Knowledge Graph Based on Static/Dynamic Web Portal Content

## Project Overview
The MOSDAC portal (Meteorological & Oceanographic Satellite Data Archival Centre) is an ISRO data platform that provides access to satellite data and services. However, due to deeply layered content, inconsistent formatting, and complex navigation, users struggle to find specific information.

This project introduces an AI-based chatbot that intelligently understands user queries and returns relevant responses by leveraging a knowledge graph built from the MOSDAC portal’s structured and unstructured content.

## Objective
- Develop an intelligent virtual assistant capable of understanding natural language queries.
- Extract and model static and dynamic content into a structured knowledge graph.
- Support contextual, relationship-aware, and geospatial-aware querying.
- Ensure modular design so it can be reused across similar web portals.

## Technology Stack
- **Backend**: Python, Flask, spaCy, Google Gemini API
- **Frontend**: React, Vite
- **Knowledge Representation**: JSON-based Knowledge Graph
- **Others**: Flask-CORS, Requests

## Installation and Setup

### Prerequisites
- Python 3.x and pip
- Node.js and npm

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

### Frontend Setup (React + Vite)
```bash
# Navigate to your frontend folder
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Configuration
Make sure to:
- Set your Google Gemini API key in the `kg_chatbot.py` file or through environment variables:
  ```
  API_KEY = "YOUR_GOOGLE_GEMINI_API_KEY"
  ```
- Update the knowledge graph JSON path:
  ```
  KG_FILE = "path/to/all_extracted_kg.json"
  ```

## API Documentation

### POST `/api/chat`
**Description**: Sends a user query and receives an AI-generated response.

**Request Payload**
```json
{
  "query": "What is INSAT-3D?"
}
```

**Response**
```json
{
  "response": "INSAT-3D is a meteorological satellite developed by ISRO...",
  "status": "success"
}
```

---

### GET `/api/health`
**Description**: Health check endpoint.

**Response**
```json
{
  "status": "ok",
  "service": "MOSDAC Knowledge Graph Chatbot",
  "version": "1.0"
}
```

## Usage Guide

### Example Queries
- "What is INSAT-3D?"
- "Which satellite provides Sea Surface Temperature?"
- "Tell me about Rainfall Estimate products"
- "Who developed MOSDAC?"
- "What is the use of Megha-Tropiques?"

### How It Works
1. **Entity Extraction**: spaCy + rule-based matching identifies keywords/entities in the query.
2. **Domain Filtering**: The bot checks if the query is related to MOSDAC or its entities.
3. **Triple Matching**: It fetches subject-predicate-object triples from the knowledge graph.
4. **LLM Generation**: Google Gemini processes those triples and generates an accurate natural language response.

## Expected Outcomes & Evaluation

| Metric                    | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| **Intent Recognition**    | Can the bot understand what the user wants?                                |
| **Entity Extraction**     | Can it identify and match the right entities from user input?              |
| **Response Completeness** | Does the bot provide all the relevant info from the knowledge graph?       |
| **Response Consistency**  | Does the bot give consistent answers across similar or multi-turn queries? |

---

## License
This project is built for educational and research purposes in the domain of intelligent information retrieval.
