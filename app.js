import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuracion
const geminiAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const geminiConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// 2. Inicializar el modelo
const model = geminiAI.getGenerativeModel({ model: "gemini-pro", geminiConfig });

// 3. Llamar a Gemini
async function generateContent() {
    try {
      const prompt = "Que puedo comer hoy? en desayuno, aluerzo y cena";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(response.text());
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }
  
  // Correr
  generateContent();