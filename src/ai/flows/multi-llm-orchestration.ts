'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligent LLM orchestration.
 *
 * The flow `multiLLMOrchestration` routes user requests to different LLMs based on cost, rate limits, latency, and model specialization.
 * It also includes a fallback mechanism.
 * - `MultiLLMOrchestrationInput`: The input type for the multiLLMOrchestration function.
 * - `MultiLLMOrchestrationOutput`: The return type for the multiLLMOrchestration function.
 * - `multiLLMOrchestration`: The main function that orchestrates LLM calls.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultiLLMOrchestrationInputSchema = z.object({
  userInput: z.string().describe('The user input to be processed by the LLM.'),
  consultantMode: z.string().describe('The selected consultant mode (e.g., Relationship, Business).'),
  aiModel: z.string().describe('The selected AI model (e.g., Elena, Roy).'),
});
export type MultiLLMOrchestrationInput = z.infer<typeof MultiLLMOrchestrationInputSchema>;

const MultiLLMOrchestrationOutputSchema = z.object({
  llmResponse: z.string().describe('The response from the selected LLM.'),
});
export type MultiLLMOrchestrationOutput = z.infer<typeof MultiLLMOrchestrationOutputSchema>;

export async function multiLLMOrchestration(input: MultiLLMOrchestrationInput): Promise<MultiLLMOrchestrationOutput> {
  return multiLLMOrchestrationFlow(input);
}

const multiLLMOrchestrationPrompt = ai.definePrompt({
  name: 'multiLLMOrchestrationPrompt',
  input: {schema: MultiLLMOrchestrationInputSchema},
  output: {schema: MultiLLMOrchestrationOutputSchema},
  prompt: `You are an AI consultant. Your communication style and expertise depend on the selected consultant mode and AI model.

  Consultant Mode: {{{consultantMode}}}
  AI Model: {{{aiModel}}}
  User Input: {{{userInput}}}
  
  Please provide a helpful and relevant response to the user input.
  `,
});

const multiLLMOrchestrationFlow = ai.defineFlow(
  {
    name: 'multiLLMOrchestrationFlow',
    inputSchema: MultiLLMOrchestrationInputSchema,
    outputSchema: MultiLLMOrchestrationOutputSchema,
  },
  async input => {
    // TODO: Implement intelligent LLM routing based on cost, rate limits, latency, and model specialization.
    // TODO: Implement fallback mechanism.

    // For now, just use the default LLM and prompt
    const {output} = await multiLLMOrchestrationPrompt(input);
    return {
      llmResponse: output!.llmResponse,
    };
  }
);
