import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import type { CreateContactFormInput } from '../../../server/src/schema';

export function ContactPage() {
  const [formData, setFormData] = useState<CreateContactFormInput>({
    name: '',
    email: '',
    company: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await trpc.createContactForm.mutate(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: null,
        message: ''
      });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@aiconsultingpro.com',
      action: 'mailto:hello@aiconsultingpro.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 AI Innovation Drive\nSan Francisco, CA 94105',
      action: null
    }
  ];

  const services = [
    {
      icon: MessageSquare,
      title: 'Free Consultation',
      description: '30-minute discovery call to discuss your AI needs and opportunities.',
      duration: '30 minutes',
      availability: 'Same day booking available'
    },
    {
      icon: Users,
      title: 'Strategy Workshop',
      description: 'Comprehensive AI readiness assessment and strategic planning session.',
      duration: '2-3 hours',
      availability: 'Book within 1 week'
    },
    {
      icon: Zap,
      title: 'Implementation Planning',
      description: 'Detailed project scoping and implementation roadmap development.',
      duration: '1-2 days',
      availability: 'Flexible scheduling'
    }
  ];

  const faqs = [
    {
      question: 'What is the typical timeline for an AI project?',
      answer: 'Project timelines vary based on complexity, but most implementations range from 3-6 months from initial consultation to full deployment.'
    },
    {
      question: 'Do you work with small businesses?',
      answer: 'Absolutely! We work with businesses of all sizes, from startups to enterprise corporations, tailoring our solutions to fit your budget and needs.'
    },
    {
      question: 'What industries do you specialize in?',
      answer: 'We have experience across multiple industries including healthcare, retail, manufacturing, finance, and technology, with adaptable solutions for any sector.'
    },
    {
      question: 'How do you ensure data security?',
      answer: 'We follow enterprise-grade security practices, including data encryption, secure cloud infrastructure, and compliance with industry standards like GDPR and HIPAA.'
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
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Let's Build Your AI Future Together
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Get in touch with our experts for a free consultation and discover how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours. For urgent inquiries, please call us directly.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData((prev: CreateContactFormInput) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="Enter your full name"
                          required
                          className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData((prev: CreateContactFormInput) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="Enter your email address"
                          required
                          className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        value={formData.company || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev: CreateContactFormInput) => ({ 
                            ...prev, 
                            company: e.target.value || null 
                          }))
                        }
                        placeholder="Enter your company name (optional)"
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFormData((prev: CreateContactFormInput) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Tell us about your project, goals, and how we can help you..."
                        rows={6}
                        required
                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                              {item.label}
                            </h4>
                            {item.action ? (
                              <a 
                                href={item.action}
                                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Monday - Friday</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Saturday</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">10:00 AM - 2:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Sunday</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                      📞 Emergency support available 24/7 for existing clients
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Schedule a Consultation
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose the consultation type that best fits your needs and timeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Duration: {service.duration}</span>
                      </div>
                      <div className="flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{service.availability}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Schedule Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Find answers to common questions about our AI consulting services.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Still have questions? We're here to help.
              </p>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Contact Support
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}