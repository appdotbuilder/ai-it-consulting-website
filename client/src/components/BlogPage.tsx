import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Brain,
  Zap
} from 'lucide-react';
import { useState } from 'react';

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Business: Trends to Watch in 2024',
      excerpt: 'Explore the emerging AI trends that will shape business operations in 2024, from generative AI to autonomous systems and everything in between.',
      author: 'Dr. Sarah Chen',
      published_at: new Date('2024-01-15'),
      content: 'Full article content...'
    },
    {
      id: 2,
      title: 'How to Calculate ROI for AI Implementation Projects',
      excerpt: 'A comprehensive guide to measuring the return on investment for your AI initiatives, including key metrics, calculation methods, and real-world examples.',
      author: 'Michael Rodriguez',
      published_at: new Date('2024-01-10'),
      content: 'Full article content...'
    },
    {
      id: 3,
      title: 'Machine Learning vs. Deep Learning: Which is Right for Your Business?',
      excerpt: 'Understanding the differences between ML and DL approaches and how to choose the right solution for your specific business challenges and data requirements.',
      author: 'Emily Johnson',
      published_at: new Date('2024-01-05'),
      content: 'Full article content...'
    }
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  const filteredPosts = regularPosts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.length / 5;
    return Math.ceil(words / wordsPerMinute);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0">
              <BookOpen className="w-4 h-4 mr-2" />
              AI Insights Blog
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              AI Insights & Industry Trends
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Stay ahead of the curve with our latest insights on AI technology, business applications, and industry best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Featured Article
                </h2>
              </div>
              
              <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(featuredPost.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{getReadingTime(featuredPost.content)} min read</span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {featuredPost.title}
                      </h3>
                      
                      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      <Button className="w-fit bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                      <div className="h-64 lg:h-full flex items-center justify-center p-12">
                        <div className="text-center text-white">
                          <Brain className="h-24 w-24 mx-auto mb-4 opacity-80" />
                          <Badge className="bg-white/20 text-white border-0">Featured</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Latest Articles
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-80" />
                            <span className="text-sm font-medium">AI Insights</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="h-3 w-3" />
                            <span>{getReadingTime(post.content)} min read</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Try adjusting your search terms or browse all categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Never Miss an AI Insight
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest AI trends, tips, and case studies delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder-blue-100 focus:bg-white/20"
              />
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Subscribe
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              Join 5,000+ professionals getting weekly AI insights. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}