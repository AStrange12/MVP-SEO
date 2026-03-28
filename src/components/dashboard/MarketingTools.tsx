
"use client";

import { type GenerateMarketingContentOutput } from "@/ai/flows/generate-marketing-content-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Instagram, MessageSquare, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function MarketingTools({ marketing }: { marketing: GenerateMarketingContentOutput }) {
  const { toast } = useToast();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast({
      title: "Content Synced",
      description: `${type} assets copied to system clipboard.`,
    });
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="glass-card group overflow-hidden border-white/5">
          <CardHeader className="bg-white/5 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-2xl shadow-lg">
                  <Instagram className="text-white w-7 h-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline font-bold">Social Projection</CardTitle>
                  <CardDescription className="text-base font-light">Instagram optimized caption architecture.</CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-xl h-12 w-12 border-white/10 hover:bg-white/10 transition-all"
                onClick={() => copyToClipboard(marketing.instagramCaption, "Instagram")}
              >
                {copiedType === "Instagram" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative p-8 rounded-3xl bg-black/40 border border-white/5 whitespace-pre-wrap text-lg leading-relaxed font-light font-body group-hover:border-primary/30 transition-all shadow-inner">
              <Sparkles className="absolute top-4 right-4 text-white/10 w-8 h-8" />
              {marketing.instagramCaption}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="glass-card group overflow-hidden border-white/5">
          <CardHeader className="bg-white/5 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-green-500 rounded-2xl shadow-lg">
                  <MessageSquare className="text-white w-7 h-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline font-bold">Direct Communication</CardTitle>
                  <CardDescription className="text-base font-light">WhatsApp optimized promotional broadcast.</CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-xl h-12 w-12 border-white/10 hover:bg-white/10 transition-all"
                onClick={() => copyToClipboard(marketing.whatsAppMessage, "WhatsApp")}
              >
                {copiedType === "WhatsApp" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative p-8 rounded-3xl bg-black/40 border border-white/5 whitespace-pre-wrap text-lg leading-relaxed font-light font-body group-hover:border-green-500/30 transition-all shadow-inner">
              <Sparkles className="absolute top-4 right-4 text-white/10 w-8 h-8" />
              {marketing.whatsAppMessage}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
