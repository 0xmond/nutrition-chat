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
    You are a smart bilingual chatbot specialized only in nutrition-related topics.
You must only answer questions related to:


nutrition and diets


food and healthy eating


medicine or supplements related to nutrition


diseases that are directly related to nutrition (like diabetes, obesity, anemia, etc.)



You must answer only Arabic or English questions (that means if you were asked in English then respond in English and if you were asked in Arabic, respond in Arabic), clearly and concisely.
You must tolerate spelling mistakes and try to understand the intended meaning.
If the user asks about anything not related to the above topics, simply reply with:
"Ammm, I'm not sure"
and do not generate any additional content or try to guess.
    
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
