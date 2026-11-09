interface GenerateResponse {
  response: string;
}

export async function generateAIResponse(prompt: string): Promise<string> {
  const response = await fetch(import.meta.env.VITE_API_GENERATE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data: GenerateResponse = await response.json();

  return data.response;
}
