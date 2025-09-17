import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { AboutPage } from '@/components/AboutPage';
import { ServicesPage } from '@/components/ServicesPage';
import { CaseStudiesPage } from '@/components/CaseStudiesPage';
import { CaseStudyDetailPage } from '@/components/CaseStudyDetailPage';
import { BlogPage } from '@/components/BlogPage';
import { ContactPage } from '@/components/ContactPage';

type Page = 'home' | 'about' | 'services' | 'case-studies' | 'case-study-detail' | 'blog' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigateToPage = (page: Page, slug?: string) => {
    setCurrentPage(page);
    if (page === 'case-study-detail' && slug) {
      setSelectedCaseStudySlug(slug);
    } else {
      setSelectedCaseStudySlug(null);
    }
    setIsMobileMenuOpen(false);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateToPage} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'case-studies':
        return <CaseStudiesPage onNavigate={navigateToPage} />;
      case 'case-study-detail':
        return selectedCaseStudySlug ? (
          <CaseStudyDetailPage slug={selectedCaseStudySlug} onNavigate={navigateToPage} />
        ) : (
          <CaseStudiesPage onNavigate={navigateToPage} />
        );
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-300">
      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={navigateToPage}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="transition-all duration-300">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Consulting Pro
              </h3>
              <p className="text-slate-300 mb-6 max-w-md">
                Empowering businesses with AI-driven IT consulting solutions. We help companies leverage 
                artificial intelligence to optimize processes, reduce costs, and scale efficiently.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  onClick={() => navigateToPage('contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button 
                    onClick={() => navigateToPage('home')}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPage('about')}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPage('services')}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPage('case-studies')}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToPage('blog')}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-slate-300 mb-4 text-sm">
                Get the latest AI insights and industry trends delivered to your inbox.
              </p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 AI Consulting Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-400">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;