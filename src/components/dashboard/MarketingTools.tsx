"use client";

import { type GenerateMarketingContentOutput } from "@/ai/flows/generate-marketing-content-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, Instagram, MessageSquare, Check, Sparkles, Search, 
  Megaphone, Star, Calendar, Palette, Linkedin, Twitter, 
  Globe, MessageCircle, MoreHorizontal
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function MarketingTools({ marketing }: { marketing: GenerateMarketingContentOutput }) {
  const { toast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast({
      title: "Content Copied",
      description: "Asset saved to clipboard.",
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header with Score */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-card p-8 rounded-3xl border-white/5">
        <div className="space-y-1">
          <h2 className="text-3xl font-headline font-bold">Online Presence Booster</h2>
          <p className="text-muted-foreground font-light">Comprehensive toolkit for market dominance.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Digital Readiness</div>
            <div className="text-4xl font-headline font-bold text-primary">{marketing.presenceScore}%</div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="social" className="w-full">
        <TabsList className="bg-white/5 p-1 h-auto flex-wrap justify-start gap-1 border-white/10 rounded-2xl mb-8">
          <TabsTrigger value="social" className="rounded-xl px-5 py-2.5 data-[state=active]:bg-primary">
            <MessageSquare className="w-4 h-4 mr-2" /> Social
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl px-5 py-2.5 data-[state=active]:bg-primary">
            <Search className="w-4 h-4 mr-2" /> SEO
          </TabsTrigger>
          <TabsTrigger value="ads" className="rounded-xl px-5 py-2.5 data-[state=active]:bg-primary">
            <Megaphone className="w-4 h-4 mr-2" /> Ads
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-xl px-5 py-2.5 data-[state=active]:bg-primary">
            <Star className="w-4 h-4 mr-2" /> Reviews
          </TabsTrigger>
          <TabsTrigger value="plan" className="rounded-xl px-5 py-2.5 data-[state=active]:bg-primary">
            <Calendar className="w-4 h-4 mr-2" /> Content Plan
          </TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl px-5 py-2.5 data-[state=active]:bg-primary">
            <Palette className="w-4 h-4 mr-2" /> Branding
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="social">
            <div className="grid md:grid-cols-2 gap-6">
              <ContentCard 
                icon={<Instagram className="text-white" />} 
                title="Instagram" 
                content={marketing.social.instagramCaption} 
                onCopy={(val) => copyToClipboard(val, 'ig')}
                isCopied={copiedKey === 'ig'}
                gradient="from-[#f09433] via-[#e6683c] to-[#bc1888]"
              />
              <ContentCard 
                icon={<MessageCircle className="text-white" />} 
                title="WhatsApp" 
                content={marketing.social.whatsAppMessage} 
                onCopy={(val) => copyToClipboard(val, 'wa')}
                isCopied={copiedKey === 'wa'}
                gradient="from-green-500 to-green-600"
              />
              <ContentCard 
                icon={<Linkedin className="text-white" />} 
                title="LinkedIn" 
                content={marketing.social.linkedInPost} 
                onCopy={(val) => copyToClipboard(val, 'li')}
                isCopied={copiedKey === 'li'}
                gradient="from-blue-600 to-blue-700"
              />
              <ContentCard 
                icon={<Twitter className="text-white" />} 
                title="Twitter / X" 
                content={marketing.social.twitterPost} 
                onCopy={(val) => copyToClipboard(val, 'tw')}
                isCopied={copiedKey === 'tw'}
                gradient="from-neutral-800 to-black"
              />
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="glass-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> Meta Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Title Tag</label>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(marketing.seo.titleTag, 'st')}>
                        {copiedKey === 'st' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-medium">{marketing.seo.titleTag}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Meta Description</label>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(marketing.seo.metaDescription, 'sd')}>
                        {copiedKey === 'sd' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm font-light leading-relaxed">{marketing.seo.metaDescription}</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-accent" /> Strategic Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {marketing.seo.keywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20 text-sm">
                      {kw}
                    </Badge>
                  ))}
                  <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-muted-foreground leading-relaxed italic">
                    Keywords mapped for high-intent local search visibility.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ads">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Facebook & IG Ad</CardTitle>
                  <CardDescription>Visual-first performance copy.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-bold text-primary mb-1 uppercase">Headline</div>
                    <div className="font-bold">{marketing.ads.facebookAd.headline}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-bold text-primary mb-1 uppercase">Body</div>
                    <div className="text-sm font-light">{marketing.ads.facebookAd.body}</div>
                  </div>
                  <Button className="w-full bg-primary" onClick={() => copyToClipboard(`${marketing.ads.facebookAd.headline}\n\n${marketing.ads.facebookAd.body}`, 'fbad')}>
                    {copiedKey === 'fbad' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />} Copy Full Ad
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Google Ads (Search)</CardTitle>
                  <CardDescription>Intent-based search results.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-bold text-accent mb-1 uppercase">Headline</div>
                    <div className="font-bold text-blue-400">{marketing.ads.googleAd.headline}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-bold text-accent mb-1 uppercase">Description</div>
                    <div className="text-sm font-light">{marketing.ads.googleAd.description}</div>
                  </div>
                  <Button variant="outline" className="w-full border-accent/20" onClick={() => copyToClipboard(`${marketing.ads.googleAd.headline}\n\n${marketing.ads.googleAd.description}`, 'ggad')}>
                    {copiedKey === 'ggad' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />} Copy Full Ad
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
             <div className="grid lg:grid-cols-2 gap-6">
               <Card className="glass-card">
                 <CardHeader>
                   <CardTitle>Social Proof Builder</CardTitle>
                   <CardDescription>Sample customer reviews for launch.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {marketing.reviews.sampleReviews.map((rev, i) => (
                     <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm italic font-light relative">
                       <Star className="absolute top-2 right-2 w-3 h-3 fill-amber-500 text-amber-500 opacity-30" />
                       "{rev}"
                     </div>
                   ))}
                 </CardContent>
               </Card>
               <Card className="glass-card">
                 <CardHeader>
                   <CardTitle>Reputation Manager</CardTitle>
                   <CardDescription>Professional response templates.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {marketing.reviews.replyTemplates.map((rep, i) => (
                     <div key={i} className="group relative">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm font-light pr-12">
                          {rep}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(rep, `rep-${i}`)}
                        >
                          {copiedKey === `rep-${i}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                     </div>
                   ))}
                 </CardContent>
               </Card>
             </div>
          </TabsContent>

          <TabsContent value="plan">
            <Card className="glass-card overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle>7-Day Growth Accelerator</CardTitle>
                <CardDescription>Tactical content plan for immediate traction.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {marketing.contentPlan.map((item, i) => (
                    <div key={i} className="p-6 flex items-start gap-6 hover:bg-white/5 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-headline font-bold text-primary shrink-0">
                        D{item.day}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{item.topic}</h4>
                          <Badge variant="secondary" className="text-[10px] uppercase font-bold px-2 py-0 bg-white/10">{item.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-light">{item.brief}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(`${item.topic}: ${item.brief}`, `p-${i}`)}>
                        {copiedKey === `p-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
             <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Slogan Alternatives</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {marketing.branding.slogans.map((slo, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group">
                        <span className="font-headline font-bold italic">"{slo}"</span>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(slo, `slo-${i}`)}>
                          {copiedKey === `slo-${i}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Visual Identity Suggestion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/5 h-full">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Neural Color Mapping</h4>
                       <p className="text-lg leading-relaxed font-light mb-6">
                         {marketing.branding.colorThemeSuggestion}
                       </p>
                       <div className="flex gap-2">
                         <div className="w-8 h-8 rounded-full bg-primary" />
                         <div className="w-8 h-8 rounded-full bg-accent" />
                         <div className="w-8 h-8 rounded-full bg-purple-500" />
                         <div className="w-8 h-8 rounded-full bg-slate-800" />
                       </div>
                    </div>
                  </CardContent>
                </Card>
             </div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

function ContentCard({ icon, title, content, onCopy, isCopied, gradient }: any) {
  return (
    <Card className="glass-card group overflow-hidden border-white/5">
      <CardHeader className="bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-tr ${gradient} rounded-xl shadow-lg`}>
              {icon}
            </div>
            <CardTitle className="text-lg font-headline font-bold">{title}</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl h-10 w-10 border-white/10 hover:bg-white/10 transition-all"
            onClick={() => onCopy(content)}
          >
            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative p-6 rounded-2xl bg-black/40 border border-white/5 whitespace-pre-wrap text-sm leading-relaxed font-light font-body group-hover:border-primary/30 transition-all shadow-inner">
          <Sparkles className="absolute top-2 right-2 text-white/5 w-6 h-6" />
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
