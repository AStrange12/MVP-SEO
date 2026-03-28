"use client";

import { type GenerateMarketingContentOutput } from "@/ai/flows/generate-marketing-content-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Instagram, MessageSquare, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function MarketingTools({ marketing }: { marketing: GenerateMarketingContentOutput }) {
  const { toast } = useToast();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast({
      title: "Copied!",
      description: `${type} content copied to clipboard.`,
    });
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="glass-morphism border-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-lg">
                <Instagram className="text-white w-5 h-5" />
              </div>
              <div>
                <CardTitle>Instagram Caption</CardTitle>
                <CardDescription>Perfect for a launch post.</CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => copyToClipboard(marketing.instagramCaption, "Instagram")}
            >
              {copiedType === "Instagram" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-xl bg-background/50 border border-white/10 whitespace-pre-wrap text-sm leading-relaxed font-body">
            {marketing.instagramCaption}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-morphism border-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <MessageSquare className="text-white w-5 h-5" />
              </div>
              <div>
                <CardTitle>WhatsApp Message</CardTitle>
                <CardDescription>Broadcast to your contacts.</CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => copyToClipboard(marketing.whatsAppMessage, "WhatsApp")}
            >
              {copiedType === "WhatsApp" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-xl bg-background/50 border border-white/10 whitespace-pre-wrap text-sm leading-relaxed font-body">
            {marketing.whatsAppMessage}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
