'use server';
/**
 * @fileOverview A comprehensive Genkit flow to generate a complete Online Presence Booster Toolkit.
 *
 * - generateMarketingContent - A function that generates social, SEO, ads, reviews, and planning content.
 * - GenerateMarketingContentInput - The input type.
 * - GenerateMarketingContentOutput - The expanded toolkit output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  category: z.string().describe('The category or industry of the business.'),
  location: z.string().describe('The physical location or service area of the business.'),
  businessDescription: z.string().describe('A detailed description of the business.'),
  tagline: z.string().describe('The business tagline.'),
  servicesList: z.array(z.string()).describe('A list of services or products offered by the business.'),
});
export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

const GenerateMarketingContentOutputSchema = z.object({
  social: z.object({
    instagramCaption: z.string().describe('Engaging Instagram caption with emojis.'),
    whatsAppMessage: z.string().describe('Promotional WhatsApp message.'),
    linkedInPost: z.string().describe('Professional LinkedIn update.'),
    twitterPost: z.string().describe('Short, punchy Twitter/X post.'),
  }),
  seo: z.object({
    titleTag: z.string().describe('SEO optimized page title (under 60 chars).'),
    metaDescription: z.string().describe('Compelling meta description (under 160 chars).'),
    keywords: z.array(z.string()).describe('Top 5 high-intent SEO keywords.'),
  }),
  googleBusiness: z.object({
    description: z.string().describe('Optimized Google Business Profile description.'),
    announcement: z.string().describe('A "Grand Opening" or "New Service" update post.'),
  }),
  ads: z.object({
    facebookAd: z.object({
      headline: z.string(),
      body: z.string(),
      cta: z.string(),
    }),
    googleAd: z.object({
      headline: z.string(),
      description: z.string(),
    }),
  }),
  reviews: z.object({
    sampleReviews: z.array(z.string()).describe('3 sample customer reviews.'),
    replyTemplates: z.array(z.string()).describe('2 professional reply templates.'),
  }),
  contentPlan: z.array(z.object({
    day: z.number(),
    topic: z.string(),
    type: z.string().describe('e.g., Educational, Promotional, Behind the Scenes'),
    brief: z.string(),
  })).describe('A 7-day strategic content calendar.'),
  branding: z.object({
    slogans: z.array(z.string()).describe('3 alternative slogans/taglines.'),
    colorThemeSuggestion: z.string().describe('Suggested color palette description.'),
  }),
  presenceScore: z.number().min(0).max(100).describe('Estimated online presence score based on info provided.'),
});
export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

export async function generateMarketingContent(input: GenerateMarketingContentInput): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: { schema: GenerateMarketingContentInputSchema },
  output: { schema: GenerateMarketingContentOutputSchema },
  prompt: `You are a world-class digital marketing agency specializing in small local businesses. 
Your goal is to build a complete "Online Presence Booster Toolkit" for the following business.

Business Name: {{{businessName}}}
Category: {{{category}}}
Location: {{{location}}}
Description: {{{businessDescription}}}
Tagline: {{{tagline}}}
Services: {{#each servicesList}}- {{{this}}} {{/each}}

Please generate:
1. **Social Suite**: Multi-platform captions (IG, WA, LinkedIn, Twitter).
2. **SEO Pack**: Meta tags and keywords to rank locally.
3. **GBP Content**: Optimized description and a launch post for Google Business Profile.
4. **Ad Copy**: High-converting copy for Facebook/Instagram and Google Ads.
5. **Review Management**: Sample reviews and professional reply templates.
6. **7-Day Strategy**: A daily plan for the first week of marketing.
7. **Branding Refresh**: Alternative slogans and visual theme ideas.
8. **Presence Score**: A mock score (0-100) indicating how "ready" their online presence is.

Ensure the tone is professional yet accessible, and tailored perfectly to the local context of {{{location}}}.`,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Marketing content generation failed.');
    return output;
  }
);
