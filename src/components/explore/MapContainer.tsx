
"use client";

import { useEffect, useRef } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Business } from "@/app/businesses/page";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";

// Fix Leaflet marker icon issues in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const SelectedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to center map on selection
function MapHandler({ selectedId, businesses, userLocation }: { 
  selectedId: string | null, 
  businesses: Business[], 
  userLocation: [number, number] 
}) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedId) {
      const biz = businesses.find(b => b.id === selectedId);
      if (biz && biz.lat && biz.lng) {
        map.flyTo([biz.lat, biz.lng], 14, { duration: 1.5 });
      }
    }
  }, [selectedId, businesses, map]);

  return null;
}

interface MapProps {
  businesses: Business[];
  userLocation: [number, number];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MapContainer({ businesses, userLocation, selectedId, onSelect }: MapProps) {
  return (
    <LeafletMap
      center={userLocation}
      zoom={5}
      zoomControl={false}
      style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <ZoomControl position="bottomright" />
      <MapHandler selectedId={selectedId} businesses={businesses} userLocation={userLocation} />

      {businesses.map((biz) => {
        if (!biz.lat || !biz.lng) return null;
        
        return (
          <Marker 
            key={biz.id} 
            position={[biz.lat, biz.lng]}
            icon={selectedId === biz.id ? SelectedIcon : DefaultIcon}
            eventHandlers={{
              click: () => onSelect(biz.id)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 space-y-2 min-w-[200px]">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg text-white">{biz.name}</h4>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs ml-1">{biz.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{biz.description}</p>
                <div className="pt-2">
                  <Button size="sm" className="w-full rounded-lg h-8 text-xs bg-primary" asChild>
                    <a href={`/businesses`} className="flex items-center gap-2">
                      View Success Story <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      <Marker position={userLocation} icon={L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })}>
        <Popup>Your current location</Popup>
      </Marker>
    </LeafletMap>
  );
}
