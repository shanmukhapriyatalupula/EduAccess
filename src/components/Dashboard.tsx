
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ContentLibrary from './ContentLibrary';
import LocationDetector from './LocationDetector';
import { LogOut, Globe, User, BookOpen, TrendingUp, Award, Star } from 'lucide-react';

interface DashboardProps {
  user: {
    email: string;
    name: string;
    country: string;
  };
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduAccess Platform
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your Gateway to Knowledge
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Card className="glass-effect border-0 shadow-lg">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800 dark:text-white">
                        {user.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <Globe className="w-3 h-3" />
                        <span>{user.country}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button
                onClick={onLogout}
                variant="outline"
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Welcome Section */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="mb-8">
          <Card className="glass-effect border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      Welcome back, {user.name}! 👋
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Continue your learning journey with personalized content
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="glass-effect px-4 py-2 hover:scale-105 transition-all">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Learning Streak: 5 days
                    </Badge>
                    <Badge variant="secondary" className="glass-effect px-4 py-2 hover:scale-105 transition-all">
                      <Award className="w-4 h-4 mr-2" />
                      Certificates: 3
                    </Badge>
                    <Badge variant="secondary" className="glass-effect px-4 py-2 hover:scale-105 transition-all">
                      <Star className="w-4 h-4 mr-2" />
                      Progress: 67%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Location Detector with enhanced styling */}
        <div className="mb-8">
          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationDetector />
            </CardContent>
          </Card>
        </div>

        {/* Content Library */}
        <ContentLibrary />
      </div>
    </div>
  );
};

export default Dashboard;
