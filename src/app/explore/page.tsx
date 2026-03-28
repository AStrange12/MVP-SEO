
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Search, Sparkles, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Business, MOCK_SUCCESS_STORIES } from "@/app/businesses/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Dynamically import map components to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import("@/components/explore/MapContainer"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded-3xl flex items-center justify-center">
    <Navigation className="w-10 h-10 text-primary animate-bounce" />
  </div>
});

export default function ExploreNearbyPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([28.6139, 77.2090]); // Default Delhi

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => console.log("Location access denied, defaulting to Delhi.")
      );
    }

    // Load businesses
    const userBusinessesStr = localStorage.getItem("localboost_showcase_businesses");
    const userBusinesses = userBusinessesStr ? JSON.parse(userBusinessesStr) : [];
    
    // Add mock coordinates to user businesses if they don't have them (for demo purposes)
    const processedUserBusinesses = userBusinesses.map((b: Business) => ({
      ...b,
      lat: b.lat || userLocation[0] + (Math.random() - 0.5) * 0.1,
      lng: b.lng || userLocation[1] + (Math.random() - 0.5) * 0.1,
    }));

    setBusinesses([...processedUserBusinesses, ...MOCK_SUCCESS_STORIES]);
  }, []);

  const filteredBusinesses = businesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    (b.city && b.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col gap-8 max-w-[1600px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold"
          >
            <Sparkles className="w-3 h-3" />
            <span className="uppercase tracking-widest">Nearby Ecosystem</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Local <span className="gradient-text">Discovery.</span></h1>
          <p className="text-muted-foreground font-light text-lg">Locate and connect with businesses in the AI-powered network.</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by name, city or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl"
            suppressHydrationWarning
          />
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[1fr_400px] gap-8 min-h-[600px]">
        {/* Map Column */}
        <div className="relative h-[400px] lg:h-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl glass-card">
          <MapContainer 
            businesses={filteredBusinesses} 
            userLocation={userLocation} 
            selectedId={selectedBusinessId}
            onSelect={setSelectedBusinessId}
          />
        </div>

        {/* List Column */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nearby Network
              <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary border-0">{filteredBusinesses.length}</Badge>
            </h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {filteredBusinesses.map((business) => (
                <motion.div
                  key={business.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                    selectedBusinessId === business.id 
                      ? "bg-primary/20 border-primary shadow-lg shadow-primary/10" 
                      : "bg-white/5 border-white/5 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedBusinessId(business.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold group-hover:text-primary transition-colors">{business.name}</h3>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter opacity-70">
                      {business.category}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <MapPin className="w-3 h-3" /> {business.location}
                  </div>
                </motion.div>
              ))}
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-20 text-muted-foreground font-light italic">
                  No businesses found in this area.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
