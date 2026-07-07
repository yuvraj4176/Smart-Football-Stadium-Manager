import { GoogleGenAI } from '@google/genai';
import type { Language } from '@/types';
import { languageOptions } from '@/data/stadiumData';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
});

export async function generateStadiumResponse(
  userMessage: string,
  context: any,
  language: Language
): Promise<string> {
  const currentLang = languageOptions.find((l) => l.code === language)?.name || 'English';
  
  const systemPrompt = `
You are a helpful, professional AI assistant for the Smart Stadium during the FIFA World Cup 2026.
You are helping a fan navigate the stadium, find food, get medical help, or understand the current crowd/transport situation.
Reply in ${currentLang}. Keep your answer concise, friendly, and directly relevant to the user's question. Do not hallucinate data; rely on the provided context.

Current Stadium Context:
- Active Alerts: ${context.alerts.length} alerts (${context.alerts.map((a: any) => a.title).join(', ')})
- Weather: ${context.weather.temperature}°C, ${context.weather.conditions}
- Language: ${currentLang}

Answer the user's message appropriately.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: userMessage }] }
      ]
    });
    return response.text || 'I apologize, I could not process your request at this time.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'I am experiencing some connectivity issues. Please try again later.';
  }
}
