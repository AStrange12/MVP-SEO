"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Layout, Share2, Globe, CheckCircle2, Loader2, MapPin, Briefcase, Plus, Search, ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateBusinessDetails, type GenerateBusinessDetailsOutput } from "@/ai/flows/generate-business-details-flow";
import { generateMarketingContent, type GenerateMarketingContentOutput } from "@/ai/flows/generate-marketing-content-flow";
import { generateLandingPageContent, type GenerateLandingPageContentOutput } from "@/ai/flows/generate-landing-page-content";
import { analyzeWebsite, type AnalyzeWebsiteOutput } from "@/ai/flows/analyze-website-flow";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import LandingPagePreview from "@/components/dashboard/LandingPagePreview";
import MarketingTools from "@/components/dashboard/MarketingTools";
import ResultsDisplay from "@/components/dashboard/ResultsDisplay";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "dashboard">("input");
  
  // Inputs
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");

  // Generated Data
  const [details, setDetails] = useState<GenerateBusinessDetailsOutput | null>(null);
  const [marketing, setMarketing] = useState<GenerateMarketingContentOutput | null>(null);
  const [landingPage, setLandingPage] = useState<GenerateLandingPageContentOutput | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeWebsiteOutput | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

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

      // 3. Handle Website Option
      if (hasWebsite && websiteUrl) {
        const analysisResult = await analyzeWebsite({ websiteUrl, businessName, category });
        setAnalysis(analysisResult);
      } else {
        // Generate Landing Page
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
        setAnalysis(null);
      }

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

  if (!isAuthenticated) return null;

  if (step === "input") {
    return (
      <div className="min-h-[calc(100vh-80px)] hero-gradient flex items-center justify-center p-6">
        <Card className="w-full max-w-xl glass-morphism border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="pb-8 pt-10 text-center">
            <div className="mx-auto bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">New Business Setup</CardTitle>
            <CardDescription className="text-lg">Enter your details and let AI do the heavy lifting.</CardDescription>
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

              <div className="space-y-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <Label htmlFor="website-toggle" className="flex flex-col gap-1 cursor-pointer">
                    <span className="font-bold">Existing Website?</span>
                    <span className="text-xs text-muted-foreground font-normal">I already have a website to boost.</span>
                  </Label>
                  <Switch 
                    id="website-toggle" 
                    checked={hasWebsite} 
                    onCheckedChange={setHasWebsite}
                  />
                </div>
                {hasWebsite && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="https://yourwebsite.com" 
                        value={websiteUrl} 
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="pl-10 h-11 bg-background/50 border-white/10"
                        required={hasWebsite}
                        type="url"
                      />
                    </div>
                  </div>
                )}
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
                    Boost My Business
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
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
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-bold">{businessName}</span>
            <span className="text-xs text-muted-foreground">{category} • {location}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setStep("input")} className="rounded-full">
            <Plus className="w-4 h-4 mr-2" /> New Setup
          </Button>
          {!analysis && (
            <Button size="sm" className="rounded-full px-6" onClick={() => toast({ title: "Deploying...", description: "Simulating deployment of your website." })}>
              <Globe className="w-4 h-4 mr-2" /> Deploy Site
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-secondary/50 p-1 rounded-full border border-white/5 h-12 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="website" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              {analysis ? "Audit" : "Website"}
            </TabsTrigger>
            <TabsTrigger value="marketing" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              Marketing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-in fade-in zoom-in-95 duration-300">
            <ResultsDisplay details={details!} />
          </TabsContent>

          <TabsContent value="website" className="animate-in fade-in zoom-in-95 duration-300">
            {analysis ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-headline font-bold">Website Audit & SEO</h2>
                    <p className="text-muted-foreground">Expert suggestions for <span className="text-primary">{websiteUrl}</span></p>
                  </div>
                  <Card className="glass-morphism border-primary/20 px-6 py-4 flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs font-bold text-muted-foreground uppercase">Visibility Score</div>
                      <div className="text-3xl font-headline font-bold text-primary">{analysis.visibilityScore}%</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="glass-morphism border-white/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-accent" />
                        SEO Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.seoSuggestions.map((item, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-xl bg-background/50 border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass-morphism border-white/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-primary" />
                        UX Improvement Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.improvementTips.map((item, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-xl bg-background/50 border border-white/5">
                          <ExternalLink className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass-morphism border-primary/10 overflow-hidden">
                   <div className="bg-primary/10 px-6 py-3 border-b border-primary/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">Marketing Refresh</span>
                   </div>
                   <CardContent className="p-8 text-center space-y-4">
                      <div className="text-4xl font-headline font-bold">"{analysis.marketingContent.heroHeadline}"</div>
                      <Badge variant="secondary" className="px-4 py-1 text-lg">{analysis.marketingContent.newTagline}</Badge>
                      <p className="text-muted-foreground max-w-xl mx-auto pt-4">Replace your current hero section with these suggestions to boost conversion rates by up to 40%.</p>
                   </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-headline font-bold">Landing Page Preview</h2>
                    <p className="text-muted-foreground">This is how your website looks out of the box.</p>
                  </div>
                  <Button size="sm" variant="accent" onClick={() => toast({ title: "Success!", description: "Website deployed to localboost-ai.vercel.app" })} className="rounded-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Publish Live
                  </Button>
                </div>
                <LandingPagePreview content={landingPage!} businessName={businessName} />
              </>
            )}
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
