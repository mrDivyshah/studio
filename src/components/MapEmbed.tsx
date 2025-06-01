"use client";

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY, BUSINESS_LOCATION_COORDS, BUSINESS_NAME } from '@/lib/constants';
import { AlertTriangle } from 'lucide-react';

export default function MapEmbed() {
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER") {
    return (
      <div className="aspect-video w-full bg-muted flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-inner border border-destructive/50">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive mb-2">Map Unavailable</h3>
        <p className="text-sm text-muted-foreground">
          The Google Maps API Key is missing or invalid. 
          Please provide a valid API key to display the map.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          (Check <code>src/lib/constants.ts</code> or your environment variables)
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '450px', width: '100%' }} className="rounded-lg overflow-hidden shadow-xl border">
        <Map
          defaultCenter={BUSINESS_LOCATION_COORDS}
          defaultZoom={15}
          mapId="electroHubBusinessMap" 
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
        >
          <AdvancedMarker position={BUSINESS_LOCATION_COORDS} title={BUSINESS_NAME} />
        </Map>
      </div>
    </APIProvider>
  );
}
