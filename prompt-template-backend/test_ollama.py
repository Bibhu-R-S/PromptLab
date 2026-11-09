from langchain_ollama import ChatOllama

model = ChatOllama(
    model="qwen2.5:3b",
    temperature=0.7,
)

print("Sending request to Qwen...")

response = model.invoke(
    "Explain a prompt template in one sentence."
)

print("AI Response:", response.content)