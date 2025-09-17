import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  DollarSign,
  BarChart3,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { useState, useEffect } from 'react';
import type { CaseStudy } from '../../../server/src/schema';

interface CaseStudiesPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'case-studies' | 'case-study-detail' | 'blog' | 'contact', slug?: string) => void;
}

export function CaseStudiesPage({ onNavigate }: CaseStudiesPageProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        setIsLoading(true);
        const data = await trpc.getAllCaseStudies.query();
        setCaseStudies(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  const staticCaseStudies = [
    {
      id: 1,
      title: 'Retail AI Revolution: Inventory Optimization System',
      slug: 'retail-ai-inventory-optimization',
      client_name: 'RetailMax Corp',
      industry: 'Retail',
      problem_description: 'RetailMax Corp was struggling with inventory management across 200+ stores, leading to stockouts, overstocking, and $2M+ in lost revenue annually.',
      solution_description: 'We implemented an AI-powered inventory optimization system using machine learning algorithms to predict demand patterns, seasonal trends, and customer behavior.',
      results_description: '40% reduction in stockouts, 25% decrease in excess inventory, $1.8M cost savings in the first year, and 60% improvement in forecast accuracy.',
      image_url: null,
      technologies_used: ['Python', 'TensorFlow', 'AWS', 'PostgreSQL', 'REST APIs'],
      is_featured: true,
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Healthcare AI: Patient Flow Optimization',
      slug: 'healthcare-ai-patient-flow',
      client_name: 'MedCenter Hospital',
      industry: 'Healthcare',
      problem_description: 'MedCenter Hospital faced challenges with patient flow management, leading to long wait times, resource bottlenecks, and decreased patient satisfaction scores.',
      solution_description: 'We developed an AI-driven patient flow optimization system that predicts patient admission patterns, optimizes bed allocation, and streamlines discharge processes.',
      results_description: '35% reduction in average wait times, 20% increase in patient satisfaction scores, improved resource utilization by 30%, and enhanced staff efficiency.',
      image_url: null,
      technologies_used: ['Python', 'scikit-learn', 'Azure', 'MongoDB', 'Power BI'],
      is_featured: false,
      created_at: new Date('2024-02-10'),
      updated_at: new Date('2024-02-10')
    },
    {
      id: 3,
      title: 'Manufacturing AI: Predictive Maintenance System',
      slug: 'manufacturing-ai-predictive-maintenance',
      client_name: 'IndustrialTech Manufacturing',
      industry: 'Manufacturing',
      problem_description: 'IndustrialTech experienced frequent unexpected equipment failures, resulting in costly downtime, emergency repairs, and production delays.',
      solution_description: 'We implemented a comprehensive predictive maintenance solution using IoT sensors, machine learning models, and real-time analytics to predict equipment failures.',
      results_description: '50% reduction in unplanned downtime, 30% decrease in maintenance costs, 95% accuracy in failure prediction, and improved overall equipment effectiveness by 25%.',
      image_url: null,
      technologies_used: ['Python', 'PyTorch', 'Apache Kafka', 'InfluxDB', 'Grafana'],
      is_featured: true,
      created_at: new Date('2024-03-05'),
      updated_at: new Date('2024-03-05')
    }
  ];

  // If loading, show skeleton loader
  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0">
                Case Studies
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                Real Results from Real Clients
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover how we've helped businesses across various industries transform their operations with AI-driven solutions and achieve measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* Loading Skeletons */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="p-8 lg:p-12">
                        <Skeleton className="h-6 w-20 mb-4" />
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        <Skeleton className="h-6 w-1/2 mb-6" />
                        <div className="space-y-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                        <Skeleton className="h-10 w-40 mt-8" />
                      </div>
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-64 lg:h-full">
                        <div className="h-full flex items-center justify-center">
                          <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If error or no data, fall back to static data
  const displayCaseStudies = error || !caseStudies ? staticCaseStudies : caseStudies;

  const metrics = [
    {
      icon: TrendingUp,
      value: '150%',
      label: 'Average ROI Increase',
      description: 'Our clients see significant returns on their AI investments'
    },
    {
      icon: Clock,
      value: '60%',
      label: 'Time Savings',
      description: 'Reduction in manual processes through automation'
    },
    {
      icon: DollarSign,
      value: '$5M+',
      label: 'Cost Savings',
      description: 'Total cost reductions achieved for our clients'
    },
    {
      icon: BarChart3,
      value: '98%',
      label: 'Success Rate',
      description: 'Projects delivered successfully on time and budget'
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
              Case Studies
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Real Results from Real Clients
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses across various industries transform their operations with AI-driven solutions and achieve measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
                      {metric.label}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {displayCaseStudies.map((study, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <Card key={study.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                          {study.industry}
                        </Badge>
                        
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                          {study.title}
                        </h2>
                        
                        <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-6">
                          Client: {study.client_name}
                        </p>

                        {/* Problem */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            Challenge
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {study.problem_description}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            Solution
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {study.solution_description}
                          </p>
                        </div>

                        {/* Results */}
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            Results
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {study.results_description}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                            Technologies Used:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies_used.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          className="w-fit bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          onClick={() => onNavigate('case-study-detail', study.slug)}
                        >
                          View Full Case Study
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      {/* Visual */}
                      <div className={`bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden ${!isEven ? 'lg:order-first' : ''}`}>
                        <div className="h-64 lg:h-full flex items-center justify-center p-12">
                          <div className="text-center text-white">
                            <BarChart3 className="h-24 w-24 mx-auto mb-4 opacity-80" />
                            <h3 className="text-xl font-semibold mb-2">{study.client_name}</h3>
                            <p className="text-blue-100">{study.industry} Industry</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results with AI solutions tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}