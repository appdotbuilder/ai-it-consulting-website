import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

import { trpc } from '@/utils/trpc';
import type { CaseStudy } from '../../../server/src/schema';

interface CaseStudiesPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'case-studies' | 'case-study-detail' | 'blog' | 'contact', slug?: string) => void;
}

export function CaseStudiesPage({ onNavigate }: CaseStudiesPageProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
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
        console.error('Failed to load case studies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

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
              Real Business Impact with AI
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              See how we help organizations transform their operations using AI-driven consulting and custom solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="h-48 w-full mb-6 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 animate-pulse" />
                    <div className="h-6 w-20 mb-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-7 w-full mb-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 w-full mb-2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 w-3/4 mb-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error || caseStudies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                {error ? 'Unable to load case studies at this time.' : 'No case studies available yet.'}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Visual/Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 overflow-hidden">
                      {study.image_url ? (
                        <img 
                          src={study.image_url} 
                          alt={`${study.title} thumbnail`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-white">
                          <div className="text-center">
                            <BarChart3 className="h-16 w-16 mx-auto mb-2 opacity-80" />
                            <p className="text-sm font-medium opacity-90">{study.industry}</p>
                            <p className="text-xs opacity-70">AI Solution</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {study.is_featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Industry Badge */}
                      <Badge className="mb-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                        {study.industry}
                      </Badge>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 leading-tight line-clamp-2">
                        {study.title}
                      </h3>
                      
                      {/* Problem Description Summary (1-line) */}
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {study.problem_description}
                      </p>

                      {/* View Details Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 group-hover:shadow-lg"
                        onClick={() => onNavigate('case-study-detail', study.slug)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
                onClick={() => onNavigate('contact')}
              >
                Schedule Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
                onClick={() => onNavigate('services')}
              >
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}