
import { type GenerateBusinessDetailsOutput } from "@/ai/flows/generate-business-details-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Search, Info, ListChecks, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultsDisplay({ details }: { details: GenerateBusinessDetailsOutput }) {
  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="glass-card overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardHeader className="flex flex-row items-center gap-4 p-8 bg-white/5">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                <Info className="text-primary w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-headline font-bold">Strategic Identity</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="relative p-8 rounded-2xl bg-primary/5 border border-primary/10 group-hover:border-primary/30 transition-all">
                <Sparkles className="absolute top-[-12px] right-8 text-primary w-6 h-6" />
                <div className="text-3xl font-headline font-bold text-primary italic leading-tight">
                  "{details.tagline}"
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Synthesized Overview</h4>
                <p className="text-xl leading-relaxed text-muted-foreground font-light">
                  {details.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card group">
            <CardHeader className="flex flex-row items-center gap-4 p-8 bg-white/5">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:scale-110 transition-transform">
                <ListChecks className="text-accent w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-headline font-bold">Core Service Nodes</CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {details.servicesList.map((service, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all cursor-default"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    </div>
                    <span className="text-lg font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-10"
      >
        <Card className="glass-card h-full flex flex-col group">
          <CardHeader className="flex flex-row items-center gap-4 p-8 bg-white/5">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Search className="text-primary w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-headline font-bold">SEO Protocols</CardTitle>
          </CardHeader>
          <CardContent className="p-10 flex-1">
            <div className="flex flex-wrap gap-3">
              {details.seoKeywords.map((keyword, idx) => (
                <Badge key={idx} variant="secondary" className="px-5 py-2 bg-white/5 border border-white/10 text-base font-light hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default rounded-full">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-dashed border-white/10 text-sm text-muted-foreground font-light leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Sparkles className="w-12 h-12" />
              </div>
              These neural-mapped keywords are optimized for edge search results. Deploy them to meta tags and social headers for maximum market penetration.
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
