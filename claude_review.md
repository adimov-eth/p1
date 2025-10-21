After analyzing all your HTML files, I've identified distinct layout patterns and page types. Here's a comprehensive website architecture using Astro:

## Layout Analysis

You have **3 distinct design systems**:

1. **Dark Premium Theme** (Primary - 11 files)
   - Navy/gold color scheme with Kanit font
   - Used for: member portal, internal tools, premium content

2. **Light Professional Theme** (2 files) 
   - Clean, corporate look with Inter font
   - Used for: public-facing terms & pricing

3. **Marketing Materials** (4 files)
   - Sales presentations, booklets
   - Need complete redesign for web

## Proposed Astro Architecture

```
src/
├── layouts/
│   ├── BaseLayout.astro          # Shared HTML structure
│   ├── DarkLayout.astro          # Premium member experience
│   ├── LightLayout.astro         # Public/corporate facing
│   └── DashboardLayout.astro     # Internal tools with sidebar
│
├── components/
│   ├── navigation/
│   │   ├── NavBar.astro          # Main navigation
│   │   ├── MemberNav.astro       # Member portal nav
│   │   └── Sidebar.astro         # Dashboard sidebar
│   ├── ui/
│   │   ├── Accordion.astro
│   │   ├── ProgressBar.astro
│   │   ├── PricingCard.astro
│   │   ├── Timeline.astro
│   │   └── WorkflowStep.astro
│   └── sections/
│       ├── Hero.astro
│       ├── Features.astro
│       └── CTASection.astro
│
├── pages/
│   ├── index.astro                # New homepage
│   ├── about.astro                # New about page
│   ├── pricing.astro              # Public pricing
│   ├── contact.astro             # New contact
│   │
│   ├── member/                    # 🔒 Protected area
│   │   ├── dashboard.astro
│   │   ├── bookings.astro
│   │   ├── welcome-package.astro
│   │   └── merchandise.astro
│   │
│   ├── corporate/                 # Corporate info
│   │   ├── terms.astro
│   │   ├── privacy.astro
│   │   └── agreement.astro
│   │
│   └── internal/                  # 🔒 Staff only
│       ├── concierge-manual.astro
│       ├── launch-checklist.astro
│       ├── financial-ops.astro
│       ├── outreach.astro
│       └── uat.astro
│
└── styles/
    ├── global.css                 # Base styles
    ├── dark-theme.css            # Premium theme
    └── light-theme.css           # Corporate theme
```

## Complete Website Structure

### **Public Website** (New pages needed)
```astro
---
// src/pages/index.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from '@/components/sections/Hero.astro';
import Features from '@/components/sections/Features.astro';
---

<BaseLayout title="Prime Corporate Golf Club - Thailand's Premier Golf Membership">
  <Hero 
    headline="Elevate Your Business on the Course"
    subheadline="150 rounds. 80+ courses. Unlimited possibilities."
    cta="Join Founders Circle"
    image="/hero-golf.jpg"
  />
  
  <Features items={[
    { icon: "golf", title: "80+ Premium Courses", desc: "Access Thailand's finest golf destinations" },
    { icon: "concierge", title: "Personal Concierge", desc: "White-glove service for every round" },
    { icon: "network", title: "Executive Network", desc: "Connect with C-suite leaders" }
  ]} />
  
  <!-- More sections -->
</BaseLayout>
```

### **Layout Components**

```astro
---
// src/layouts/DarkLayout.astro
export interface Props {
  title: string;
  requiresAuth?: boolean;
}

const { title, requiresAuth = false } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} - Prime Golf Club</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand-navy-dark: #0D1A2D;
      --brand-navy-light: #112240;
      --brand-gold: #C9B079;
      --brand-text-light: #E0E0E0;
      --brand-text-gray: #a0aec0;
    }
  </style>
</head>
<body class="bg-[--brand-navy-dark] text-[--brand-text-light] font-kanit">
  {requiresAuth && <MemberNav />}
  <slot />
</body>
</html>
```

### **Unified Data Store**

```typescript
// src/data/config.ts
export const membership = {
  tiers: {
    founders: {
      name: "Founders' Circle",
      price: 750_000,
      rounds: 156,
      slots: 10,
      benefits: [
        "฿200,000 savings",
        "12 bonus rounds",
        "Founders' Cup invite",
        "Premium welcome kit"
      ]
    },
    earlyAdopter: {
      name: "Early Adopter",
      price: 850_000,
      rounds: 144,
      slots: 15
    },
    standard: {
      name: "Standard",
      price: 950_000,
      rounds: 144,
      slots: null
    }
  },
  
  features: {
    users: 2,
    guestsPerUser: 3,
    transferFee: 5_000,
    cancellationWindow: 48
  }
};

export const courses = {
  flagship: [
    { name: "Siam Country Club, Old Course", location: "Pattaya", tier: "championship" },
    { name: "Black Mountain Golf Club", location: "Hua Hin", tier: "championship" },
    // ... all 80+ courses
  ]
};
```

### **Page Routing Structure**

