
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Globe, Star, Zap, Award, Users } from 'lucide-react';

interface AuthFormProps {
  onAuth: (userData: { email: string; name: string; country: string }) => void;
}

const AuthForm = ({ onAuth }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.name && formData.country) {
      onAuth(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 animate-pulse-glow">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                  EduAccess
                </h1>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                🌟 Transform Your Learning Journey
              </h2>
              
              <p className="text-xl text-white/90 mb-8">
                Access premium courses, interactive content, and personalized learning paths designed for your success.
              </p>
            </div>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-effect p-4 rounded-lg text-center hover:scale-105 transition-all">
                <Users className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">50K+ Students</h3>
                <p className="text-white/80 text-sm">Join our community</p>
              </div>
              
              <div className="glass-effect p-4 rounded-lg text-center hover:scale-105 transition-all">
                <Award className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Certificates</h3>
                <p className="text-white/80 text-sm">Industry recognized</p>
              </div>
              
              <div className="glass-effect p-4 rounded-lg text-center hover:scale-105 transition-all">
                <Star className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">4.8/5 Rating</h3>
                <p className="text-white/80 text-sm">Student satisfaction</p>
              </div>
              
              <div className="glass-effect p-4 rounded-lg text-center hover:scale-105 transition-all">
                <Zap className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Interactive</h3>
                <p className="text-white/80 text-sm">Hands-on learning</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                🎯 Personalized Learning
              </Badge>
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                📱 Mobile Friendly
              </Badge>
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                🌍 Global Access
              </Badge>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md glass-effect border-0 shadow-2xl animate-scale-in">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  🚀 Start Learning Today
                </CardTitle>
                <CardDescription className="text-white/80">
                  Create your account and unlock unlimited access to premium content
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Country
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Enter your country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 transition-all"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
                  >
                    🎉 Get Started Now
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-white/80 text-sm">
                    By signing up, you agree to our terms and get access to premium learning content
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
