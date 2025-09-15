import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Code
} from 'lucide-react';

export function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'AI Strategy & Consulting',
      description: 'Comprehensive AI strategy development to align technology initiatives with your business objectives. We help you identify opportunities, assess readiness, and create a roadmap for AI adoption.',
      icon: Brain,
      features: [
        'AI Readiness Assessment',
        'Technology Roadmap Development',
        'ROI Analysis & Business Case Development',
        'Change Management Strategy',
        'Risk Assessment & Mitigation Planning'
      ]
    },
    {
      id: 2,
      title: 'AI Automation & Integrations',
      description: 'Streamline your business processes with intelligent automation solutions. We design and implement AI-powered workflows that reduce manual effort and increase efficiency.',
      icon: Zap,
      features: [
        'Process Automation Design',
        'Intelligent Document Processing',
        'Workflow Optimization',
        'Legacy System Integration',
        'Real-time Monitoring & Analytics'
      ]
    },
    {
      id: 3,
      title: 'Custom AI Model Development',
      description: 'Tailored machine learning models designed specifically for your unique business challenges. From predictive analytics to computer vision, we build AI solutions that fit your needs.',
      icon: Code,
      features: [
        'Machine Learning Model Development',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Predictive Analytics',
        'Model Deployment & Maintenance'
      ]
    },
    {
      id: 4,
      title: 'Training & Workshops',
      description: 'Empower your team with AI knowledge and skills. Our comprehensive training programs ensure your organization can effectively leverage and maintain AI solutions.',
      icon: TrendingUp,
      features: [
        'Executive AI Workshops',
        'Technical Team Training',
        'Custom Curriculum Development',
        'Hands-on Implementation Sessions',
        'Ongoing Support & Mentoring'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Increased Efficiency',
      description: 'Automate repetitive tasks and optimize workflows to boost productivity by up to 40%.'
    },
    {
      title: 'Cost Reduction',
      description: 'Reduce operational costs through intelligent automation and data-driven decision making.'
    },
    {
      title: 'Competitive Advantage',
      description: 'Stay ahead of the competition with cutting-edge AI solutions tailored to your industry.'
    },
    {
      title: 'Scalable Solutions',
      description: 'Build AI systems that grow with your business and adapt to changing requirements.'
    },
    {
      title: 'Data-Driven Insights',
      description: 'Transform raw data into actionable insights that drive strategic business decisions.'
    },
    {
      title: 'Risk Mitigation',
      description: 'Identify and mitigate potential risks through predictive analytics and monitoring systems.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0">
              Our Services
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Comprehensive AI Solutions for Your Business
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              From strategy development to implementation and optimization, we provide end-to-end AI consulting services designed to transform your business operations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                              {service.title}
                            </h2>
                          </div>
                        </div>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="space-y-3 mb-8">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                            Key Features:
                          </h3>
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button className="w-fit bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      {/* Visual */}
                      <div className={`bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden ${!isEven ? 'lg:order-first' : ''}`}>
                        <div className="h-64 lg:h-full flex items-center justify-center p-12">
                          <div className="text-center text-white">
                            <IconComponent className="h-24 w-24 mx-auto mb-4 opacity-80" />
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Why Choose Our AI Services?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our AI solutions deliver measurable results that transform your business operations and drive growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {benefit.description}
                  </p>
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
              Let's discuss how our AI services can help you achieve your business objectives and stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
              >
                Download Service Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}