
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAnswer = async (context: string, query: string): Promise<string> => {
  try {
    const prompt = `
      You are a specialized AI assistant for a design agency. Your sole purpose is to answer employee questions based *only* on the company information provided below.
      
      - Read the information carefully.
      - If the answer to the question is directly available in the text, provide it concisely.
      - If the answer is not in the provided text, you MUST state: "I'm sorry, but I couldn't find information about that in the documents provided."
      - Do not use any external knowledge. Do not make assumptions or invent information.
      - Respond in a professional and helpful tone.

      --- COMPANY INFORMATION ---
      ${context}
      --- END OF INFORMATION ---

      Now, please answer the following question.

      Question: "${query}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a response from the AI model.");
  }
};
