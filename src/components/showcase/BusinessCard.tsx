
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, TrendingUp, CheckCircle2, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  seoScore: number;
  growth: string;
  review: string;
  rating: number;
  tagline?: string;
  services?: string[];
}

export default function BusinessCard({ business }: { business: Business }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="glass-card h-full overflow-hidden border-white/5 flex flex-col group relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-full font-bold uppercase tracking-widest text-[10px]">
                {business.category}
              </Badge>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < business.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} 
                  />
                ))}
              </div>
            </div>
            
            <h3 className="text-2xl font-headline font-bold mb-1 group-hover:text-primary transition-colors">{business.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm gap-1 mb-4">
              <MapPin className="w-3 h-3" /> {business.location}
            </div>
            
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-6 font-light">
              {business.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">SEO Index</span>
                <div className="text-xl font-headline font-bold text-primary">{business.seoScore}%</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">Growth</span>
                <div className="text-sm font-bold flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-4 h-4" /> {business.growth}
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="px-6 py-4 bg-white/5 border-t border-white/5 italic text-xs text-muted-foreground font-light leading-snug">
            "{business.review}"
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 border-t border-white/5 space-y-6">
                  {business.tagline && (
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">Philosophy</h4>
                      <p className="text-lg font-headline font-bold italic">"{business.tagline}"</p>
                    </div>
                  )}
                  
                  {business.services && business.services.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-accent mb-3 flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> Core Services
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {business.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="bg-white/5 border-white/10 text-[10px] py-1">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      This business is currently operating at <span className="text-primary font-bold">94.2%</span> efficiency within the LocalBoost ecosystem. 
                      Neural marketing protocols have successfully expanded their digital footprint by <span className="text-white">{business.growth}</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            variant="ghost" 
            className="w-full rounded-none h-12 border-t border-white/5 hover:bg-white/5 group-hover:text-primary transition-all text-xs font-bold uppercase tracking-widest"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <><ChevronUp className="w-4 h-4 mr-2" /> Compress View</>
            ) : (
              <><ChevronDown className="w-4 h-4 mr-2" /> Expand Details</>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
