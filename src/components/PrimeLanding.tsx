import bgImage from '@/assets/bg2.png';
import { PlasticCard } from '@/components/PlasticCard';
import { Button } from '@/components/ui/button';
import { Calendar, Globe, Headphones, Star, Trophy, Users } from 'lucide-react';
import * as React from 'react';

export function PrimeLanding() {
  const cardsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.getElementsByClassName('feature-card');
      for (const card of Array.from(cards)) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const cardsElement = cardsRef.current;
    if (cardsElement) {
      cardsElement.addEventListener('mousemove', handleMouseMove);
      return () => cardsElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Trophy className="size-6 text-primary" />
            <h1 className="text-xl font-bold tracking-widest">Prime</h1>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#membership" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              Membership
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </a>
            <Button size="sm" className="ml-4 shadow-sm hover:shadow-md hover:scale-105 transition-all">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 pt-32 lg:py-32">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-background/85 via-background/70 to-background/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <h1 className="animate-appear text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  <span className="text-foreground">
                    Prime
                  </span>
                  <br />
                  <span className="text-foreground">
                    Golf Club
                  </span>
                </h1>
                <p className="animate-appear mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground sm:text-2xl lg:mx-0" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
                  Experience excellence in corporate golf memberships. Where business meets leisure at the finest courses.
                </p>
              </div>

              <div className="animate-appear flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                <Button size="lg" className="text-base h-12 px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Apply for Membership
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8 hover:bg-accent hover:scale-105 transition-all">
                  View Benefits
                </Button>
              </div>

              {/* Stats */}
              <div className="animate-appear grid grid-cols-3 gap-8 pt-12 border-t border-primary/20" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary lg:text-5xl">80+</div>
                  <div className="text-sm text-muted-foreground lg:text-base">Championship Courses</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary lg:text-5xl">2,500+</div>
                  <div className="text-sm text-muted-foreground lg:text-base">Active Members</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary lg:text-5xl">24/7</div>
                  <div className="text-sm text-muted-foreground lg:text-base">Concierge Service</div>
                </div>
              </div>
            </div>

            {/* Card Display */}
            <div className="animate-appear flex justify-center lg:justify-end" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="space-y-6">
                <PlasticCard
                  cardNumber="•••• •••• •••• 8472"
                  cardHolder="PLATINUM MEMBER"
                  expiryDate="12/28"
                  variant="gold"
                />
                <p className="text-center text-sm text-muted-foreground lg:text-base">
                  Platinum membership card with exclusive access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#benefits"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
        >
          <svg
            className="size-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </section>

      {/* Features Section */}
      <section id="benefits" className="py-24 px-4 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Membership Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elevate your corporate golf experience with comprehensive benefits designed for excellence
            </p>
          </div>
          <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Premium Access',
                description: 'Unlimited access to 50+ championship golf courses worldwide',
              },
              {
                icon: Calendar,
                title: 'Priority Booking',
                description: 'Guaranteed tee times and preferred booking windows',
              },
              {
                icon: Headphones,
                title: 'Concierge Service',
                description: '24/7 dedicated support for all your golfing needs',
              },
              {
                icon: Star,
                title: 'Exclusive Events',
                description: 'Access to member-only tournaments and networking events',
              },
              {
                icon: Users,
                title: 'Corporate Packages',
                description: 'Tailored solutions for team building and client entertainment',
              },
              {
                icon: Trophy,
                title: 'Performance Tracking',
                description: 'Advanced analytics and coaching to improve your game',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative rounded-2xl border border-border/50 bg-[#1a2332] p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:rotate-3">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Courses Section */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Flagship Partner Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience Thailand's most prestigious championship golf courses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Siam Country Club",
                variants: "Old Course · Plantation · Waterside",
                description: "Three world-class championship layouts featuring challenging terrain and stunning lake views",
                location: "Pattaya",
              },
              {
                name: "Amata Spring Country Club",
                variants: "Championship Course",
                description: "Award-winning Robert Trent Jones Jr. design with pristine conditions year-round",
                location: "Chonburi",
              },
              {
                name: "Chee Chan Golf Resort",
                variants: "Mountain Course",
                description: "Dramatic mountain backdrop with strategic water features and championship facilities",
                location: "Pattaya",
              },
              {
                name: "Nikanti Golf Club",
                variants: "Nicklaus Design",
                description: "Jack Nicklaus signature course offering an exclusive members-only experience",
                location: "Phuket",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/20 bg-[#1a2332] p-8 shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Subtle background accent */}
                <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl -z-10 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10 animate-pulse" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-sm text-primary/80 font-medium mb-3">
                      {course.variants}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="size-4 flex-shrink-0" />
                      <span className="leading-tight">{course.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Plus 80+ additional championship courses across Thailand
            </p>
            <Button variant="outline" size="lg" className="hover:scale-105 hover:bg-primary/10 transition-all">
              View All Partner Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="membership" className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Membership Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One comprehensive membership for your corporate golf needs
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-2xl border border-primary/30 bg-[#1a2332] p-12 shadow-2xl ring-1 ring-primary/20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Corporate Membership</h3>
                <p className="text-muted-foreground mb-6">
                  Exclusive access to Thailand's premier golf courses
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-primary" style={{ textShadow: '0 0 30px rgba(201, 162, 78, 0.3)' }}>฿950,000</span>
                    <span className="text-xl text-muted-foreground">/year</span>
                  </div>
                  <span className="text-sm text-muted-foreground">+ VAT</span>
                </div>
              </div>

              <ul className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "144 annual rounds included",
                  "2 registered corporate users",
                  "80+ championship courses",
                  "Guest privileges (up to 6)",
                  "All-inclusive (green fee, caddy, cart)",
                  "Dedicated personal concierge",
                  "48-hour cancellation policy",
                  "Full digital app access",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="size-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="w-full text-base h-12">
                Apply for Membership
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from executives who've elevated their corporate golf experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Prime has transformed how we approach client entertainment. The seamless booking and exceptional course access have been game-changing.",
                author: "Michael Chen",
                title: "CEO, TechVentures Inc.",
                rating: 5,
              },
              {
                quote: "The concierge service is impeccable. They've anticipated every need and consistently exceeded our expectations for corporate events.",
                author: "Sarah Williams",
                title: "VP of Operations, GlobalCorp",
                rating: 5,
              },
              {
                quote: "From tee times to tournament hosting, Prime delivers a level of service that truly reflects well on our brand. Absolutely worth it.",
                author: "David Martinez",
                title: "Managing Partner, Summit Capital",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/20 bg-[#1a2332] p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30"
              >
                {/* Quote icon */}
                <div className="mb-4 text-primary/30">
                  <svg className="size-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary drop-shadow-[0_0_8px_rgba(201,162,78,0.4)]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-muted-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-border/50 pt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#1a2332] border border-primary/30 p-12 text-center shadow-2xl">
            {/* Subtle gold accent line with shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-[shimmer_2s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }} />
            </div>

            <div className="relative space-y-6">
              <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
                Ready to Join Prime?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the pinnacle of corporate golf membership. Apply today and elevate your game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="text-base h-12 px-8 hover:scale-105 transition-transform">
                  Apply for Membership
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8 hover:scale-105 hover:bg-primary/10 transition-all">
                  Schedule a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-16 px-4 bg-muted/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <Trophy className="size-7 text-primary" />
                <span className="text-2xl font-bold">Prime Golf</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Thailand's premier corporate golf membership
              </p>
              <div className="flex gap-4 pt-2">
                {/* Social icons placeholder */}
                <a href="#" className="size-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:rotate-6 transition-all duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="size-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:rotate-6 transition-all duration-300" style={{ transitionDelay: '50ms' }}>
                  <span className="sr-only">Twitter</span>
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Courses</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Membership</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors">Benefits</a></li>
                <li><a href="#membership" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Apply</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Member Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 Prime Corporate Golf Club. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-all duration-300">Privacy</a>
              <a href="#" className="hover:text-primary transition-all duration-300" style={{ transitionDelay: '50ms' }}>Terms</a>
              <a href="#" className="hover:text-primary transition-all duration-300" style={{ transitionDelay: '100ms' }}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
