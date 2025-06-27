
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Video, Headphones, Download, Search, Filter, CreditCard, MapPin } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'book';
  category: string;
  size: string;
  price: number;
  description: string;
  region: string[];
  priority: boolean;
}

interface ContentLibraryProps {
  region: string;
  regionData: any;
}

const ContentLibrary = ({ region, regionData }: ContentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock content data with region-specific items
  const contentItems: ContentItem[] = [
    // China-specific content
    {
      id: '1',
      title: 'VPN Setup Guide for Beginners',
      type: 'pdf',
      category: 'Privacy & Security',
      size: '5.2 MB',
      price: 2.99,
      description: 'Complete guide to setting up and using VPNs safely',
      region: ['China', 'Iran'],
      priority: true
    },
    {
      id: '2',
      title: 'Offline Wikipedia Dump - Science',
      type: 'book',
      category: 'Reference',
      size: '2.1 GB',
      price: 9.99,
      description: 'Complete Wikipedia science articles for offline access',
      region: ['China', 'North Korea'],
      priority: true
    },
    {
      id: '3',
      title: 'English Learning Course - Offline',
      type: 'video',
      category: 'Language',
      size: '850 MB',
      price: 12.99,
      description: 'Complete English course with audio and subtitles',
      region: ['China', 'North Korea', 'Cuba'],
      priority: true
    },
    // India-specific content
    {
      id: '4',
      title: 'Programming Basics - Offline Course',
      type: 'video',
      category: 'Technology',
      size: '1.2 GB',
      price: 15.99,
      description: 'Learn programming fundamentals without internet',
      region: ['India', 'Sudan'],
      priority: true
    },
    {
      id: '5',
      title: 'Digital Skills for Rural Areas',
      type: 'pdf',
      category: 'Skills',
      size: '45 MB',
      price: 4.99,
      description: 'Essential digital literacy for low-connectivity areas',
      region: ['India', 'Sudan'],
      priority: true
    },
    // Cuba-specific content
    {
      id: '6',
      title: 'Entrepreneurship in Restricted Economies',
      type: 'audio',
      category: 'Business',
      size: '120 MB',
      price: 8.99,
      description: 'Building businesses in challenging economic conditions',
      region: ['Cuba', 'Syria'],
      priority: true
    },
    // Syria-specific content
    {
      id: '7',
      title: 'Human Rights Education Kit',
      type: 'pdf',
      category: 'Education',
      size: '78 MB',
      price: 0.00,
      description: 'Free educational materials on human rights',
      region: ['Syria', 'Sudan'],
      priority: true
    },
    // North Korea-specific content
    {
      id: '8',
      title: 'Basic Health Education Videos',
      type: 'video',
      category: 'Health',
      size: '650 MB',
      price: 7.99,
      description: 'Essential health information for offline viewing',
      region: ['North Korea', 'Sudan'],
      priority: true
    },
    // Iran-specific content
    {
      id: '9',
      title: 'Advanced VPN Configuration',
      type: 'video',
      category: 'Privacy & Security',
      size: '340 MB',
      price: 6.99,
      description: 'Detailed tutorials for bypassing restrictions',
      region: ['Iran', 'China'],
      priority: true
    },
    // Sudan-specific content
    {
      id: '10',
      title: 'Women\'s Education Starter Pack',
      type: 'pdf',
      category: 'Education',
      size: '95 MB',
      price: 3.99,
      description: 'Educational resources focused on women\'s empowerment',
      region: ['Sudan', 'Syria'],
      priority: true
    },
    // General content
    {
      id: '11',
      title: 'Mathematics Fundamentals',
      type: 'pdf',
      category: 'Education',
      size: '25 MB',
      price: 2.99,
      description: 'Core mathematics concepts for all ages',
      region: ['India', 'North Korea', 'Sudan'],
      priority: false
    },
    {
      id: '12',
      title: 'Science Experiments - Offline Guide',
      type: 'book',
      category: 'Science',
      size: '156 MB',
      price: 8.99,
      description: 'Hands-on science experiments with common materials',
      region: ['North Korea', 'India'],
      priority: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'audio': return <Headphones className="h-5 w-5" />;
      case 'book': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600';
      case 'video': return 'text-blue-600';
      case 'audio': return 'text-purple-600';
      case 'book': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesRegion = item.region.includes(region) || region === '';
    
    return matchesSearch && matchesType && matchesCategory && matchesRegion;
  });

  // Prioritize region-specific content
  const prioritizedContent = filteredContent.sort((a, b) => {
    if (a.region.includes(region) && !b.region.includes(region)) return -1;
    if (!a.region.includes(region) && b.region.includes(region)) return 1;
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return 0;
  });

  const handlePurchase = (item: ContentItem) => {
    if (item.price === 0) {
      // Handle free downloads
      alert(`Starting download for "${item.title}"`);
      return;
    }

    // Create PhonePe deep link
    const amount = (item.price * 100).toString(); // PhonePe expects amount in paise
    const merchantId = 'EDUACCESS'; // You'll need to replace with your actual merchant ID
    const transactionId = `TXN_${Date.now()}_${item.id}`;
    
    // PhonePe deep link format
    const phonePeUrl = `phonepe://pay?pa=eduaccess@ybl&pn=EduAccess&am=${amount}&tr=${transactionId}&tn=Payment for ${encodeURIComponent(item.title)}`;
    
    // Fallback URL for web
    const webFallbackUrl = `https://phon.pe/ru_${transactionId}`;
    
    console.log(`Processing payment for "${item.title}" - ₹${item.price}`);
    
    // Try to open PhonePe app
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    
    if (isAndroid || isIOS) {
      // On mobile, try to open the PhonePe app
      window.location.href = phonePeUrl;
      
      // Fallback after a short delay if app doesn't open
      setTimeout(() => {
        if (confirm('PhonePe app not found. Would you like to use web payment instead?')) {
          window.open(webFallbackUrl, '_blank');
        }
      }, 2000);
    } else {
      // On desktop, show payment options
      if (confirm(`Pay ₹${item.price} for "${item.title}"?\n\nPayment methods available:\n• PhonePe\n• Net Banking\n• UPI\n• Credit/Debit Card`)) {
        window.open(webFallbackUrl, '_blank');
      }
    }
  };

  const categories = ['all', ...Array.from(new Set(contentItems.map(item => item.category)))];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Content Library
          </CardTitle>
          <CardDescription>
            Discover educational resources tailored for your region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="book">Books</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Region-specific banner */}
      {region && regionData && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-orange-600" />
              <span className="font-semibold text-orange-900">
                Showing priority content for {region}
              </span>
            </div>
            <p className="text-sm text-orange-800">
              Content is prioritized based on your region's specific access challenges and educational needs.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prioritizedContent.map((item) => (
          <Card key={item.id} className={`hover:shadow-lg transition-shadow ${
            item.region.includes(region) ? 'ring-2 ring-blue-200' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-gray-100 ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex flex-col gap-1">
                  {item.region.includes(region) && (
                    <Badge variant="secondary" className="text-xs">
                      Priority for {region}
                    </Badge>
                  )}
                  {item.price === 0 && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      FREE
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              <CardDescription className="text-sm">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Category: {item.category}</span>
                  <span>Size: {item.size}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {item.price === 0 ? 'FREE' : `₹${item.price.toFixed(2)}`}
                  </div>
                  <Button 
                    onClick={() => handlePurchase(item)}
                    className="flex items-center gap-2"
                    variant={item.price === 0 ? "default" : "default"}
                  >
                    {item.price === 0 ? (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Pay with PhonePe
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {prioritizedContent.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No content found matching your criteria.</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentLibrary;
