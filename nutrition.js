import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const nutritionChat = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 1,
      topK: 1,
      maxOutputTokens: 500,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  });

  const prompt = `
    You are an AI assistant specialized in nutrition. You must only answer questions related to nutrition and diets. If you receive a prompt about anything else, respond with 'Ammm, I'm not sure.'
    
    Prompt: ${text}
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseTrimmed = response.text().trim();

    return responseTrimmed;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
};
