
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, MapPin, Users, Globe, FileText, Video, Headphones, CreditCard } from 'lucide-react';
import ContentLibrary from './ContentLibrary';
import LocationDetector from './LocationDetector';

interface DashboardProps {
  user: {
    email: string;
    name: string;
    country: string;
  };
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [detectedLocation, setDetectedLocation] = useState<string>('');
  const [regionData, setRegionData] = useState<any>(null);

  useEffect(() => {
    // Auto-detect location on component mount
    detectUserLocation();
  }, []);

  const detectUserLocation = async () => {
    try {
      // Simulate location detection
      const mockLocation = 'India'; // In real implementation, use geolocation API
      setDetectedLocation(mockLocation);
      
      // Set region-specific data based on detected or user-provided location
      const location = mockLocation || user.country;
      setRegionData(getRegionData(location));
    } catch (error) {
      console.error('Location detection failed:', error);
      setDetectedLocation(user.country);
      setRegionData(getRegionData(user.country));
    }
  };

  const getRegionData = (location: string) => {
    const regionMappings: { [key: string]: any } = {
      'China': {
        challenges: ['Great Firewall blocks Google, YouTube, WhatsApp, Wikipedia, many news/media sites'],
        content: ['PDF tutorials on VPN use', 'Downloadable Wikipedia dumps', 'Offline coding courses', 'English learning materials'],
        priority: 'high'
      },
      'North Korea': {
        challenges: ['No open internet', 'State-controlled intranet only'],
        content: ['Basic education PDFs (math, science, English)', 'Offline videos for farming', 'Health education materials'],
        priority: 'critical'
      },
      'Cuba': {
        challenges: ['Limited, expensive internet', 'State controls information flow'],
        content: ['PDFs on entrepreneurship', 'Language learning', 'Mental health resources', 'Offline skill videos'],
        priority: 'high'
      },
      'Syria': {
        challenges: ['Government censorship', 'Infrastructure instability'],
        content: ['Basic tech tutorials', 'Human rights education', 'Online privacy guides'],
        priority: 'high'
      },
      'Sudan': {
        challenges: ['Censorship', 'Periodic blackouts'],
        content: ['Digital security PDFs', 'Women\'s education', 'Career skills', 'Self-learning videos'],
        priority: 'high'
      },
      'India': {
        challenges: ['Low internet access in rural areas', 'Limited bandwidth'],
        content: ['Offline educational books', 'Skill development videos', 'Language learning PDFs', 'Tech tutorials'],
        priority: 'medium'
      },
      'Iran': {
        challenges: ['Website restrictions', 'Limited access to global platforms'],
        content: ['VPN connection guides', 'Detailed video tutorials', 'Privacy tools', 'Educational materials'],
        priority: 'high'
      }
    };

    return regionMappings[location] || {
      challenges: ['Limited internet access', 'Educational resource scarcity'],
      content: ['General educational materials', 'Basic skill development', 'Language learning'],
      priority: 'medium'
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduAccess Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LocationDetector 
                onLocationDetected={setDetectedLocation}
                currentLocation={detectedLocation}
              />
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Status */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Your Location: {detectedLocation || 'Detecting...'}
              </CardTitle>
              {regionData && (
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getPriorityColor(regionData.priority)}>
                      {regionData.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Region-specific content available
                    </span>
                  </div>
                </CardDescription>
              )}
            </CardHeader>
            {regionData && (
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Access Challenges:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {regionData.challenges.map((challenge: string, index: number) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Available Content:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {regionData.content.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">247</div>
              <p className="text-sm text-gray-600">PDF Documents</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Video className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">89</div>
              <p className="text-sm text-gray-600">Video Courses</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Headphones className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">156</div>
              <p className="text-sm text-gray-600">Audio Materials</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12.5K</div>
              <p className="text-sm text-gray-600">Active Learners</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content Library</TabsTrigger>
            <TabsTrigger value="downloads">My Downloads</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <ContentLibrary region={detectedLocation} regionData={regionData} />
          </TabsContent>
          
          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Your Downloaded Content
                </CardTitle>
                <CardDescription>
                  Access your offline learning materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No downloads yet. Start exploring the content library!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>
                  Content curated for your region and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {regionData && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Priority for your region:</h4>
                      <div className="grid gap-2">
                        {regionData.content.slice(0, 3).map((item: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Recommended</Badge>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
