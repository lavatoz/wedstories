import { Link } from 'react-router-dom';
import { Sparkles, Image, Share2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-6 px-8 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10">
        <div className="text-2xl font-serif font-bold text-[var(--color-wed-gold-dark)] tracking-wide">
          WedStory
        </div>
        <Link to="/templates" className="bg-[var(--color-wed-gold)] text-white px-6 py-2 rounded-full font-medium hover:bg-[var(--color-wed-gold-dark)] transition-colors shadow-md">
          Explore Invitations
        </Link>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-[var(--color-wed-cream)] opacity-60 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
              Your Story. <br className="hidden md:block"/>
              <span className="text-[var(--color-wed-gold-dark)] italic">Your Invitation.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beautiful, premium digital wedding invitations, made uniquely for your special day. Elegant designs that feel like real invitations.
            </p>
            <div className="pt-8">
              <Link to="/templates" className="bg-gray-900 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-black transition-all transform hover:scale-105 shadow-xl inline-block">
                Create Your Invitation
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-serif text-center mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-[var(--color-wed-cream)] rounded-full flex items-center justify-center mx-auto text-[var(--color-wed-gold-dark)]">
                  <Image size={32} />
                </div>
                <h3 className="text-2xl font-serif">1. Choose Design</h3>
                <p className="text-gray-600">Select from our curated collection of premium templates.</p>
              </div>
              <div className="space-y-6">
                <div className="w-20 h-20 bg-[var(--color-wed-cream)] rounded-full flex items-center justify-center mx-auto text-[var(--color-wed-gold-dark)]">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-serif">2. Add Details</h3>
                <p className="text-gray-600">Personalize with your story, photos, and event information.</p>
              </div>
              <div className="space-y-6">
                <div className="w-20 h-20 bg-[var(--color-wed-cream)] rounded-full flex items-center justify-center mx-auto text-[var(--color-wed-gold-dark)]">
                  <Share2 size={32} />
                </div>
                <h3 className="text-2xl font-serif">3. Share Magic</h3>
                <p className="text-gray-600">Share your beautiful unique link instantly on WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 text-center">
        <div className="text-3xl font-serif mb-4">WedStory</div>
        <p className="text-gray-400">© 2026 WedStory. All rights reserved.</p>
      </footer>
    </div>
  );
}
