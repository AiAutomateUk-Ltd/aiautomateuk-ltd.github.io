
import { GoogleGenAI, Type } from "@google/genai";

// Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePredictiveMaintenance = async (sensorData: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze the following industrial sensor data for potential maintenance issues. 
    Data: ${JSON.stringify(sensorData)}
    Provide a concise report including prediction, confidence level (0-100), and specific recommendations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          prediction: { type: Type.STRING, description: "A summary of the maintenance prediction." },
          confidence: { type: Type.NUMBER, description: "Confidence percentage." },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of recommended actions."
          }
        },
        required: ["prediction", "confidence", "recommendations"]
      }
    }
  });

  try {
    // Accessing response.text directly as a property, not a method.
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};

export const configureAutomationSolution = async (requirements: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: `As an industrial automation consultant, suggest a custom solution based on these client requirements: "${requirements}".
    Provide a solution name, detailed description, list of key hardware/software components, and estimated ROI analysis.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          components: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedROI: { type: Type.STRING }
        },
        required: ["title", "description", "components", "estimatedROI"]
      }
    }
  });

  try {
    // Accessing response.text directly as a property, not a method.
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};