| URL Path | Purpose | Layout | Auth |
|----------|---------|--------|------|
| `/` | Homepage | Light | No |
| `/pricing` | Public pricing | Light | No |
| `/about` | Company info | Light | No |
| `/contact` | Contact form | Light | No |
| `/member/*` | Member portal | Dark | Yes |
| `/member/dashboard` | Member home | Dark | Yes |
| `/corporate/terms` | Legal terms | Light | No |
| `/corporate/privacy` | Privacy policy | Light | No |
| `/internal/*` | Staff tools | Dashboard | Staff |

### **Missing Pages to Create**

1. **Homepage** - Professional landing page
2. **About** - Company story, team, mission
3. **Contact** - Contact form with concierge info
4. **Member Dashboard** - Personalized member home
5. **Booking System** - Tee time booking interface
6. **Course Directory** - Browse all 80+ courses
7. **Member Login** - Authentication page
8. **404 Page** - Error page


Looking at your existing landing page, I can see it's well-structured but needs significant updates based on your market intelligence and refined positioning. Here are the key changes needed:

## Critical Content Updates

### 1. **Fix Core Value Proposition**
Your current page states:
- ฿349/month subscription
- 80% cost savings
- Access to 100+ courses

Based on your market research and other materials:
- **Remove subscription model** - It's ฿750,000-950,000 annual membership
- **Change to 80+ courses** (not 100+)
- **Focus on 144-156 rounds annually**
- **Emphasize it's for corporations buying 2 seats**

### 2. **Reposition Target Audience**

**Current:** Individual golfers
**Should be:** Corporate decision-makers in EEC/Rayong area

```html
<!-- Replace current hero -->
<section class="hero">
  <h1>Thailand's Premier Corporate Golf Membership</h1>
  <p>Transform client relationships on Thailand's finest courses</p>
  <div class="value-props">
    <div>฿750,000 Founders Rate</div>
    <div>156 Rounds Annually</div>
    <div>2 Executive Seats</div>
  </div>
</section>
```

### 3. **Update Key Sections**

**Remove/Replace:**
- "Save 80% on Green Fees" → "All-Inclusive Golf Experience"
- Subscription pricing table → Membership tiers (Founders/Early/Standard)
- Individual testimonials → Corporate client focus

**Add:**
- Founders' Circle urgency (only 10 spots)
- 48-hour cancellation policy
- Personal concierge service emphasis
- Partnership with 80+ premium courses

### 4. **Fix Technical Details**

```javascript
// Current incorrect calculation
const regularCost = 3500 * 24; // Wrong model

// Should be
const membershipValue = {
  rounds: 156,
  avgGreenFee: 4500,
  totalValue: 702000,
  membershipCost: 750000,
  additionalBenefits: ['concierge', 'guests', 'network']
};
```

### 5. **New Information Architecture**

```html
<!-- Proposed structure -->
<body>
  <!-- 1. Hero: Corporate positioning -->
  <section id="hero">
    <h1>Elevate Your Business Relationships</h1>
    <p>Prime Corporate Golf Club • Founding Members Now Enrolling</p>
  </section>

  <!-- 2. Problem/Solution -->
  <section id="solution">
    <h2>Beyond Traditional Entertainment</h2>
    <p>Stop managing multiple course memberships. One membership, 80+ venues.</p>
  </section>

  <!-- 3. Membership Tiers -->
  <section id="membership">
    <!-- Founders: ฿750k - 10 spots -->
    <!-- Early: ฿850k - 15 spots -->
    <!-- Standard: ฿950k -->
  </section>

  <!-- 4. Key Features -->
  <section id="features">
    <div>Personal Concierge</div>
    <div>LINE Mini-App</div>
    <div>Guest Privileges</div>
    <div>Corporate Billing</div>
  </section>

  <!-- 5. Course Showcase -->
  <section id="courses">
    <!-- Feature top 10 championship courses -->
    <!-- Siam Country Club, Black Mountain, etc. -->
  </section>

  <!-- 6. Target Companies -->
  <section id="ideal-for">
    <h2>Designed for Thailand's Leading Corporations</h2>
    <!-- Automotive, Petrochemical, Financial, Law Firms -->
  </section>

  <!-- 7. Founders Event CTA -->
  <section id="event">
    <h2>The Founders' Circle Invitational</h2>
    <p>Exclusive preview event at Siam Country Club</p>
    <button>Request Invitation</button>
  </section>
</body>
```

### 6. **Specific Copy Changes**

**Current FAQ:** "Is there a minimum commitment?"
**Update to:** "What is the membership term?" → "12-month annual membership"

**Current:** "Can I share with family?"
**Update to:** "Can I change designated users?" → "Yes, ฿5,000 transfer fee"

**Add FAQs:**
- "What's included in the membership?"
- "Which courses are available?"
- "How does corporate billing work?"

### 7. **Visual/Design Updates**

- Change gradient from green to navy/gold (your brand colors)
- Add corporate/professional imagery (less casual golf)
- Include logos of partner courses
- Add trust signals (partnership badges, corporate clients)

### 8. **Call-to-Action Strategy**

**Primary CTA:** "Join Founders Circle" (not "Start Free Trial")
**Secondary:** "Schedule Consultation"
**Tertiary:** "Download Executive Brief"
