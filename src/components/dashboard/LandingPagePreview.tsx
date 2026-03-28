import Image from 'next/image';
import { type GenerateLandingPageContentOutput } from "@/ai/flows/generate-landing-page-content";
import { Mail, Phone, MapPin, ChevronRight, Star } from "lucide-react";

export default function LandingPagePreview({ content, businessName }: { content: GenerateLandingPageContentOutput, businessName: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white text-black overflow-hidden shadow-2xl max-w-5xl mx-auto mb-10">
      {/* Mock Browser Header */}
      <div className="bg-neutral-100 px-4 py-2 border-b flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-10">
          <div className="bg-white rounded py-1 px-4 text-[10px] text-neutral-400 border text-center truncate">
            https://{businessName.toLowerCase().replace(/\s+/g, '-')}.localboost.ai
          </div>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[800px] bg-white scrollbar-hide">
        {/* Navigation */}
        <nav className="px-8 py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-neutral-100">
          <div className="font-bold text-xl tracking-tighter text-neutral-900">{businessName}</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <span className="hover:text-black cursor-pointer">About</span>
            <span className="hover:text-black cursor-pointer">Services</span>
            <span className="hover:text-black cursor-pointer">Contact</span>
            <button className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-neutral-800 transition-colors">
              {content.heroSection.callToAction}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative h-[600px] flex items-center px-8 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 leading-[1.1]">
              {content.heroSection.headline}
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              {content.heroSection.subheadline}
            </p>
            <button className="bg-black text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              {content.heroSection.callToAction} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
             <div className="w-full h-full bg-neutral-100 relative overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/business/800/800"
                  alt="Business hero"
                  fill
                  className="object-cover opacity-90"
                  data-ai-hint="modern business"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
             </div>
          </div>
        </section>

        {/* Features / Social Proof */}
        <section className="bg-neutral-50 py-16 px-8 flex flex-wrap justify-center gap-12 border-y border-neutral-100">
          <div className="flex items-center gap-2 text-neutral-400 font-medium">
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
             </div>
             <span>5.0 Rating</span>
          </div>
          <div className="text-neutral-400 font-medium italic">"The best service in town"</div>
          <div className="text-neutral-400 font-medium">Licensed & Insured</div>
        </section>

        {/* About */}
        <section className="py-24 px-8 max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 block">Our Story</span>
          <h2 className="text-4xl font-bold mb-8 text-neutral-900">Dedicated to Excellence</h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-10">
            {content.aboutSection.aboutText}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat label="Clients Served" value="500+" />
            <Stat label="Years Exp." value="12+" />
            <Stat label="Projects" value="1.2k" />
            <Stat label="Awards" value="8" />
          </div>
        </section>

        {/* Services */}
        <section className="py-24 px-8 bg-neutral-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 block">What We Do</span>
                <h2 className="text-4xl font-bold">Premium Services</h2>
              </div>
              <p className="max-w-md text-neutral-400">Tailored solutions designed to meet your specific needs and exceed expectations.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {content.servicesSection.services.map((service, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                    {service.name}
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <span className="text-xs font-bold underline cursor-pointer hover:text-white transition-colors">Learn More</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 px-8 bg-white border-t border-neutral-100">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-neutral-900">Get in Touch</h2>
              <p className="text-neutral-600 mb-10">
                Ready to start your project or have a question? Our team is here to help you every step of the way.
              </p>
              <div className="space-y-6">
                <ContactInfo icon={<Mail className="w-5 h-5 text-neutral-400" />} title="Email" value={content.contactSection.email} />
                <ContactInfo icon={<Phone className="w-5 h-5 text-neutral-400" />} title="Phone" value={content.contactSection.phone} />
                <ContactInfo icon={<MapPin className="w-5 h-5 text-neutral-400" />} title="Address" value={content.contactSection.address} />
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">{content.contactSection.callToAction}</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase">Your Name</label>
                  <input className="w-full bg-white border border-neutral-200 rounded-lg p-3 text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase">Message</label>
                  <textarea className="w-full bg-white border border-neutral-200 rounded-lg p-3 text-sm min-h-[100px]" placeholder="How can we help?" />
                </div>
                <button className="w-full bg-black text-white p-4 rounded-xl text-sm font-bold mt-4 hover:scale-[1.02] transition-transform">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-neutral-100 bg-neutral-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="font-bold text-lg mb-4 text-neutral-900">{businessName}</div>
            <p className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} {businessName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-neutral-900 mb-1">{value}</div>
      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ContactInfo({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">{title}</div>
        <div className="text-neutral-900 font-medium">{value}</div>
      </div>
    </div>
  );
}
