
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionInputs, PredictionResult } from "../types";

export const predictPerformance = async (inputs: PredictionInputs): Promise<PredictionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Act as a World-Class Cricket Performance Analyst using data-driven scouting. 
    Predict the performance for ${inputs.batsmanName} with this elite context:
    - Match: ${inputs.matchFormat} (${inputs.matchType})
    - Opponent: ${inputs.opponentTeam}
    - Venue: ${inputs.ground} (Pitch: ${inputs.pitchNature})
    - Weather: ${inputs.conditions}
    - Player Role: ${inputs.playerRole} at Pos #${inputs.battingOrder}
    - Context: ${inputs.tossContext} under ${inputs.pressureLevel} pressure.
    - Form: ${inputs.recentForm}
    
    Calculate realistic probabilities based on historical matchups between ${inputs.batsmanName} and ${inputs.opponentTeam}'s typical bowling attack composition.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          expectedRuns: {
            type: Type.OBJECT,
            properties: {
              min: { type: Type.NUMBER },
              max: { type: Type.NUMBER },
              avg: { type: Type.NUMBER }
            },
            required: ['min', 'max', 'avg']
          },
          strikeRate: { type: Type.NUMBER },
          probabilityOfThirty: { type: Type.NUMBER },
          probabilityOfFifty: { type: Type.NUMBER },
          probabilityOfHundred: { type: Type.NUMBER },
          performanceAgainstPace: { type: Type.NUMBER },
          performanceAgainstSpin: { type: Type.NUMBER },
          primaryThreat: { type: Type.STRING },
          riskLevel: { type: Type.STRING },
          keyInsights: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          phasedAnalysis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                expectedRuns: { type: Type.NUMBER },
                intensity: { type: Type.NUMBER }
              },
              required: ['phase', 'expectedRuns', 'intensity']
            }
          },
          technicalAdvice: { type: Type.STRING }
        },
        required: [
          'expectedRuns', 'strikeRate', 'probabilityOfThirty', 'probabilityOfFifty', 
          'probabilityOfHundred', 'performanceAgainstPace', 'performanceAgainstSpin',
          'primaryThreat', 'riskLevel', 'keyInsights', 'phasedAnalysis', 'technicalAdvice'
        ]
      }
    }
  });

  return JSON.parse(response.text);
};
