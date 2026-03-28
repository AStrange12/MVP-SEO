import { type GenerateBusinessDetailsOutput } from "@/ai/flows/generate-business-details-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Search, Info, ListChecks } from "lucide-react";

export default function ResultsDisplay({ details }: { details: GenerateBusinessDetailsOutput }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="text-primary w-5 h-5" />
            </div>
            <CardTitle>Business Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-xl font-headline text-primary font-medium text-center">
              "{details.tagline}"
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {details.description}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <ListChecks className="text-accent w-5 h-5" />
            </div>
            <CardTitle>Core Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {details.servicesList.map((service, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-white/5 group hover:border-accent/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="glass-morphism border-white/5 h-full">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="text-primary w-5 h-5" />
            </div>
            <CardTitle>SEO Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {details.seoKeywords.map((keyword, idx) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1 bg-background/50 border border-white/5 text-sm hover:bg-primary hover:text-white transition-all cursor-default">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-background/50 border border-dashed border-white/10 text-xs text-muted-foreground">
              These keywords are optimized for local search results in your area. Use them in your social media profiles and website meta data.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
