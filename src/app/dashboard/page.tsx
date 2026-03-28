"use client";

import { useState } from "react";
import { Sparkles, Layout, Share2, Globe, CheckCircle2, Loader2, MapPin, Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateBusinessDetails, type GenerateBusinessDetailsOutput } from "@/ai/flows/generate-business-details-flow";
import { generateMarketingContent, type GenerateMarketingContentOutput } from "@/ai/flows/generate-marketing-content-flow";
import { generateLandingPageContent, type GenerateLandingPageContentOutput } from "@/ai/flows/generate-landing-page-content";
import { useToast } from "@/hooks/use-toast";
import LandingPagePreview from "@/components/dashboard/LandingPagePreview";
import MarketingTools from "@/components/dashboard/MarketingTools";
import ResultsDisplay from "@/components/dashboard/ResultsDisplay";

export default function DashboardPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "dashboard">("input");
  
  // Inputs
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // Generated Data
  const [details, setDetails] = useState<GenerateBusinessDetailsOutput | null>(null);
  const [marketing, setMarketing] = useState<GenerateMarketingContentOutput | null>(null);
  const [landingPage, setLandingPage] = useState<GenerateLandingPageContentOutput | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !category || !location) return;

    setLoading(true);
    try {
      // 1. Generate Business Details
      const detailsResult = await generateBusinessDetails({ businessName, category, location });
      setDetails(detailsResult);

      // 2. Generate Marketing Content
      const marketingResult = await generateMarketingContent({
        businessName,
        category,
        location,
        businessDescription: detailsResult.description,
        tagline: detailsResult.tagline,
        servicesList: detailsResult.servicesList
      });
      setMarketing(marketingResult);

      // 3. Generate Landing Page (Prepare services format first)
      const servicesFormatted = detailsResult.servicesList.map(s => ({ 
        name: s, 
        description: `High-quality ${s} tailored for our customers in ${location}.` 
      }));

      const landingResult = await generateLandingPageContent({
        businessName,
        category,
        location,
        businessDescription: detailsResult.description,
        tagline: detailsResult.tagline,
        seoKeywords: detailsResult.seoKeywords,
        servicesList: servicesFormatted
      });
      setLandingPage(landingResult);

      setStep("dashboard");
      toast({
        title: "Success!",
        description: "Your business assets have been generated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate business content. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === "input") {
    return (
      <div className="min-h-screen bg-background hero-gradient flex items-center justify-center p-6">
        <Card className="w-full max-w-xl glass-morphism border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="pb-8 pt-10 text-center">
            <div className="mx-auto bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">New Business Setup</CardTitle>
            <CardDescription className="text-lg">Enter a few details and let AI do the heavy lifting.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Business Name
                </label>
                <Input 
                  placeholder="e.g. Blue Door Bakery" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-12 bg-background/50 border-white/10"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Category
                  </label>
                  <Input 
                    placeholder="e.g. Italian Restaurant" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-12 bg-background/50 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <Input 
                    placeholder="e.g. Austin, TX" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12 bg-background/50 border-white/10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 rounded-full font-headline text-lg group relative overflow-hidden" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    Generate Assets
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {loading && (
                  <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 glass-morphism sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary w-5 h-5" />
          <span className="font-headline font-bold text-lg tracking-tight">LocalBoost AI</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-sm font-bold">{businessName}</span>
            <span className="text-xs text-muted-foreground">{category} • {location}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setStep("input")}>
            <Plus className="w-4 h-4 mr-2" /> New Business
          </Button>
          <Button size="sm" onClick={() => toast({ title: "Deploying...", description: "Simulating deployment of your website." })}>
            <Globe className="w-4 h-4 mr-2" /> Deploy Site
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-secondary/50 p-1 rounded-full border border-white/5 h-12 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="website" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              Website
            </TabsTrigger>
            <TabsTrigger value="marketing" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              Marketing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-in fade-in zoom-in-95 duration-300">
            <ResultsDisplay details={details!} />
          </TabsContent>

          <TabsContent value="website" className="animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-headline font-bold">Landing Page Preview</h2>
                <p className="text-muted-foreground">This is how your website looks out of the box.</p>
              </div>
              <Button size="sm" variant="accent" onClick={() => toast({ title: "Success!", description: "Website deployed to localboost-ai.vercel.app" })}>
                <CheckCircle2 className="w-4 h-4 mr-2" /> Publish Live
              </Button>
            </div>
            <LandingPagePreview content={landingPage!} businessName={businessName} />
          </TabsContent>

          <TabsContent value="marketing" className="animate-in fade-in zoom-in-95 duration-300">
            <MarketingTools marketing={marketing!} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
