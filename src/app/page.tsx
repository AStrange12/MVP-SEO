import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Zap, Globe, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 glass-morphism sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter">LocalBoost <span className="text-primary">AI</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/dashboard" className="bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/20 transition-all">Launch Dashboard</Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="px-6 pt-24 pb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 animate-pulse">
            <Sparkles className="w-3 h-3" />
            POWERED BY GEMINI 2.5
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-tight">
            Launch Your Local Business <span className="gradient-text">Instantly.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            LocalBoost AI transforms your simple business idea into a full online presence. Website, marketing, and SEO—all generated in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full h-14 px-8 text-lg font-headline group" asChild>
              <Link href="/dashboard">
                Get Started Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg font-headline">
              View Sample Page
            </Button>
          </div>
        </section>

        <section id="features" className="px-6 py-24 bg-secondary/30">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Instant Generator"
              description="Simply enter your business name and location. We'll handle descriptions, services, and taglines."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-accent" />}
              title="One-Click Website"
              description="A beautiful, mobile-ready landing page generated automatically from your business details."
            />
            <FeatureCard 
              icon={<Rocket className="w-6 h-6 text-primary" />}
              title="Marketing Ready"
              description="Get ready-to-post Instagram captions and WhatsApp messages to start attracting customers today."
            />
          </div>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LocalBoost AI. Built for the future of local commerce.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl glass-morphism border border-white/5 hover:border-primary/50 transition-all group">
      <div className="mb-4 p-3 rounded-xl bg-background/50 inline-block group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
