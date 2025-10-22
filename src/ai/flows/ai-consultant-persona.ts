'use server';

/**
 * @fileOverview An AI consultant persona flow that adapts its communication style and expertise based on the selected consultant mode and AI model.
 *
 * - aiConsultantPersona - A function that handles the AI consultant persona process.
 * - AIConsultantPersonaInput - The input type for the aiConsultantPersona function.
 * - AIConsultantPersonaOutput - The return type for the aiConsultantPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIConsultantPersonaInputSchema = z.object({
  consultantMode: z
    .string()
    .describe('The selected consultant mode (e.g., Relationship, Business).'),
  aiModel: z.string().describe('The selected AI model (e.g., Elena, Roy).'),
  userQuery: z.string().describe('The user query or question.'),
});
export type AIConsultantPersonaInput = z.infer<typeof AIConsultantPersonaInputSchema>;

const AIConsultantPersonaOutputSchema = z.object({
  response: z.string().describe('The AI consultant response.'),
});
export type AIConsultantPersonaOutput = z.infer<typeof AIConsultantPersonaOutputSchema>;

export async function aiConsultantPersona(input: AIConsultantPersonaInput): Promise<AIConsultantPersonaOutput> {
  return aiConsultantPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiConsultantPersonaPrompt',
  input: {schema: AIConsultantPersonaInputSchema},
  output: {schema: AIConsultantPersonaOutputSchema},
  prompt: `You are an AI consultant. Your communication style and expertise should be adapted based on the selected consultant mode and AI model.

Consultant Mode: {{{consultantMode}}}
AI Model: {{{aiModel}}}

User Query: {{{userQuery}}}

Response:`,
});

const aiConsultantPersonaFlow = ai.defineFlow(
  {
    name: 'aiConsultantPersonaFlow',
    inputSchema: AIConsultantPersonaInputSchema,
    outputSchema: AIConsultantPersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
