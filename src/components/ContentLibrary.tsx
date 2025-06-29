
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
  Zap
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
}

const contentData: ContentItem[] = [
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
    imageUrl: '/images/react-course.jpg',
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
    imageUrl: '/images/js-es6.jpg',
  },
  {
    id: 3,
    type: 'article',
    title: 'CSS Flexbox Guide',
    description: 'Master CSS Flexbox with this comprehensive guide.',
    duration: '15 minutes',
    enrolled: 5600,
    rating: 4.6,
    progress: 0,
    price: 0,
    imageUrl: '/images/css-flexbox.jpg',
  },
  {
    id: 4,
    type: 'course',
    title: 'Node.js for Beginners',
    description: 'Get started with Node.js and build server-side applications.',
    duration: '3 hours',
    enrolled: 800,
    rating: 4.8,
    progress: 60,
    price: 399,
    imageUrl: '/images/node-js.jpg',
  },
  {
    id: 5,
    type: 'video',
    title: 'Vue.js Crash Course',
    description: 'Learn Vue.js in this fast-paced crash course.',
    duration: '45 minutes',
    enrolled: 2100,
    rating: 4.5,
    progress: 0,
    price: 0,
    imageUrl: '/images/vue-js.jpg',
  },
  {
    id: 6,
    type: 'article',
    title: 'HTML5 Semantic Elements',
    description: 'Learn about the new semantic elements in HTML5.',
    duration: '20 minutes',
    enrolled: 4200,
    rating: 4.4,
    progress: 0,
    price: 0,
    imageUrl: '/images/html5.jpg',
  },
  {
    id: 7,
    type: 'course',
    title: 'Python for Data Science',
    description: 'Learn Python and use it for data analysis and machine learning.',
    duration: '5 hours',
    enrolled: 1500,
    rating: 4.9,
    progress: 80,
    price: 599,
    imageUrl: '/images/python-data.jpg',
  },
  {
    id: 8,
    type: 'video',
    title: 'Angular Tutorial for Beginners',
    description: 'A step-by-step guide to learning Angular.',
    duration: '60 minutes',
    enrolled: 2800,
    rating: 4.6,
    progress: 0,
    price: 0,
    imageUrl: '/images/angular.jpg',
  },
  {
    id: 9,
    type: 'article',
    title: 'Responsive Web Design',
    description: 'Create responsive websites that look great on any device.',
    duration: '25 minutes',
    enrolled: 4900,
    rating: 4.7,
    progress: 0,
    price: 0,
    imageUrl: '/images/responsive-design.jpg',
  },
];

const ContentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [content, setContent] = useState(contentData);
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

    // Create PhonePe payment request
    const amount = item.price.toFixed(2);
    const transactionId = `TXN_${Date.now()}_${item.id}`;
    
    // Corrected UPI URL format
    const upiUrl = `upi://pay?pa=eduaccess@paytm&pn=EduAccess&am=${amount}&cu=INR&tr=${transactionId}&tn=${encodeURIComponent('Payment for ' + item.title)}`;
    
    console.log(`Processing payment for "${item.title}" - ₹${item.price}`);
    
    // Try to open UPI app first
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    
    if (isAndroid || isIOS) {
      // On mobile, try UPI intent first
      window.location.href = upiUrl;
      
      // Fallback message after delay
      setTimeout(() => {
        alert('If PhonePe app did not open, please install PhonePe from your app store.');
      }, 3000);
    } else {
      // On desktop, show payment info
      if (confirm(`Pay ₹${item.price} for "${item.title}"?\n\nPlease scan the QR code with PhonePe app or use UPI ID: eduaccess@paytm`)) {
        alert('Please use PhonePe mobile app to complete the payment.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4 animate-float">
              🌟 Digital Learning Hub
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover premium courses, tutorials, and resources to accelerate your learning journey
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending Content
              </Badge>
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Certificate Programs
              </Badge>
              <Badge variant="secondary" className="glass-effect text-white border-white/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Interactive Learning
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
                      {item.price > 0 && (
                        <div className="absolute top-4 left-4">
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
                              Pay with PhonePe
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
