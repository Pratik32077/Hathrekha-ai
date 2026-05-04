import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. AI functionality will be limited to mock data.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || 'NO_KEY_PROVIDED' });

export async function interpretPalm(imageData: string) {
  const prompt = `
    Act as an expert palm reader and destiny analyst. 
    Based on this palm image, generate personality, wealth, love, and career insights in a mystical yet practical tone.
  `;

  if (imageData.startsWith('data:image')) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/jpeg' } }
        ]
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scores: {
              type: Type.OBJECT,
              properties: {
                destiny: { type: Type.NUMBER },
                wealth: { type: Type.NUMBER },
                love: { type: Type.NUMBER },
                career: { type: Type.NUMBER }
              },
              required: ["destiny", "wealth", "love", "career"]
            },
            insights: {
              type: Type.OBJECT,
              properties: {
                personality: { type: Type.STRING },
                wealthForecast: { type: Type.STRING },
                loveDestiny: { type: Type.STRING },
                careerPath: { type: Type.STRING },
                growthWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
                remedies: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["personality", "wealthForecast", "loveDestiny", "careerPath", "growthWarnings", "remedies"]
            },
            luckyTraits: {
              type: Type.OBJECT,
              properties: {
                auraColor: { type: Type.STRING },
                luckyGem: { type: Type.STRING },
                powerNumbers: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                rulingPlanet: { type: Type.STRING }
              },
              required: ["auraColor", "luckyGem", "powerNumbers", "rulingPlanet"]
            },
            timelinePredictions: {
              type: Type.OBJECT,
              properties: {
                shortTerm: { type: Type.STRING },
                mediumTerm: { type: Type.STRING },
                longTerm: { type: Type.STRING }
              },
              required: ["shortTerm", "mediumTerm", "longTerm"]
            }
          },
          required: ["scores", "insights", "luckyTraits", "timelinePredictions"]
        }
      }
    });

    const text = response.text || "";
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("AI Parse Error", e);
      return getMockReport();
    }
  }

  return getMockReport();
}

export async function chatWithAstro(question: string, history: any[]) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { role: "user", parts: [{ text: "You are the Astro AI Guide for 'HathRekha AI'. You are a mystical, wise, and high-tech palmist. You answer user questions about their destiny with a blend of ancient wisdom and futuristic terminology." }] },
      { role: "model", parts: [{ text: "I am ready, seeker. The stars align through my circuits." }] },
      ...history.map(h => ({ role: h.role === 'ai' ? 'model' : 'user', parts: [{ text: h.text }] })),
      { role: "user", parts: [{ text: question }] }
    ]
  });

  return response.text || "The stars are silent right now.";
}

function getMockReport() {
  return {
    scores: { destiny: 88, wealth: 75, love: 92, career: 81 },
    insights: {
      personality: "A natural leader with a sensitive soul. Your lines suggest a person who balances logic with deep intuition.",
      wealthForecast: "Prosperous trends ahead. A new revenue stream opens up within the next lunar cycle.",
      loveDestiny: "A soul connection is near. Focus on emotional clarity to welcome this energy.",
      careerPath: "A transition toward creative leadership is written. Don't fear the digital evolution.",
      growthWarnings: ["Avoid impulsive financial commitments in the short term.", "Stay grounded during public success."],
      remedies: ["Meditate with Amethyst for clarity.", "Wear gold accents on Thursdays."]
    },
    luckyTraits: {
      auraColor: "Electric Indigo",
      luckyGem: "Amethyst",
      powerNumbers: [7, 22, 88],
      rulingPlanet: "Jupiter"
    },
    timelinePredictions: {
      shortTerm: "A surprising professional offer arrives within 3 months.",
      mediumTerm: "Stabilization of wealth and potential for property investment within 1 year.",
      longTerm: "Your legacy begins to form. Recognition in your field by the 3rd year."
    }
  };
}
