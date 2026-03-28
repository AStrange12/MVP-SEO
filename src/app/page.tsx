
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Zap, Globe, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-24 text-center max-w-5xl mx-auto overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[150px] -z-10 rounded-full"
          />
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span className="tracking-widest uppercase">The Future of Local Business</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-headline font-bold mb-8 leading-[1.05] tracking-tight"
          >
            Launch Your Presence <br />
            <span className="gradient-text">At Light Speed.</span>
          </h1 >
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            LocalBoost AI engine architected to transform simple ideas into professional online identities. Web, SEO, and Marketing—automated instantly.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button size="lg" className="rounded-full h-16 px-10 text-xl font-headline group bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300" asChild>
              <Link href="/dashboard" className="flex items-center gap-3">
                Deploy Now <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-16 px-10 text-xl font-headline border-white/10 hover:bg-white/5 backdrop-blur-md" asChild>
              <Link href="/signup">Experience Demo</Link>
            </Button>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section id="features" className="px-6 py-32 relative">
          <div className="absolute inset-0 bg-secondary/10 -skew-y-3 -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <FeatureCard 
                icon={<Zap className="w-8 h-8 text-primary" />}
                title="Instant Generator"
                description="Our neural architecture handles descriptions, services, and branding in milliseconds."
                delay={0.1}
              />
              <FeatureCard 
                icon={<Globe className="w-8 h-8 text-accent" />}
                title="Cloud Deployment"
                description="High-performance, edge-optimized landing pages deployed to the global CDN automatically."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Rocket className="w-8 h-8 text-primary" />}
                title="Marketing Hub"
                description="Social content and promotional assets generated with your brand's unique voice."
                delay={0.3}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto glass-card p-16 rounded-[3rem] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Ready to lead your local market?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join the next generation of local businesses scaling with intelligence.</p>
            <Button size="lg" className="rounded-full h-14 px-8 group" asChild>
              <Link href="/signup">
                Get Started for Free <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-white/5 text-center text-sm text-muted-foreground bg-black/20 backdrop-blur-md">
        <p className="font-light tracking-widest uppercase">&copy; {new Date().getFullYear()} LocalBoost AI. Built for the high-end future.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
      className="p-10 rounded-3xl glass-card relative group cursor-default h-full flex flex-col"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-block group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-lg font-light">{description}</p>
      
      <div className="mt-auto pt-8 flex items-center text-primary font-bold text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
        Learn more <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </motion.div>
  );
}
