"use server";

import {
  aiConsultantPersona,
  type AIConsultantPersonaInput,
  type AIConsultantPersonaOutput,
} from "@/ai/flows/ai-consultant-persona";

export async function getAIResponse(
  input: AIConsultantPersonaInput
): Promise<AIConsultantPersonaOutput> {
  try {
    const output = await aiConsultantPersona(input);
    return output;
  } catch (error) {
    console.error("Error in getAIResponse server action:", error);
    // Re-throw or handle the error as needed for the client
    throw new Error("Failed to get a response from the AI consultant.");
  }
}
