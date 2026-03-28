
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, TrendingUp, CheckCircle2, ChevronDown, ChevronUp, Briefcase, ExternalLink, Instagram, Linkedin, Twitter, Youtube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Business } from "@/app/businesses/page";

export default function BusinessCard({ business }: { business: Business }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSocials = business.socialLinks && Object.values(business.socialLinks).some(Boolean);

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
        
        {/* Project Thumbnail */}
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          {business.imageUrl ? (
            <Image 
              src={business.imageUrl} 
              alt={business.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              data-ai-hint="business thumbnail"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20">
              <Globe className="w-16 h-16" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute bottom-4 left-4 bg-primary/20 text-primary backdrop-blur-md border-primary/20 rounded-full font-bold uppercase tracking-widest text-[10px]">
            {business.category}
          </Badge>
        </div>

        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{business.name}</h3>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < business.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm gap-1 mb-4">
              <MapPin className="w-3 h-3" /> {business.location}
            </div>
            
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed mb-6 font-light">
              {business.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mb-6">
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

            {business.websiteUrl && (
              <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/5 group/btn" asChild>
                <a href={business.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Visit Website <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 border-t border-white/5 space-y-8">
                  {/* Online Presence Section */}
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary mb-4">Online Presence</h4>
                    <div className="flex flex-col gap-4">
                      {business.websiteUrl && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="text-xs font-medium">Website Live & Deployed</span>
                        </div>
                      )}
                      {hasSocials && (
                        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex gap-4">
                            {business.socialLinks?.instagram && (
                              <a href={business.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                              </a>
                            )}
                            {business.socialLinks?.linkedin && (
                              <a href={business.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                            {business.socialLinks?.twitter && (
                              <a href={business.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                              </a>
                            )}
                            {business.socialLinks?.youtube && (
                              <a href={business.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Youtube className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                          <span className="text-xs font-medium border-l border-white/10 pl-4">Social Nodes Active</span>
                        </div>
                      )}
                    </div>
                  </div>

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

                  <div className="px-6 py-4 bg-white/5 border-t border-white/5 italic text-xs text-muted-foreground font-light leading-snug rounded-xl">
                    "{business.review}"
                  </div>

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
