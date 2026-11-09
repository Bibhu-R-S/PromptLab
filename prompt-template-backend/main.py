
from fastapi import FastAPI
from schemas import GenerateRequest, GenerateResponse
from langchain_ollama import ChatOllama
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the local Qwen model

llm = ChatOllama(
    model="qwen2.5:3b",
    temperature=0.7,
)

@app.get("/")
def home():
    return {"message": "PromptLab backend is running!"}

@app.get("/health")
def health_check():
    return {"status": "OK"}

@app.post("/api/generate", response_model = GenerateResponse)
def generate_prompt(request: GenerateRequest):

    #send response to Qwen model
    ai_response = llm.invoke(request.prompt)

    #return the generated response from the model
    return GenerateResponse(
        response = ai_response.content
    )