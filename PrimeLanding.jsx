import React from 'react';
import { CheckCircle } from 'lucide-react';

/*
 * PrimeLanding component
 *
 * This component composes a full landing page for the Prime Corporate Golf
 * Club. It uses Tailwind CSS utility classes together with the colour
 * palette defined in global.css to create a cohesive, premium look that
 * aligns with the deep navy and gold branding. The page includes:
 *   - A hero section with a dark gradient background and a membership card
 *     image on the right.
 *   - A stats section highlighting key membership metrics.
 *   - A features section with icons describing the core benefits.
 *   - A pricing section summarising the membership price and inclusions.
 *   - A final call‑to‑action prompting visitors to join.
 */

const stats = [
  { title: '80+', subtitle: 'Premium golf courses' },
  { title: '144', subtitle: 'Rounds per year' },
  { title: '2+6', subtitle: 'Members & guests' },
  { title: '24/7', subtitle: 'Concierge service' },
];

const features = [
  {
    title: 'Exclusive Access',
    description: 'Play at over 80 premier courses across Thailand with reserved tee times.',
    icon: CheckCircle,
  },
  {
    title: 'Corporate Hospitality',
    description: 'Transform the golf course into your boardroom and strengthen relationships.',
    icon: CheckCircle,
  },
  {
    title: 'Concierge & Travel',
    description: 'Dedicated concierge handles booking, travel arrangements and special requests.',
    icon: CheckCircle,
  },
];

function PrimeLanding() {
  return (
    <div className="bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1A2D] via-[#112240] to-black opacity-80"></div>
        <div className="relative container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Experience Thailand’s Ultimate Corporate Golf Membership
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Unlock access to over 80 premier courses across Thailand, with 144 prepaid rounds, concierge booking, and VIP hospitality for your executive team and clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition">
                Join Now
              </button>
              <button className="inline-flex items-center rounded-xl border border-primary px-6 py-3 text-primary hover:bg-primary/10 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <img
              src="/assets/golf-card.jpg"
              alt="Prime Corporate Golf Card"
              className="w-80 h-auto rounded-2xl shadow-2xl ring-1 ring-primary/50"
            />
          </div>
        </div>
        {/* Decorative gradient highlight */}
        <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-brand opacity-20 filter blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{item.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Prime</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-lg shadow-black/20 hover:shadow-xl transition"
                >
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Membership Pricing</h2>
          <div className="max-w-md w-full bg-background border border-border rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Prime Corporate Golf Club</h3>
            <p className="text-5xl font-bold text-primary mb-2">฿949,000</p>
            <p className="text-sm text-muted-foreground mb-6">per year</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1" />
                <span>144 rounds of golf each year (green fee, caddie and cart included)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1" />
                <span>2 named members plus up to 6 guests on each booking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1" />
                <span>Concierge booking with LINE Mini‑App and NFC check‑in</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1" />
                <span>Exclusive corporate hospitality & networking events</span>
              </li>
            </ul>
            <button className="w-full inline-flex justify-center items-center rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition">
              Become a Member
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Business on the Fairway?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join Prime Corporate Golf Club today and transform your relationships, rewards and partnerships through golf.
          </p>
          <button className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default PrimeLanding;