'use server';
/**
 * @fileOverview A Genkit flow for analyzing an existing website.
 *
 * - analyzeWebsite - A function that handles existing website analysis.
 * - AnalyzeWebsiteInput - The input type.
 * - AnalyzeWebsiteOutput - The return type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeWebsiteInputSchema = z.object({
  websiteUrl: z.string().url().describe('The URL of the existing website to analyze.'),
  businessName: z.string().describe('The name of the business.'),
  category: z.string().describe('The industry or category.'),
});
export type AnalyzeWebsiteInput = z.infer<typeof AnalyzeWebsiteInputSchema>;

const AnalyzeWebsiteOutputSchema = z.object({
  seoSuggestions: z.array(z.string()).describe('List of SEO improvements.'),
  improvementTips: z.array(z.string()).describe('List of general website UX/UI improvement tips.'),
  marketingContent: z.object({
    newTagline: z.string().describe('A fresh tagline.'),
    heroHeadline: z.string().describe('A suggested new hero headline.'),
  }),
  visibilityScore: z.number().min(0).max(100).describe('A mock visibility score from 0 to 100.'),
});
export type AnalyzeWebsiteOutput = z.infer<typeof AnalyzeWebsiteOutputSchema>;

export async function analyzeWebsite(input: AnalyzeWebsiteInput): Promise<AnalyzeWebsiteOutput> {
  return analyzeWebsiteFlow(input);
}

const analyzeWebsitePrompt = ai.definePrompt({
  name: 'analyzeWebsitePrompt',
  input: { schema: AnalyzeWebsiteInputSchema },
  output: { schema: AnalyzeWebsiteOutputSchema },
  prompt: `You are a professional website auditor and digital marketer.
Analyze the following business information and their current website presence (represented by the URL).
Since you cannot browse the live web, use the URL and business context to provide expert-level suggestions.

Business: {{{businessName}}}
Category: {{{category}}}
URL: {{{websiteUrl}}}

Generate:
1.  **SEO Suggestions**: 3-5 specific technical or content SEO improvements.
2.  **UX Improvement Tips**: 3-4 tips to improve conversion and user experience.
3.  **Marketing Refresh**: A new punchy tagline and hero headline.
4.  **Visibility Score**: A mock numerical score (0-100) based on how well-optimized this type of business usually is at that scale.

Ensure the tone is helpful, professional, and encouraging.`,
});

const analyzeWebsiteFlow = ai.defineFlow(
  {
    name: 'analyzeWebsiteFlow',
    inputSchema: AnalyzeWebsiteInputSchema,
    outputSchema: AnalyzeWebsiteOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeWebsitePrompt(input);
    if (!output) throw new Error('Failed to analyze website.');
    return output;
  }
);
