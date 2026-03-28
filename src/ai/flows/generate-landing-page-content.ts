'use server';
/**
 * @fileOverview A Genkit flow for generating comprehensive landing page content
 * based on business details.
 *
 * - generateLandingPageContent - A function that handles the landing page content generation process.
 * - GenerateLandingPageContentInput - The input type for the generateLandingPageContent function.
 * - GenerateLandingPageContentOutput - The return type for the generateLandingPageContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLandingPageContentInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  category: z.string().describe('The category of the business (e.g., "Italian Restaurant", "Plumbing Service").'),
  location: z.string().describe('The location of the business (e.g., "New York, NY").'),
  businessDescription: z.string().describe('A detailed description of the business.'),
  tagline: z.string().describe('A catchy tagline for the business.'),
  seoKeywords: z.array(z.string()).describe('A list of SEO keywords relevant to the business.'),
  servicesList: z.array(
    z.object({
      name: z.string().describe('Name of the service'),
      description: z.string().describe('Description of the service'),
    })
  ).describe('A list of services offered by the business, each with a name and description.'),
});
export type GenerateLandingPageContentInput = z.infer<typeof GenerateLandingPageContentInputSchema>;

const GenerateLandingPageContentOutputSchema = z.object({
  heroSection: z.object({
    headline: z.string().describe('A compelling main headline for the hero section.'),
    subheadline: z.string().describe('A descriptive subheadline that supports the main headline.'),
    callToAction: z.string().describe('A clear call to action for the hero section (e.g., "Book Now", "Learn More").'),
  }).describe('Content for the hero section of the landing page.'),
  aboutSection: z.object({
    aboutText: z.string().describe('Engaging text for the "About Us" section, highlighting the business story and value.'),
  }).describe('Content for the "About Us" section of the landing page.'),
  servicesSection: z.object({
    services: z.array(
      z.object({
        name: z.string().describe('Name of the service'),
        description: z.string().describe('Detailed description of the service'),
      })
    ).describe('A list of services with their names and detailed descriptions.'),
  }).describe('Content for the services section of the landing page.'),
  contactSection: z.object({
    email: z.string().describe('Placeholder email address for the business.'),
    phone: z.string().describe('Placeholder phone number for the business.'),
    address: z.string().describe('Placeholder physical address for the business.'),
    callToAction: z.string().describe('A call to action for the contact section (e.g., "Get a Free Quote", "Visit Us").'),
  }).describe('Content for the contact section of the landing page.'),
});
export type GenerateLandingPageContentOutput = z.infer<typeof GenerateLandingPageContentOutputSchema>;

export async function generateLandingPageContent(input: GenerateLandingPageContentInput): Promise<GenerateLandingPageContentOutput> {
  return generateLandingPageContentFlow(input);
}

const generateLandingPageContentPrompt = ai.definePrompt({
  name: 'generateLandingPageContentPrompt',
  input: { schema: GenerateLandingPageContentInputSchema },
  output: { schema: GenerateLandingPageContentOutputSchema },
  prompt: `You are an expert marketing copywriter specializing in creating compelling landing page content for small local businesses.
Your goal is to generate high-quality, engaging content for a business's landing page sections: Hero, About, Services, and Contact.
The content should be tailored to the business details provided below, professional, and designed to attract customers.

Business Name: {{{businessName}}}
Category: {{{category}}}
Location: {{{location}}}
Business Description: {{{businessDescription}}}
Tagline: {{{tagline}}}
SEO Keywords: {{#each seoKeywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Services List:
{{#if servicesList}}
{{#each servicesList}}
- Name: {{{this.name}}}
  Description: {{{this.description}}}
{{/each}}
{{else}}
(No specific services provided, generate based on category.)
{{/if}}

Based on the information above, generate content for the following landing page sections:

1.  **Hero Section**: Craft a catchy headline, a descriptive subheadline, and a strong call to action that encourages visitors to engage.
2.  **About Section**: Write a concise and engaging "About Us" text that highlights the business's unique value proposition, mission, and story. Focus on what makes the business special.
3.  **Services Section**: Elaborate on the services provided. If an existing list is given, enhance their descriptions. If no list is provided, generate a suitable list of 3-5 common services based on the business category, each with a compelling name and description. Ensure the services are attractive to potential customers.
4.  **Contact Section**: Provide realistic placeholder contact information (email, phone, address) and a clear call to action for customers to get in touch or visit. Ensure the contact details feel authentic and professional.

Ensure the output strictly follows the JSON format described in the output schema.`,
});

const generateLandingPageContentFlow = ai.defineFlow(
  {
    name: 'generateLandingPageContentFlow',
    inputSchema: GenerateLandingPageContentInputSchema,
    outputSchema: GenerateLandingPageContentOutputSchema,
  },
  async (input) => {
    const { output } = await generateLandingPageContentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate landing page content.');
    }
    return output;
  }
);
