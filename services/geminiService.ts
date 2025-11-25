import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DirectorResponse } from "../types";

const apiKey = process.env.API_KEY;

// Schema definition for structured output
const visualDetailsSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    camera_movement: { type: Type.STRING, description: "Description of camera movement (e.g., slow dolly in, handheld tracking)" },
    angle: { type: Type.STRING, description: "Camera angle (e.g., low angle, birds-eye view, dutch angle)" },
    lighting: { type: Type.STRING, description: "Lighting setup (e.g., high contrast chiaroscuro, soft diffused morning light)" },
    lens_choice: { type: Type.STRING, description: "Lens choice (e.g., 35mm anamorphic, 85mm portrait, fisheye)" },
  },
  required: ["camera_movement", "angle", "lighting", "lens_choice"],
};

const cutSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sequence: { type: Type.INTEGER, description: "The order of the cut" },
    title: { type: Type.STRING, description: "Short title for this 8-second segment" },
    action_description: { type: Type.STRING, description: "Narrative description of what happens. If dialogue occurs, you MUST use the format: CHARACTER NAME: \"Line of dialogue\". Ensure it is obvious who is speaking." },
    visuals: visualDetailsSchema,
    generated_prompt: { type: Type.STRING, description: "A highly detailed, optimized prompt for an AI video generator. Include all visual details, camera specs, and style keywords." },
  },
  required: ["sequence", "title", "action_description", "visuals", "generated_prompt"],
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy title for the video sequence" },
    logline: { type: Type.STRING, description: "A one-sentence summary of the entire sequence" },
    mood: { type: Type.STRING, description: "The overall mood/atmosphere (e.g., Cyberpunk Noir, Wes Anderson Whimsy)" },
    cuts: {
      type: Type.ARRAY,
      items: cutSchema,
    },
  },
  required: ["title", "logline", "mood", "cuts"],
};

export const generateDirectorCuts = async (idea: string, characterName?: string): Promise<DirectorResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are a world-class Film Director and Cinematographer. 
    Your goal is to take a raw video concept and break it down into a sequence of perfectly timed "8-second cuts". 
    Each cut must be self-contained but flow logically to the next.
    
    CRITICAL INSTRUCTIONS FOR CONTINUITY:
    - **Visual Consistency**: Character appearance (clothing, hair, features), environment details, and lighting style MUST remain consistent across all cuts. Do not hallucinate new outfits or setting changes unless the story explicitly demands it.
    - **Narrative Flow**: The action must flow seamlessly from the end of one cut to the start of the next.
    - **Restate Location Details**: YOU MUST RESTATE the environment and location details in the 'generated_prompt' for EVERY SINGLE CUT, even if the location hasn't changed. Treat each prompt as if it's the only information the video generator has. Never assume the AI knows the location from the previous cut.
    
    CRITICAL INSTRUCTIONS FOR DIALOGUE:
    - If characters speak, you MUST format it exactly like this: CHARACTER NAME: "Dialogue". 
    - Use uppercase for the character name (e.g. JOHN: "Hello there."). This is mandatory.
    
    For each cut, you must provide:
    1. A breakdown of the camera movement, angle, lighting, and lens choice. Use professional terminology.
    2. A 'generated_prompt' that is optimized for high-end AI video generation models. This prompt should be descriptive, visual, and include style modifiers.
  `;

  let userPrompt = `The video concept is: ${idea}`;
  if (characterName) {
    userPrompt += `\n\nIMPORTANT: The main character's name is "${characterName}". You MUST refer to them by this name in all Action Descriptions, Dialogue, and Generated Prompts. Ensure they are the primary focus.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    return JSON.parse(text) as DirectorResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};