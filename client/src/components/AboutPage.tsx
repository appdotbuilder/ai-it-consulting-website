import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Eye, 
  Users, 
  TrendingUp, 
  Shield,
  Linkedin,
  Twitter
} from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { useState, useEffect } from 'react';
import type { TeamMember } from '../../../server/src/schema';

export function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const data = await trpc.getActiveTeamMembers.query();
        setTeamMembers(data);
      } catch (error) {
        console.error('Failed to load team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Innovation-Driven',
      description: 'We stay at the forefront of AI technology to deliver cutting-edge solutions that give our clients a competitive advantage.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize data security and maintain the highest standards of confidentiality in all our AI implementations.'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Every solution is tailored to meet specific business needs, ensuring maximum value and measurable results.'
    },
    {
      icon: TrendingUp,
      title: 'Results-Oriented',
      description: 'We focus on delivering tangible outcomes that drive growth, efficiency, and cost savings for our clients.'
    }
  ];

  const achievements = [
    { number: '50+', label: 'Successful Projects' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '40%', label: 'Average Efficiency Gain' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0">
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Pioneering the Future of AI Consulting
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We are a team of AI experts, data scientists, and technology consultants dedicated to helping businesses harness the power of artificial intelligence to drive growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Our Mission</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  To democratize AI technology by making advanced artificial intelligence solutions accessible and practical for businesses of all sizes. We believe that every company should have the opportunity to leverage AI to optimize their operations, enhance decision-making, and accelerate growth.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Our Vision</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  To be the leading AI consulting firm that bridges the gap between cutting-edge technology and real-world business applications. We envision a future where AI-driven insights and automation empower organizations to achieve unprecedented levels of efficiency and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Why Choose Us
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our unique combination of technical expertise, industry experience, and client-focused approach sets us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-blue-100/10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Numbers that speak to our commitment to excellence and client success.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {achievement.number}
                </div>
                <div className="text-lg text-blue-100 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience in AI, machine learning, and business strategy.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-8 text-center">
                    <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {member.avatar_url ? (
                        <img 
                          src={member.avatar_url} 
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                      {member.position}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-3">
                      {member.linkedin_url && (
                        <Button variant="ghost" size="sm" className="p-2">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {member.twitter_url && (
                        <Button variant="ghost" size="sm" className="p-2">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Our amazing team information is coming soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Our Approach
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful AI implementation and adoption.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Assessment',
                description: 'We analyze your current processes, data infrastructure, and business objectives to identify AI opportunities.'
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'We develop a comprehensive AI strategy aligned with your business goals and technical capabilities.'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Our experts design and deploy AI solutions using industry best practices and cutting-edge technologies.'
              },
              {
                step: '04',
                title: 'Optimization',
                description: 'We continuously monitor, refine, and optimize your AI systems to ensure maximum performance and ROI.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}