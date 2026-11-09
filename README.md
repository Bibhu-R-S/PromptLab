# PromptLab

**PromptLab** is an AI-powered prompt template playground that helps users create structured prompts using reusable templates and generate AI responses.

## Features

- Three reusable prompt templates:
  - Explain a Topic
  - LinkedIn Post
  - Study Plan
- Dynamic forms based on the selected template
- Automatic prompt generation using user inputs
- Copy generated prompts
- AI response generation using a locally running language model
- Input validation and error handling
- Responsive user interface

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**

- Python
- FastAPI
- Pydantic
- LangChain

**AI**

- Ollama
- Qwen2.5 3B

## Project Structure

```text
PromptLab/
├── prompt-template-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
│
├── prompt-template-backend/
│   ├── main.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── test_ollama.py
│
└── .gitignore
```

## Running Locally

### Prerequisites

- Node.js and npm
- Python
- Ollama
- Qwen2.5 3B model

### 1. Clone the repository

```bash
git clone https://github.com/Bibhu-R-S/PromptLab.git
cd PromptLab
```

### 2. Set up the AI model

```bash
ollama pull qwen2.5:3b
```

Make sure Ollama is running before generating AI responses.

### 3. Start the backend

```powershell
cd prompt-template-backend

python -m venv .venv
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt

uvicorn main:app --reload
```

The backend runs at:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 4. Start the frontend

Open a second terminal:

```powershell
cd prompt-template-frontend

npm install
```

Create a `.env` file in the frontend directory with:

```env
VITE_API_GENERATE_ENDPOINT=http://127.0.0.1:8000/api/generate
```

Then run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173`

## Testing

Frontend checks:

```bash
npx tsc -b
npx oxlint .
npx vitest run
npm run build
```

Backend dependency check:

```bash
python -m pip check
```

## Current Status

PromptLab has a working frontend, FastAPI backend, and local AI integration with Ollama and Qwen2.5 3B.

Deployment configuration and further improvements are planned.

## License

No license has been added yet.
