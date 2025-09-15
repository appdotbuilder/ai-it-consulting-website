import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Settings, 
  TrendingUp, 
  ChevronRight,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

type Page = 'home' | 'about' | 'services' | 'case-studies' | 'blog' | 'contact';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      id: 1,
      title: 'AI Strategy & Consulting',
      description: 'Comprehensive AI strategy development to align technology initiatives with your business objectives.',
      icon: Brain
    },
    {
      id: 2,
      title: 'AI Automation & Integrations',
      description: 'Streamline your business processes with intelligent automation solutions.',
      icon: Zap
    },
    {
      id: 3,
      title: 'Custom AI Model Development',
      description: 'Tailored machine learning models designed specifically for your unique business challenges.',
      icon: Settings
    },
    {
      id: 4,
      title: 'Training & Workshops',
      description: 'Empower your team with AI knowledge and skills through comprehensive training programs.',
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      quote: "AI Consulting Pro transformed our business processes with their innovative AI solutions. We saw a 40% increase in efficiency within the first quarter.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp Solutions",
      rating: 5
    },
    {
      quote: "Their AI-driven ERP integration saved us countless hours and significantly reduced operational costs. Exceptional service and expertise.",
      author: "Michael Chen",
      role: "Operations Director, InnovateCo",
      rating: 5
    },
    {
      quote: "The custom AI model they developed for our customer service has revolutionized how we interact with clients. Highly recommended!",
      author: "Emily Rodriguez",
      role: "VP Customer Success, ClientFirst Inc.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0 text-sm font-medium px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Leading AI Consulting Services
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
              Empowering Businesses with AI-Driven IT Consulting Solutions
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We help companies leverage Artificial Intelligence to optimize processes, reduce costs, and scale efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
              >
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('services')}
                className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-4 text-lg transition-all duration-300"
              >
                Explore Services
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">Trusted by 50+ companies</div>
              <div className="text-sm font-medium">•</div>
              <div className="text-sm font-medium">99% Client Satisfaction</div>
              <div className="text-sm font-medium">•</div>
              <div className="text-sm font-medium">24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Our AI Solutions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comprehensive AI consulting services designed to transform your business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onNavigate('services')}
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                    >
                      Learn More 
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => onNavigate('services')}
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say about our AI solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can help you optimize processes, reduce costs, and scale efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('services')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}