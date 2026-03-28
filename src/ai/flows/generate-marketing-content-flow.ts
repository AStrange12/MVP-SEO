'use server';
/**
 * @fileOverview A Genkit flow to generate marketing content like Instagram captions and WhatsApp messages for a business.
 *
 * - generateMarketingContent - A function that handles the marketing content generation process.
 * - GenerateMarketingContentInput - The input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  category: z.string().describe('The category or industry of the business.'),
  location: z.string().describe('The physical location or service area of the business.'),
  businessDescription: z.string().describe('A detailed description of the business.'),
  tagline: z.string().describe('The business tagline.'),
  servicesList: z
    .array(z.string())
    .describe('A list of services or products offered by the business.'),
});
export type GenerateMarketingContentInput = z.infer<
  typeof GenerateMarketingContentInputSchema
>;

const GenerateMarketingContentOutputSchema = z.object({
  instagramCaption: z
    .string()
    .describe('An engaging Instagram caption for the business.'),
  whatsAppMessage: z
    .string()
    .describe('A promotional WhatsApp message for the business.'),
});
export type GenerateMarketingContentOutput = z.infer<
  typeof GenerateMarketingContentOutputSchema
>;

export async function generateMarketingContent(
  input: GenerateMarketingContentInput
): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are a marketing expert for small local businesses. Your goal is to create compelling marketing copy.

Based on the following business details, generate an engaging Instagram caption and a promotional WhatsApp message.

Business Name: {{{businessName}}}
Category: {{{category}}}
Location: {{{location}}}
Description: {{{businessDescription}}}
Tagline: {{{tagline}}}
Services: {{#each servicesList}}- {{{this}}}{{/each}}

Instagram Caption:
- Keep it concise and use relevant emojis.
- Include a call to action.
- Use hashtags relevant to the business and services.

WhatsApp Message:
- Keep it friendly and informative.
- Highlight key offerings or a special promotion.
- Include contact information or a clear next step.
`,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
