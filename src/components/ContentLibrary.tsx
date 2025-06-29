
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Search, 
  Star, 
  Clock, 
  Users, 
  Play,
  Download,
  Heart,
  Share2,
  Filter,
  TrendingUp,
  Award,
  Zap,
  MapPin
} from 'lucide-react';

interface ContentItem {
  id: number;
  type: 'course' | 'video' | 'article';
  title: string;
  description: string;
  duration: string;
  enrolled: number;
  rating: number;
  progress: number;
  price: number;
  imageUrl?: string;
  regions?: string[];
}

// Location-specific course data
const getLocationSpecificCourses = (location: string): ContentItem[] => {
  const baseCourses: ContentItem[] = [
    {
      id: 1,
      type: 'course',
      title: 'The Ultimate React Course',
      description: 'Learn React from scratch and build amazing projects.',
      duration: '4 hours',
      enrolled: 1200,
      rating: 4.9,
      progress: 75,
      price: 499,
    },
    {
      id: 2,
      type: 'video',
      title: 'Introduction to JavaScript ES6',
      description: 'A quick guide to the new features in JavaScript ES6.',
      duration: '30 minutes',
      enrolled: 3400,
      rating: 4.7,
      progress: 0,
      price: 0,
    }
  ];

  // Location-specific courses
  const locationCourses: { [key: string]: ContentItem[] } = {
    'Iran': [
      {
        id: 101,
        type: 'course',
        title: 'VPN Setup & Safe Web Browsing',
        description: 'Learn how to safely access the web using VPN services and protect your privacy online.',
        duration: '2 hours',
        enrolled: 8500,
        rating: 4.9,
        progress: 0,
        price: 0,
        regions: ['Iran']
      },
      {
        id: 102,
        type: 'video',
        title: 'Tor Browser Complete Guide',
        description: 'Master anonymous browsing with Tor browser for enhanced privacy and security.',
        duration: '45 minutes',
        enrolled: 6200,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['Iran']
      },
      {
        id: 103,
        type: 'article',
        title: 'Digital Privacy Fundamentals',
        description: 'Essential knowledge about digital privacy, encryption, and secure communications.',
        duration: '25 minutes',
        enrolled: 4800,
        rating: 4.7,
        progress: 0,
        price: 0,
        regions: ['Iran']
      },
      {
        id: 104,
        type: 'course',
        title: 'Secure Messaging Applications',
        description: 'Learn to use encrypted messaging apps like Signal, Telegram, and ProtonMail safely.',
        duration: '1.5 hours',
        enrolled: 3900,
        rating: 4.6,
        progress: 0,
        price: 299,
        regions: ['Iran']
      },
      {
        id: 105,
        type: 'video',
        title: 'Bypassing Internet Restrictions',
        description: 'Legal methods to access restricted content while maintaining your digital security.',
        duration: '35 minutes',
        enrolled: 7100,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['Iran']
      }
    ],
    'China': [
      {
        id: 201,
        type: 'course',
        title: 'VPN Solutions for China',
        description: 'Comprehensive guide to VPN services that work reliably in China.',
        duration: '2.5 hours',
        enrolled: 12000,
        rating: 4.9,
        progress: 0,
        price: 399,
        regions: ['China']
      },
      {
        id: 202,
        type: 'video',
        title: 'WeChat Development Basics',
        description: 'Learn to develop WeChat mini-programs and integrate with WeChat ecosystem.',
        duration: '50 minutes',
        enrolled: 8900,
        rating: 4.7,
        progress: 0,
        price: 0,
        regions: ['China']
      },
      {
        id: 203,
        type: 'article',
        title: 'Baidu SEO Optimization',
        description: 'Master search engine optimization specifically for Baidu search engine.',
        duration: '30 minutes',
        enrolled: 5600,
        rating: 4.6,
        progress: 0,
        price: 0,
        regions: ['China']
      },
      {
        id: 204,
        type: 'course',
        title: 'Shadowsocks Configuration',
        description: 'Advanced proxy setup using Shadowsocks for secure internet access.',
        duration: '1.5 hours',
        enrolled: 6700,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['China']
      },
      {
        id: 205,
        type: 'video',
        title: 'Alipay Integration Tutorial',
        description: 'Complete guide to integrating Alipay payment system in your applications.',
        duration: '40 minutes',
        enrolled: 4300,
        rating: 4.5,
        progress: 0,
        price: 299,
        regions: ['China']
      }
    ],
    'North Korea': [
      {
        id: 301,
        type: 'course',
        title: 'Offline Programming Environment',
        description: 'Set up complete programming environments that work without internet access.',
        duration: '3 hours',
        enrolled: 2100,
        rating: 4.9,
        progress: 0,
        price: 0,
        regions: ['North Korea']
      },
      {
        id: 302,
        type: 'video',
        title: 'Satellite Internet Setup',
        description: 'Learn about satellite internet options and setup for remote locations.',
        duration: '55 minutes',
        enrolled: 1800,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['North Korea']
      },
      {
        id: 303,
        type: 'article',
        title: 'Ham Radio Programming',
        description: 'Programming and communication using amateur radio frequencies.',
        duration: '35 minutes',
        enrolled: 1500,
        rating: 4.7,
        progress: 0,
        price: 0,
        regions: ['North Korea']
      },
      {
        id: 304,
        type: 'course',
        title: 'Mesh Network Creation',
        description: 'Build local mesh networks for communication without internet infrastructure.',
        duration: '2.5 hours',
        enrolled: 1200,
        rating: 4.9,
        progress: 0,
        price: 499,
        regions: ['North Korea']
      },
      {
        id: 305,
        type: 'video',
        title: 'Portable Server Setup',
        description: 'Create portable servers for local network services and applications.',
        duration: '45 minutes',
        enrolled: 900,
        rating: 4.6,
        progress: 0,
        price: 0,
        regions: ['North Korea']
      }
    ],
    'Cuba': [
      {
        id: 401,
        type: 'course',
        title: 'El Paquete Content Creation',
        description: 'Learn to create and distribute content through Cuba\'s offline internet system.',
        duration: '2 hours',
        enrolled: 3200,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['Cuba']
      },
      {
        id: 402,
        type: 'video',
        title: 'WiFi Hotspot Optimization',
        description: 'Maximize your Cuban WiFi experience with connection optimization techniques.',
        duration: '35 minutes',
        enrolled: 4100,
        rating: 4.7,
        progress: 0,
        price: 0,
        regions: ['Cuba']
      },
      {
        id: 403,
        type: 'article',
        title: 'Sneakernet File Sharing',
        description: 'Efficient methods for sharing files and data in limited connectivity environments.',
        duration: '20 minutes',
        enrolled: 2800,
        rating: 4.6,
        progress: 0,
        price: 0,
        regions: ['Cuba']
      },
      {
        id: 404,
        type: 'course',
        title: 'Offline Web Development',
        description: 'Build web applications that work perfectly without internet connectivity.',
        duration: '3.5 hours',
        enrolled: 2600,
        rating: 4.9,
        progress: 0,
        price: 399,
        regions: ['Cuba']
      },
      {
        id: 405,
        type: 'video',
        title: 'SNET Navigation Guide',
        description: 'Complete guide to navigating Cuba\'s street network (SNET) gaming network.',
        duration: '40 minutes',
        enrolled: 3500,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['Cuba']
      }
    ],
    'Syria': [
      {
        id: 501,
        type: 'course',
        title: 'Secure Communication Methods',
        description: 'Learn various secure communication techniques for challenging environments.',
        duration: '2.5 hours',
        enrolled: 4200,
        rating: 4.9,
        progress: 0,
        price: 0,
        regions: ['Syria']
      },
      {
        id: 502,
        type: 'video',
        title: 'Power-Efficient Computing',
        description: 'Optimize your devices for maximum efficiency during power outages.',
        duration: '45 minutes',
        enrolled: 3800,
        rating: 4.7,
        progress: 0,
        price: 0,
        regions: ['Syria']
      },
      {
        id: 503,
        type: 'article',
        title: 'Mobile Data Conservation',
        description: 'Techniques to make the most of limited mobile data allowances.',
        duration: '25 minutes',
        enrolled: 5100,
        rating: 4.8,
        progress: 0,
        price: 0,
        regions: ['Syria']
      },
      {
        id: 504,
        type: 'course',
        title: 'Alternative Internet Access',
        description: 'Explore various methods to access internet in restricted environments.',
        duration: '2 hours',
        enrolled: 3600,
        rating: 4.8,
        progress: 0,
        price: 299,
        regions: ['Syria']
      },
      {
        id: 505,
        type: 'video',
        title: 'Encrypted File Storage',
        description: 'Secure your important files with encryption techniques and safe storage methods.',
        duration: '50 minutes',
        enrolled: 4500,
        rating: 4.9,
        progress: 0,
        price: 0,
        regions: ['Syria']
      }
    ]
  };

  // Get location-specific courses or return base courses
  const specificCourses = locationCourses[location] || [];
  return [...baseCourses, ...specificCourses];
};

