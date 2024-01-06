import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuracion
const geminiAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const geminiConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// 2. Inicializar el modelo
const model = geminiAI.getGenerativeModel({ model: "gemini-pro-vision", geminiConfig });

// 3. Llamar a Gemini
async function generateContent() {
    try {
        // Cargar las images
        const imagePath = 'image.png';
        const imageData = await fs.readFile(imagePath);
        const imageBase64 = imageData.toString('base64');

        // Definir las partes
        const parts = [
            { text: "Describe lo que hacen las personas en esta imagen:\n" },
            {
              inlineData: {
                mimeType: "image/png",
                data: imageBase64
              }
            },
          ];

        // Generar el contenido a partir de los inputs de texto e imágenes
        const result = await model.generateContent({ contents: [{ role: "user", parts }] });
        const response = await result.response;
        console.log(response.text());
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }
  
  // Correr
  generateContent();