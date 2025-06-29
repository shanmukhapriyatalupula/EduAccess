
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, RefreshCw, Settings, Globe } from 'lucide-react';

interface LocationDetectorProps {
  onLocationDetected: (location: string) => void;
  currentLocation: string;
}

const LocationDetector = ({ onLocationDetected, currentLocation }: LocationDetectorProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'South Korea', 'Brazil', 'India', 'China', 'Russia',
    'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Switzerland', 'Austria', 'Belgium', 'Portugal', 'Ireland', 'Finland',
    'New Zealand', 'Singapore', 'Hong Kong', 'UAE', 'Saudi Arabia',
    'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Argentina',
    'Chile', 'Colombia', 'Peru', 'Venezuela', 'Turkey', 'Greece',
    'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria',
    'Ukraine', 'Belarus', 'Lithuania', 'Latvia', 'Estonia',
    'Iran', 'Iraq', 'Syria', 'Jordan', 'Lebanon', 'Israel', 'Palestine',
    'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Myanmar',
    'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Malaysia',
    'Cambodia', 'Laos', 'Mongolia', 'Kazakhstan', 'Uzbekistan',
    'Cuba', 'Jamaica', 'Haiti', 'Dominican Republic', 'Costa Rica',
    'Panama', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua',
    'North Korea', 'Sudan', 'Somalia', 'Libya', 'Algeria', 'Tunisia',
    'Mali', 'Niger', 'Chad', 'Cameroon', 'Ghana', 'Ivory Coast',
    'Senegal', 'Burkina Faso', 'Madagascar', 'Mozambique', 'Angola',
    'Zambia', 'Zimbabwe', 'Botswana', 'Namibia', 'Ethiopia', 'Uganda'
  ];

  const detectLocation = async () => {
    setIsDetecting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockLocations = ['China', 'India', 'Iran', 'Cuba', 'Syria', 'North Korea', 'Sudan'];
      const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      
      onLocationDetected(randomLocation);
      setSelectedLocation(randomLocation);
    } catch (error) {
      console.error('Location detection failed:', error);
      onLocationDetected('Unknown');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleLocationChange = () => {
    onLocationDetected(selectedLocation);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
          <MapPin className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-600 font-medium">Current Location</span>
          <Badge variant="outline" className="text-sm font-semibold bg-white/80 border-blue-300">
            <Globe className="w-3 h-3 mr-1" />
            {currentLocation || 'Detecting...'}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={detectLocation}
          disabled={isDetecting}
          className="h-8 px-3 hover:bg-blue-100 transition-all duration-300"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isDetecting ? 'animate-spin' : ''}`} />
          <span className="text-xs">{isDetecting ? 'Detecting...' : 'Auto-Detect'}</span>
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 hover:bg-purple-100 border-purple-300 hover:border-purple-400 transition-all duration-300"
            >
              <Settings className="h-3 w-3 mr-1" />
              <span className="text-xs">Change</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Change Location
              </DialogTitle>
              <DialogDescription>
                Select your location to get region-appropriate content and access.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Country/Region
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your location..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Note:</strong> Your location affects content availability and payment options. 
                  Some content may be restricted based on regional policies.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLocationChange}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                disabled={!selectedLocation}
              >
                Update Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LocationDetector;