interface ContentLibraryProps {
  currentLocation?: string;
}

const ContentLibrary = ({ currentLocation = 'Global' }: ContentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [content, setContent] = useState(() => getLocationSpecificCourses(currentLocation));
  const [newContent, setNewContent] = useState<Omit<ContentItem, 'id'>>({
    type: 'course',
    title: '',
    description: '',
    duration: '',
    enrolled: 0,
    rating: 0,
    progress: 0,
    price: 0,
  });

  // Update content when location changes
  React.useEffect(() => {
    setContent(getLocationSpecificCourses(currentLocation));
  }, [currentLocation]);

  const filteredContent = useMemo(() => {
    let filtered = content;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.type === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [content, searchTerm, selectedCategory]);

  const handleAddContent = () => {
    const newItem: ContentItem = {
      id: content.length + 1,
      ...newContent,
    };
    setContent([...content, newItem]);
    setNewContent({
      type: 'course',
      title: '',
      description: '',
      duration: '',
      enrolled: 0,
      rating: 0,
      progress: 0,
      price: 0,
    });
    setShowAddForm(false);
  };

  const handleDownloadFree = (item: ContentItem) => {
    console.log(`Downloading free content: "${item.title}"`);
    
    // Create a downloadable content file
    const contentText = `
${item.title}
===============================

Description: ${item.description}
Duration: ${item.duration}
Type: ${item.type.toUpperCase()}
Rating: ${item.rating}/5 (${item.enrolled} enrolled)
${item.regions ? `Regions: ${item.regions.join(', ')}` : ''}

Thank you for choosing EduAccess Platform!
Enjoy your free learning content.

--
This content is provided free of charge by EduAccess Platform.
Visit us at eduaccess.com for more learning resources.
    `;

    // Create a blob and download it
    const blob = new Blob([contentText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert(`"${item.title}" has been downloaded successfully! Check your downloads folder.`);
  };

  const handlePurchase = (item: ContentItem) => {
    if (item.price === 0) {
      handleDownloadFree(item);
      return;
    }

    // Enhanced PhonePe payment integration
    const amount = item.price;
    const transactionId = `EDU_${Date.now()}_${item.id}`;
    const merchantId = 'EDUACCESS';
    
    console.log(`Processing PhonePe payment for "${item.title}" - ₹${amount}`);
    
    // Improved UPI URL with proper formatting
    const upiParams = new URLSearchParams({
      pa: 'eduaccess@ybl',  // Changed to YBL for better compatibility
      pn: 'EduAccess Platform',
      am: amount.toString(),
      cu: 'INR',
      tr: transactionId,
      tn: `Payment for ${item.title}`,
      mode: '02',
      purpose: '00'
    });
    
    const upiUrl = `upi://pay?${upiParams.toString()}`;
    
    // Better device detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    if (isMobile) {
      // Try to open UPI app
      const paymentWindow = window.open(upiUrl, '_self');
      
      // Fallback after 3 seconds
      setTimeout(() => {
        // Check if the app opened successfully
        if (paymentWindow) {
          // Create a payment confirmation interface
          const confirmPayment = confirm(
            `Payment of ₹${amount} for "${item.title}" initiated.\n\n` +
            `Transaction ID: ${transactionId}\n` +
            `UPI ID: eduaccess@ybl\n\n` +
            `Please complete the payment in your UPI app.\n` +
            `Click OK after payment completion.`
          );
          
          if (confirmPayment) {
            alert('Thank you! Your access will be activated shortly. Please check your email for course details.');
          }
        } else {
          alert('Please install a UPI app (PhonePe, GPay, Paytm) to complete the payment.');
        }
      }, 2000);
    } else {
      // Desktop fallback with better UX
      const paymentModal = document.createElement('div');
      paymentModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <h3 style="color: #333; margin-bottom: 20px; font-size: 24px;">Complete Payment</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <p style="margin: 5px 0; color: #666;"><strong>Amount:</strong> ₹${amount}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Course:</strong> ${item.title}</p>
              <p style="margin: 5px 0; color: #666;"><strong>UPI ID:</strong> eduaccess@ybl</p>
              <p style="margin: 5px 0; color: #666;"><strong>Transaction ID:</strong> ${transactionId}</p>
            </div>
            <p style="color: #666; margin-bottom: 20px;">Scan the QR code with any UPI app or use the UPI ID above</p>
            <div style="margin: 20px 0;">
              <div style="width: 150px; height: 150px; background: #f0f0f0; margin: 0 auto; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">
                QR Code<br/>Coming Soon
              </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px;">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(paymentModal);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section with Location Info */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-white" />
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2 text-lg">
                {currentLocation}
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 animate-float">
              🌟 Digital Learning Hub
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover location-specific courses and resources tailored for your region
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Region-Specific Content
              </Badge>
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Localized Learning
              </Badge>
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Access Solutions
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 mx-auto max-w-7xl">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <Card className="glass-effect border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search courses, tutorials, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-lg border-0 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    All Categories
                  </Button>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300">
              All Content
            </TabsTrigger>
            <TabsTrigger value="course" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="article" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300">
              <FileText className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <Card 
                  key={item.id} 
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <div className={`h-48 bg-gradient-to-br ${item.type === 'course' ? 'from-blue-400 to-purple-600' : item.type === 'video' ? 'from-red-400 to-pink-600' : 'from-yellow-400 to-orange-600'} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10">
                        {item.type === 'course' && <BookOpen className="w-16 h-16 text-white animate-float" />}
                        {item.type === 'video' && <Play className="w-16 h-16 text-white animate-float" />}
                        {item.type === 'article' && <FileText className="w-16 h-16 text-white animate-float" />}
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="glass-effect text-white border-white/30">
                          {item.type}
                        </Badge>
                      </div>
                      {item.regions && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse-glow">
                            Region Specific
                          </Badge>
                        </div>
                      )}
                      {item.price > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 animate-pulse-glow">
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="group-hover:text-blue-600 transition-colors duration-300 text-lg">
                          {item.title}
                        </CardTitle>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="ghost" className="p-2 hover:bg-red-50 hover:text-red-600">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-2 hover:bg-blue-50 hover:text-blue-600">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {item.enrolled} enrolled
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {item.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-blue-600">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2 bg-gray-200">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                              style={{ width: `${item.progress}%` }}
                            />
                          </Progress>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">
                          {item.price === 0 ? (
                            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">FREE</span>
                          ) : (
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              ₹{item.price}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {item.price === 0 ? (
                            <Button 
                              onClick={() => handlePurchase(item)}
                              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 transition-all duration-300 hover:scale-105 group"
                            >
                              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                              Download Free
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handlePurchase(item)}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 transition-all duration-300 hover:scale-105 animate-pulse-glow"
                            >
                              Pay with UPI
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Course Form */}
        {showAddForm && (
          <Card className="glass-effect border-0 shadow-2xl animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-xl">✨ Add New Content</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Input
                placeholder="Content title"
                value={newContent.title}
                onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                className="border-0 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
              />
              <Textarea
                placeholder="Content description"
                value={newContent.description}
                onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                className="border-0 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Duration (e.g., 2 hours)"
                  value={newContent.duration}
                  onChange={(e) => setNewContent({...newContent, duration: e.target.value})}
                  className="border-0 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="number"
                  placeholder="Price (₹)"
                  value={newContent.price}
                  onChange={(e) => setNewContent({...newContent, price: parseFloat(e.target.value) || 0})}
                  className="border-0 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="hover:scale-105 transition-all"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddContent}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 hover:scale-105 transition-all"
                >
                  Add Content
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Floating Add Button */}
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse-glow z-10"
        >
          <span className="text-2xl">+</span>
        </Button>
      </div>
    </div>
  );
};

export default ContentLibrary;
