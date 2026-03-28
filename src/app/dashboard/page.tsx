
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Layout, Share2, Globe, CheckCircle2, Loader2, MapPin, Briefcase, Plus, Search, ExternalLink, ShieldAlert, ArrowRight, MousePointer2 } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "dashboard">("input");
  
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");

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
      const detailsResult = await generateBusinessDetails({ businessName, category, location });
      setDetails(detailsResult);

      const marketingResult = await generateMarketingContent({
        businessName,
        category,
        location,
        businessDescription: detailsResult.description,
        tagline: detailsResult.tagline,
        servicesList: detailsResult.servicesList
      });
      setMarketing(marketingResult);

      if (hasWebsite && websiteUrl) {
        const analysisResult = await analyzeWebsite({ websiteUrl, businessName, category });
        setAnalysis(analysisResult);
      } else {
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
        title: "Magic Complete",
        description: "Your business ecosystem has been generated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "System Error",
        description: "Generation engine encountered an issue.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <AnimatePresence mode="wait">
      {step === "input" ? (
        <motion.div 
          key="input"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6"
        >
          <Card className="w-full max-w-2xl glass-card border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <CardHeader className="pb-8 pt-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="mx-auto bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <Sparkles className="text-primary w-8 h-8" />
              </div>
              <CardTitle className="text-4xl font-headline font-bold tracking-tight mb-2">Initialize Business</CardTitle>
              <CardDescription className="text-xl font-light">Let our AI architect your digital future.</CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-12">
              <form onSubmit={handleGenerate} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" /> Business Identity
                  </label>
                  <Input 
                    placeholder="e.g. Quantum Coffee Labs" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-14 bg-white/5 border-white/10 text-lg rounded-xl focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Layout className="w-4 h-4 text-primary" /> Sector
                    </label>
                    <Input 
                      placeholder="e.g. Tech Cafe" 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-14 bg-white/5 border-white/10 text-lg rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> Geo-Location
                    </label>
                    <Input 
                      placeholder="e.g. San Francisco, CA" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)}
                      className="h-14 bg-white/5 border-white/10 text-lg rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-6 p-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="website-toggle" className="flex flex-col gap-1 cursor-pointer">
                      <span className="text-lg font-bold">Existing Infrastructure?</span>
                      <span className="text-sm text-muted-foreground font-light">Audit an already live website.</span>
                    </Label>
                    <Switch 
                      id="website-toggle" 
                      checked={hasWebsite} 
                      onCheckedChange={setHasWebsite}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  {hasWebsite && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="space-y-2 pt-2"
                    >
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <Input 
                          placeholder="https://yourdomain.com" 
                          value={websiteUrl} 
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="pl-12 h-14 bg-white/5 border-white/10 rounded-xl"
                          required={hasWebsite}
                          type="url"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 rounded-full font-headline text-xl group relative overflow-hidden bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Synthesizing Assets...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Generate Ecosystem
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen pb-20"
        >
          <header className="px-8 py-5 flex items-center justify-between border-b border-white/5 glass-morphism sticky top-0 z-40 backdrop-blur-2xl">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                {businessName[0].toUpperCase()}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-lg font-bold tracking-tight">{businessName}</span>
                <span className="text-xs text-muted-foreground font-light uppercase tracking-widest">{category} • {location}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("input")} className="rounded-full hover:bg-white/5">
                <Plus className="w-4 h-4 mr-2" /> New Project
              </Button>
              {!analysis && (
                <Button size="sm" className="rounded-full px-6 bg-white text-black hover:bg-white/90 shadow-xl" onClick={() => toast({ title: "Deploying...", description: "Pushing site to edge network." })}>
                  <Globe className="w-4 h-4 mr-2" /> Deploy Site
                </Button>
              )}
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-8 pt-12">
            <Tabs defaultValue="overview" className="space-y-12">
              <TabsList className="bg-white/5 p-1.5 rounded-full border border-white/10 h-14 w-full max-w-xl mx-auto grid grid-cols-3 shadow-inner">
                <TabsTrigger value="overview" className="rounded-full text-sm font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  Identity
                </TabsTrigger>
                <TabsTrigger value="website" className="rounded-full text-sm font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  {analysis ? "Audit" : "Interface"}
                </TabsTrigger>
                <TabsTrigger value="marketing" className="rounded-full text-sm font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  Marketing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <ResultsDisplay details={details!} />
                </motion.div>
              </TabsContent>

              <TabsContent value="website">
                <AnimatePresence mode="wait">
                  {analysis ? (
                    <motion.div 
                      key="audit"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-10"
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <Badge className="mb-2 bg-primary/20 text-primary border-primary/20">Active Analysis</Badge>
                          <h2 className="text-4xl font-headline font-bold">Infrastructural Audit</h2>
                          <p className="text-muted-foreground font-light text-lg">Optimizing <span className="text-primary font-medium">{websiteUrl}</span> for the future.</p>
                        </div>
                        <Card className="glass-card px-8 py-6 flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Visibility Score</div>
                            <div className="text-5xl font-headline font-bold text-primary">{analysis.visibilityScore}%</div>
                          </div>
                          <div className="w-14 h-14 rounded-full border-4 border-primary/30 border-t-primary animate-spin" style={{ animationDuration: '2s' }} />
                        </Card>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <Card className="glass-card p-4 overflow-hidden group">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                              <Search className="w-6 h-6 text-accent" />
                              SEO Protocols
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {analysis.seoSuggestions.map((item, i) => (
                              <motion.div 
                                key={i} 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-accent/30 transition-all"
                              >
                                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                <span className="text-lg font-light leading-snug">{item}</span>
                              </motion.div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card className="glass-card p-4 overflow-hidden group">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                              <ShieldAlert className="w-6 h-6 text-primary" />
                              UX Enhancements
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {analysis.improvementTips.map((item, i) => (
                              <motion.div 
                                key={i} 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary/30 transition-all"
                              >
                                <ExternalLink className="w-6 h-6 text-primary shrink-0" />
                                <span className="text-lg font-light leading-snug">{item}</span>
                              </motion.div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="glass-card overflow-hidden relative">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
                         <div className="bg-primary/20 px-8 py-4 border-b border-primary/10">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Neural Marketing Refresh</span>
                         </div>
                         <CardContent className="p-12 text-center space-y-8">
                            <motion.div 
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-5xl font-headline font-bold leading-tight"
                            >
                              "{analysis.marketingContent.heroHeadline}"
                            </motion.div>
                            <div className="flex justify-center">
                              <Badge variant="secondary" className="px-6 py-2 text-xl bg-primary/10 text-primary border-primary/20 rounded-full font-light tracking-wide">
                                {analysis.marketingContent.newTagline}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-xl max-w-2xl mx-auto pt-4 font-light">
                              Implementing this structural change can elevate conversion efficiency by up to <span className="text-primary font-bold">40%</span>.
                            </p>
                         </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center justify-between px-2">
                        <div>
                          <h2 className="text-3xl font-headline font-bold tracking-tight">Interface Preview</h2>
                          <p className="text-muted-foreground font-light">Live rendering of your high-performance landing page.</p>
                        </div>
                        <Button size="lg" className="rounded-full px-10 bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 group" onClick={() => toast({ title: "Success!", description: "Production build deployed." })}>
                          <CheckCircle2 className="w-5 h-5 mr-3" /> Go Live
                        </Button>
                      </div>
                      <LandingPagePreview content={landingPage!} businessName={businessName} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="marketing">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <MarketingTools marketing={marketing!} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
