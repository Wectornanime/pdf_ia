import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({
  apiKey,
});

export const geminiService = {
  ask: async (contents: any[]) => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents,
    });

    return response;
  }
}
