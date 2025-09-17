import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
  ExternalLink
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
          <Skeleton className="h-10 w-40 mb-8" />
          
          {/* Header Skeleton */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>

          {/* Content Skeleton */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80">
                  <CardContent className="p-8">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Card className="bg-white/80 dark:bg-slate-800/80">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
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

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Button
          onClick={() => onNavigate('case-studies')}
          variant="outline"
          className="mb-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Case Studies
        </Button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
              {caseStudy.industry}
            </Badge>
            {caseStudy.is_featured && (
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border-0">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="text-slate-600 dark:text-slate-400">
              <Calendar className="mr-1 h-3 w-3" />
              {caseStudy.created_at.toLocaleDateString()}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
            {caseStudy.title}
          </h1>
          
          <div className="flex items-center text-lg text-slate-600 dark:text-slate-300 mb-2">
            <Building2 className="mr-2 h-5 w-5 text-blue-500" />
            <span className="font-semibold text-blue-600 dark:text-blue-400">{caseStudy.client_name}</span>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400">
            {caseStudy.industry} Industry
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Problem Section */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">The Challenge</h2>
                    <p className="text-slate-600 dark:text-slate-400">What problems needed to be solved</p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {caseStudy.problem_description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Solution Section */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Our Solution</h2>
                    <p className="text-slate-600 dark:text-slate-400">How we approached and solved the problem</p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {caseStudy.solution_description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">The Results</h2>
                    <p className="text-slate-600 dark:text-slate-400">Measurable outcomes and business impact</p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {caseStudy.results_description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Image/Visual */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                {caseStudy.image_url ? (
                  <img 
                    src={caseStudy.image_url} 
                    alt={`${caseStudy.title} visualization`}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-lg font-semibold opacity-90">{caseStudy.client_name}</h3>
                      <p className="text-blue-100 text-sm">{caseStudy.industry} Solution</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Technologies Used */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
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

            {/* Project Info */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Project Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Client:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{caseStudy.client_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Industry:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{caseStudy.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Completed:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {caseStudy.created_at.toLocaleDateString()}
                    </span>
                  </div>
                  {caseStudy.is_featured && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Status:</span>
                      <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border-0 text-xs">
                        Featured Case
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Achieve Similar Results?
              </h2>
              <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
                Let's discuss how we can help your business leverage AI to solve challenges and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => onNavigate('contact')}
                >
                  Start Your Project
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                  onClick={() => onNavigate('case-studies')}
                >
                  View More Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}