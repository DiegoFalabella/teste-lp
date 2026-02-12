
import { GoogleGenAI, Type } from "@google/genai";
import { BrandVibe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeBackgroundVibe = async (base64Image: string): Promise<BrandVibe> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = "Analisando esta imagem de fundo para uma landing page, crie uma identidade de marca instantânea. Retorne um título curto e impactante, um subtítulo inspirador, uma cor de destaque em HEX que harmonize com a imagem e uma breve descrição do 'mood'.";

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1] || base64Image,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          accentColor: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "subtitle", "accentColor", "description"],
      },
    },
  });

  try {
    const result = JSON.parse(response.text || '{}');
    return result as BrandVibe;
  } catch (error) {
    console.error("Erro ao processar resposta do Gemini", error);
    return {
      title: "Exploração Visual",
      subtitle: "Personalize sua experiência digital",
      accentColor: "#3b82f6",
      description: "Um ambiente único criado por você."
    };
  }
};
