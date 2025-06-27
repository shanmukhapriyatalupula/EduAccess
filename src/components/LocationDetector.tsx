
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, RefreshCw } from 'lucide-react';

interface LocationDetectorProps {
  onLocationDetected: (location: string) => void;
  currentLocation: string;
}

const LocationDetector = ({ onLocationDetected, currentLocation }: LocationDetectorProps) => {
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = async () => {
    setIsDetecting(true);
    
    try {
      // Simulate location detection with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would use:
      // 1. Geolocation API: navigator.geolocation.getCurrentPosition()
      // 2. IP-based location service
      // 3. User's browser language/timezone
      
      const mockLocations = ['China', 'India', 'Iran', 'Cuba', 'Syria', 'North Korea', 'Sudan'];
      const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      
      onLocationDetected(randomLocation);
    } catch (error) {
      console.error('Location detection failed:', error);
      onLocationDetected('Unknown');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" />
        <Badge variant="outline" className="text-xs">
          {currentLocation || 'Detecting...'}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={detectLocation}
        disabled={isDetecting}
        className="h-8 px-3"
      >
        <RefreshCw className={`h-3 w-3 ${isDetecting ? 'animate-spin' : ''}`} />
        {isDetecting ? 'Detecting...' : 'Refresh'}
      </Button>
    </div>
  );
};

export default LocationDetector;
