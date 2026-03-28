'use server';
/**
 * @fileOverview A Genkit flow for generating comprehensive business details.
 *
 * - generateBusinessDetails - A function that generates business description, tagline, SEO keywords, and services list.
 * - GenerateBusinessDetailsInput - The input type for the generateBusinessDetails function.
 * - GenerateBusinessDetailsOutput - The return type for the generateBusinessDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessDetailsInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  category: z.string().describe('The category or industry of the business (e.g., "Italian Restaurant", "Pet Grooming", "Consulting Firm").'),
  location: z.string().describe('The geographic location of the business (e.g., "Downtown Los Angeles", "New York City", "Online Only").'),
});
export type GenerateBusinessDetailsInput = z.infer<typeof GenerateBusinessDetailsInputSchema>;

const GenerateBusinessDetailsOutputSchema = z.object({
  description: z.string().describe('A detailed and engaging description of the business.'),
  tagline: z.string().describe('A catchy and memorable tagline for the business.'),
  seoKeywords: z.array(z.string()).describe('A list of relevant SEO keywords for the business, separated by commas.'),
  servicesList: z.array(z.string()).describe('A detailed list of services offered by the business, each as a separate item.'),
});
export type GenerateBusinessDetailsOutput = z.infer<typeof GenerateBusinessDetailsOutputSchema>;

export async function generateBusinessDetails(input: GenerateBusinessDetailsInput): Promise<GenerateBusinessDetailsOutput> {
  return generateBusinessDetailsFlow(input);
}

const businessDetailsPrompt = ai.definePrompt({
  name: 'businessDetailsPrompt',
  input: {schema: GenerateBusinessDetailsInputSchema},
  output: {schema: GenerateBusinessDetailsOutputSchema},
  prompt: `You are an expert business assistant. Your task is to generate comprehensive business details based on the provided information.

Generate the following:
- A detailed and engaging business description.
- A catchy and memorable tagline.
- A list of relevant SEO keywords.
- A detailed list of services offered.

Business Name: {{{businessName}}}
Category: {{{category}}}
Location: {{{location}}}`,
});

const generateBusinessDetailsFlow = ai.defineFlow(
  {
    name: 'generateBusinessDetailsFlow',
    inputSchema: GenerateBusinessDetailsInputSchema,
    outputSchema: GenerateBusinessDetailsOutputSchema,
  },
  async (input) => {
    const {output} = await businessDetailsPrompt(input);
    return output!;
  }
);
