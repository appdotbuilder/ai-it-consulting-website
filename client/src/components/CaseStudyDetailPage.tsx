import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Target,
  Calendar,
  Building2,
  Code,
  ExternalLink,
  CheckCircle,
  Quote,
  Users
} from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { useState, useEffect } from 'react';
import type { CaseStudy } from '../../../server/src/schema';

interface CaseStudyDetailPageProps {
  slug: string;
  onNavigate: (page: 'home' | 'about' | 'services' | 'case-studies' | 'case-study-detail' | 'blog' | 'contact', slug?: string) => void;
}

export function CaseStudyDetailPage({ slug, onNavigate }: CaseStudyDetailPageProps) {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        setIsLoading(true);
        const data = await trpc.getCaseStudyBySlug.query({ slug });
        setCaseStudy(data);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to load case study:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaseStudy();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button Skeleton */}
          <div className="h-10 w-40 mb-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          
          {/* Hero Banner Skeleton */}
          <div className="mb-12">
            <div className="h-96 w-full mb-8 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="max-w-4xl">
              <div className="flex gap-3 mb-6">
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
              <div className="h-12 w-3/4 mb-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80">
                  <CardContent className="p-8">
                    <div className="h-6 w-32 mb-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card className="bg-white/80 dark:bg-slate-800/80">
                <CardContent className="p-6">
                  <div className="h-6 w-32 mb-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <Button
            onClick={() => onNavigate('case-studies')}
            variant="outline"
            className="mb-8 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Button>

          <Alert className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Case study not found. The requested case study may have been removed or the URL may be incorrect.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Extract key outcome from results for subheading
  const keyOutcome = caseStudy.results_description.split(',')[0] || 'Significant improvements achieved';

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          onClick={() => onNavigate('case-studies')}
          variant="outline"
          className="mb-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Case Studies
        </Button>
      </div>

      {/* Hero Banner */}
      <section className="mb-16">
        <div className="relative h-96 overflow-hidden">
          {caseStudy.image_url ? (
            <div className="absolute inset-0">
              <img 
                src={caseStudy.image_url} 
                alt={`${caseStudy.title} hero image`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-slate-900/20"></div>
            </div>
          )}
          
          <div className="container mx-auto px-4 relative h-full flex items-center">
            <div className="max-w-4xl text-white">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {caseStudy.industry}
                </Badge>
                {caseStudy.is_featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                    Featured Case
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                {caseStudy.industry} • {keyOutcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Client Overview */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Client Overview</h2>
                    <p className="text-slate-600 dark:text-slate-400">About our client and their industry</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-2">
                      {caseStudy.client_name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Operating in the {caseStudy.industry.toLowerCase()} industry, this organization faced significant challenges that required innovative AI solutions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Initial Challenge</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {caseStudy.problem_description.split('.')[0]}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problem Section */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">The Challenge</h2>
                    <p className="text-slate-600 dark:text-slate-400">Complex problems requiring innovative solutions</p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {caseStudy.problem_description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Solution Section */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Our AI-Powered Solution</h2>
                    <p className="text-slate-600 dark:text-slate-400">Innovative technology and strategic implementation</p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {caseStudy.solution_description}
                  </p>
                </div>
                
                {/* Key Solution Highlights */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    Key Implementation Features
                  </h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    {caseStudy.solution_description.includes('machine learning') && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        Advanced machine learning algorithms for predictive analytics
                      </li>
                    )}
                    {caseStudy.solution_description.includes('integration') && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        Seamless integration with existing systems and workflows
                      </li>
                    )}
                    {(caseStudy.solution_description.includes('real-time') || caseStudy.solution_description.includes('automated')) && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        Real-time processing and automated decision-making
                      </li>
                    )}
                    {caseStudy.solution_description.includes('dashboard') && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        Custom dashboards and reporting interfaces
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Measurable Results</h2>
                    <p className="text-slate-600 dark:text-slate-400">Quantifiable business impact and ROI</p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-medium">
                    {caseStudy.results_description}
                  </p>
                </div>
                
                {/* Results Visualization Placeholder */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="p-4">
                      <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">📈</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Performance Metrics</p>
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">💰</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Cost Savings</p>
                    </div>
                    <div className="p-4">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">⚡</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Efficiency Gains</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Testimonial */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Client Testimonial</h2>
                    <p className="text-slate-600 dark:text-slate-400">What our client had to say</p>
                  </div>
                </div>
                <blockquote className="text-lg italic text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  "This AI solution revolutionized our operations and exceeded all our expectations. The team delivered exactly what we needed to transform our business."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Leadership Team</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{caseStudy.client_name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">Client:</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">{caseStudy.client_name}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">Industry:</span>
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0 text-xs">
                        {caseStudy.industry}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">Completed:</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100 text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {caseStudy.created_at.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {caseStudy.is_featured && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 text-sm">Status:</span>
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                          Featured Case
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Technologies Used */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Technologies Used
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies_used.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Next Steps
                </h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => onNavigate('contact')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Schedule Your Free Consultation
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => onNavigate('case-studies')}
                  >
                    View More Case Studies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Achieve Similar Results?
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how we can help your business leverage AI to solve challenges and drive growth with solutions tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
                  onClick={() => onNavigate('contact')}
                >
                  Schedule Your Free Consultation
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
                  onClick={() => onNavigate('services')}
                >
                  Explore Our Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}