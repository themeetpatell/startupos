import React from 'react';
import RevolutionaryHero from '../components/RevolutionaryHero';
import UltraFeatures from '../components/UltraFeatures';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <RevolutionaryHero />

      {/* Features Section */}
      <UltraFeatures />

      {/* Call to Action Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="ultra-glass rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="ultra-text-gradient">Transform</span> Your Startup?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Join thousands of startups already using StartupOS to accelerate their growth 
              and achieve their goals faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="ultra-button flex items-center space-x-2 text-lg px-8 py-4">
                <span>Start Free Trial</span>
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors duration-200 font-medium">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

