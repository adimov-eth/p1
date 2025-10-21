Perfect—here’s a pure **visual + content** spec (no tech-talk) for **primethailand.golf**. Treat this as the brief for a coding agent with no visual intuition: exact words, sizes, colors, spacing, and states for **every screen element**.

I cite a few standards so the team can verify contrast and Thai-type readability choices without guessing. (WCAG contrast for text/non-text UI; Thai typography notes.) ([W3C][1])

---

# Global Visual System

## Palette (hex)

* **Prime Gold** `#C5A15A` (primary accent; metallic feel)
* **Rich Gold (hover/depth)** `#A88943`
* **Charcoal** `#222426` (primary text)
* **Soft Black** `#0E0F10` (wordmark, header/footer text on light)
* **Off-White** `#FAFAF8` (page background)
* **Cloud** `#F2F2EF` (panels, table header)
* **Line Gray** `#D9D6CF` (dividers, table borders)
* **Success Green** `#2E7D32` (rare badge)
* **Warning Amber** `#D97706` (blackout/notice)
* **Error Red** `#B42318` (form errors)
* **Link Blue** `#0B63C7` (text links only)

**Contrast rules**

* Body text vs. background ≥ 4.5:1; large headings ≥ 3:1. Form borders & icons ≥ 3:1. Validate with any contrast checker. ([W3C][1])

## Typography

* **Wordmark**: custom uppercase “PRIME” (tight tracking) rendered in **Prime Gold** with subtle vertical brushed texture.
* **Headings**: modern, high-legibility serif (optical sizes), strong contrast.

  * H1 48px / 56px, 700
  * H2 36px / 44px, 650
  * H3 28px / 36px, 650
* **Body**: humanist sans that renders Thai + Latin cleanly.

  * Body L: 18px / 30px, 400
  * Body M: 16px / 28px, 400
  * Label S: 14px / 22px, 600
  * **Thai copy** has looser vertical rhythm (line-height ≈ 1.8) to avoid diacritic crowding; never tighten line-height for Thai. ([samui-infotech.com][2])
* **Numerals & prices**: tabular lining where possible for clean alignment.

## Spacing & Grid

* **Spacing unit**: 8px.
* **Column grid**: 12-col; max content width 1160px; margins 24px mobile → 40px tablet → centered on desktop.
* **Card radius**: 16px; **Button radius**: 12px; **Field radius**: 12px.
* **Shadows**:

  * Rest: subtle (y=4, blur=16, alpha 8%)
  * Hover: y=8, blur=24, alpha 10%

## Iconography

* Simple line icons in **Charcoal**; 20px default; 16px in dense tables. Icon + label pairs always 8px apart.

## Photography/graphics

* Use **bright, sunlit course** images (Bangkok/Chonburi). No heavy color casts; keep natural greens.
* Never full-bleed dark photography behind text.
* Decorative gold diagonal line motif (2px) may separate sections.

---

# Global Components (visual spec)

## Header (desktop)

* **Top bar height**: 80px.
* Left: **PRIME** wordmark (Gold) 32px tall; click zone 56px tall; no drop shadow.
* Center nav (16px, 600): Home · Membership · Courses & Coverage · How It Works · Concierge · Events · FAQ

  * Active link: Charcoal text with 2px **Prime Gold** underline, 24px wide (doesn’t span label).
  * Hover: underline fades in (200ms).
* Right utilities: “TH | EN” language toggle (14px, separators as 1px Line Gray), **Primary CTA** “Request Invoice”.
* Header background: **Off-White** with 1px bottom divider **Line Gray**.

**Header (scroll)**

* Compress to 64px height; wordmark scales to 24px; nav font stays 16px; background remains Off-White.

**Mobile header**

* Height 64px. Left wordmark (24px); right hamburger (24px).
* Slide-in menu: full height, background **Off-White**, 24px vertical spacing between items, **Primary CTA** pinned bottom.

## Button styles

* **Primary**: Gold fill, Soft Black text, radius 12px, padding 14px 20px, font 16/600.

  * Hover: **Rich Gold**; small elevation.
  * Focus: 2px Soft Black inner stroke + 2px outer Gold glow (applies to AA/3:1 non-text contrast). ([W3C][3])
  * Disabled: 30% opacity, no shadow.
* **Secondary**: 1px Gold stroke, text Charcoal, transparent fill.

  * Hover: Gold 10% wash background.
* **Text link button**: Link Blue text, underline appears on hover.

## Form fields

* Label (14/600, Charcoal) above field, 8px gap.
* Field: 48px height, 12px radius, 1px **Line Gray** border; on focus, 2px **Prime Gold** border with 3px outward glow; placeholder in 60% Charcoal (not as label).
* Help text (12/regular) below field, 6px spacing.
* Error: border **Error Red** 2px, error text same color; tiny error icon (16px) at left of message.

## Cards

* Background **Cloud**, 16px corner, 24px padding.
* Title 18/600; body 16/regular; optional tiny badge (Success Green, white text, 10/700, 6px radius).

## Sections

* Section vertical rhythm: 80px top & bottom on desktop; 56px tablet; 40px mobile.
* Section headings use H2 with a thin 32px gold marker line to the left (decorative).

## Tables (Courses)

* Header row background **Cloud**, 14/600 labels, 12px padding vertical, 16px horizontal.
* Rows: white background; zebra every other row with **Cloud 60%** tint.
* Dividers: 1px **Line Gray**.
* Hover: row background shifts to **Cloud**; clickable “Request slot” appears as small **Secondary** button at row end.

---

# Page-by-Page Visual & Copy Spec

## 1) Home

### 1.1 Hero (above the fold)

* **Background**: Off-White.
* **Left column (text)** width ~560px:

  * **Headline (H1)**: “**2 seats. 150 rounds. Priority Bangkok access.**” (48/56, 700, Charcoal).
  * **Subline (Body L)**: “**Prime corporate golf membership — green fee covered up to posted ceilings at partner courses.**” (18/30)
  * **CTA Row**:

    * Primary: “Request Invoice”
    * Secondary (outline): “See Covered Courses”
  * **Micro trust line** (12/regular, 60% Charcoal): “Bangkok concierge • Weekend allocations • Corporate invoicing”
* **Right column (image)**: 520×360 image crop of a bright Bangkok course fairway; slight 8px radius; thin 1px **Line Gray** keyline.

**Hero spacing**: 40px between headline/subline; 24px between subline/CTAs; 16px to trust line.

### 1.2 Trust strip (logos)

* Background **Cloud**; 24px padding; horizontally laid out 6 monochrome partner logos at 70% Charcoal image tint.
* Label (centered, 12/600): “Selected Bangkok partners & services”.

> Visual reference: Pacific Links Thailand uses bold, simple claims and large, airy hero areas. Keep ours bright on white, not dark, with explicit copy. ([pacificlinksthailand.com][4])

### 1.3 Value cards (3-up)

* Three cards in a row.

  1. **“Two named seats + guesting”**

     * Icon: two user silhouettes
     * Body: “Assign to executives and invite guests as needed.”
  2. **“150 shared credits/year”**

     * Body: “Weekday uses 1 credit; weekend/holiday 1.5 credits.”
  3. **“Concierge in 2 hours”**

     * Body: “Bangkok desk confirms or offers alternates within 2 hours.”
* Each card has a small gold top rule (2px, 40px wide) for rhythm.

### 1.4 Comparison snapshot (simple table)

* Two columns: **Prime** vs **Ad-hoc booking**.
* Rows (5): Access, Weekend priority, Admin controls, Invoice support, Predictable cost.
* Prime column cells show **check icons** in Success Green; the other column uses muted dashes.
* Caption (12/regular): “At a glance vs. typical one-off booking.”

### 1.5 Courses spotlight (carousel feel, but static on mobile)

* Horizontal row of 6 **Course tiles** (see component below); each shows **Course Name**, “Prime ceiling THB X”, “Cart & caddie paid at course”.
* Link under row (Link Blue): “View all courses & coverage →”.

### 1.6 Testimonial band

* Background **Off-White**; two quotes at once (cards).
* Quote text 18/30 italic; name + role 14/600; company logo monochrome at 60% opacity.

### 1.7 Final CTA band

* Background **Cloud**.
* H3: “Ready to onboard your executives?”
* Buttons: **Request Invoice** (primary) + **Talk to concierge** (secondary).

---

## 2) Membership (single plan)

### 2.1 Plan header

* H1: “**Prime Corporate — 700,000 THB / year**”
* Sub: “Two named seats, 150 shared credits. Green fee covered up to posted course ceilings.”
* Badge (Success Green): “Founding cohort available”

### 2.2 Plan content (two columns)

**Left column (Plan card, sticky)**

* Card on **Cloud** background, 16px radius, 24px padding.
* Bulleted list (16px):

  * **2 named seats**
  * **150 round credits** (weekday 1.0; weekend/holiday 1.5)
  * **Green fee covered** up to posted ceiling per course
  * **Cart & caddie not included** (paid at course)
  * **Weekend allocations**: 2 guaranteed slots per seat/month (booking horizon applies)
  * **Seat reassignment**: 2×/year
  * **Usage statement**: annual, for finance
* Button stack: Primary “Request Invoice”, Secondary “Talk to Concierge”.

**Right column (Details)**

* **Included** (check icon list) vs **Not included** (dash icon list).
* Small **notice** panel (Warning Amber left border):

  * Title: “Blackout dates & fair-use”
  * Body: “Published per course 60 days ahead. No-show within 48h deducts 0.5 credit.”

**FAQ preview** (accordion of 4):

* “How do credits work?”
* “What’s the weekend rule?”
* “Can we change seat holders?”
* “Do you invoice companies?”

---

## 3) Courses & Coverage

### 3.1 Intro

* H1: “**Courses & Coverage**”
* Body: “Prime covers the **green fee** up to the posted ceiling at each partner course. Members pay **cart & caddie** at the course.”

### 3.2 Filter bar (panel)

* Background **Cloud**, 12px radius, 16px padding.
* Left to right:

  * **Search** (placeholder: “Search course or area”)
  * **Area** dropdown (Bangkok, Chonburi, Pathum Thani, etc.)
  * **Day type** toggle (Weekday / Weekend)
  * **Only show flagship** (checkbox)
* Tiny legend (12px, 60% Charcoal): “Ceiling = max green fee Prime covers.”

### 3.3 Data table (6 columns)

* Columns (left→right):

  1. **Course** (course name; secondary line: area)
  2. **Prime ceiling (THB)**
  3. **Booking window** (e.g., “up to 14 days”)
  4. **Weekend quota** (e.g., “limited”)
  5. **Notes** (e.g., “cart required, dress code strict”)
  6. **Action** (small **Request slot** Secondary button)

* **Row example** (copy):

  * **Nikanti Golf Club** — Nakhon Pathom

    * Ceiling: **5,500**
    * Window: **14 days**
    * Weekend quota: **limited**
    * Notes: “All-inclusive course pricing; meals included by venue policy.”
    * [Request slot]

  > Use Nikanti as a recognizable Bangkok-area flagship; public materials often note its all-inclusive experience. Keep our page factual and neutral. ([Nikanti Golf Club][5])

* **Pagination**: page numbers centered below; 8px rounded chips; active chip Gold fill.

### 3.4 Disclosure strip

* 12px text in 60% Charcoal: “Information is indicative; course policies may apply. See Blackout Calendar.”

---

## 4) How It Works

### 4.1 Steps (3 cards, numbered circles)

* **1. Join** — “Onboard your two named executives.”
* **2. Book** — “Message concierge; we confirm within 2 hours.”
* **3. Play** — “Weekday = 1 credit; weekend/holiday = 1.5 credits.”

Cards show large circled numbers in Gold, 40px, with a thin 2px ring.

### 4.2 Credit explainer panel

* Split layout with a **simple diagram**: three horizontal tickets labeled “Weekday 1.0”, “Weekend 1.5”, “No-show 0.5”.
* Text next to it: concise rules in 16px bullets.

### 4.3 Policies (accordion)

* **Booking SLA** (2h confirm or alternate)
* **Blackout calendar** (link to PDF/section)
* **Guesting rules** (weekday guesting, weekend limits)
* **Seat reassignment** (2×/year)

Accordion chevrons are 16px Gold outlines; rotate on open; section background **Cloud** for the open item.

---

## 5) Concierge

### 5.1 Contact hero

* Two-column; left text, right a neat photo of a concierge desk in Bangkok.
* H1: “**Your Bangkok concierge**”
* Sub: “Replies in under 2 hours, 7 days a week.”

### 5.2 Contact blocks (cards)

* **Line**: icon, “Add on Line”, small ID handle
* **WhatsApp**: icon, “Message us”
* **Phone**: +66 …
* **Email**: [concierge@primethailand.golf](mailto:concierge@primethailand.golf)
  Each card uses 16px padding; icon left, bold label, 12px helper line beneath.

### 5.3 Short form

* Fields: Name, Company, Phone, Preferred channel (Line/WhatsApp/Email), Message (multi-line).
* Submit button: **Request callback** (Primary).
* **Privacy microcopy** beneath (12px): “We use your details to respond to your request. See PDPA notice.”

---

## 6) Events

### 6.1 Grid

* 3-up on desktop; card for each event:

  * Date badge (Gold pill, white text, 12/700): “FRI 12 DEC”
  * Title (18/700)
  * Venue (14/600, 70% Charcoal)
  * Body (14/regular, 60% Charcoal)
  * CTA: “RSVP” (Secondary)
* Past events gallery below (thumbnails, 1px keylines).

---

## 7) FAQ

### 7.1 Title & intro

* H1: “**Frequently asked questions**”
* Body: “If it’s not here, ask the concierge.”

### 7.2 Accordions (visual)

* Closed items show 16px bold title, 1px divider.
* Open item gains **Cloud** background, 16px padding, answer in 16px body.
* Include at least 10 items grouped by **Membership**, **Courses**, **Billing**, **Admin**, **Operations**.

---

## 8) Footer

### 8.1 Upper footer

* Four columns:

  1. **PRIME** wordmark + one-sentence positioning (14px): “Corporate golf membership for Thai executives.”
  2. **Explore**: Home, Membership, Courses & Coverage, How It Works, Concierge, Events, FAQ
  3. **Company**: About, PDPA & Privacy, Terms
  4. **Contact**: address (Bangkok), phone, email, Line/WhatsApp icons (monochrome)

* Background **Off-White** with a top 1px **Line Gray** rule; text in Charcoal.

### 8.2 Lower footer

* Single row: © YEAR Prime Thailand Golf Co., Ltd. • Company registration no. … • TH | EN
* Font: 12/regular, 60% Charcoal.

---

# Component Library (content + appearance)

## Course Tile (used on Home and Courses overview)

* 280×180 image (course), 12px radius, 1px keyline.
* Beneath image:

  * Course name (16/700), area (12/600, 60% Charcoal)
  * Small detail line (12/regular): “Prime ceiling **THB 5,500** • Cart & caddie paid at course”
* Hover: image scales 1.02; tile lifts slightly; underline appears under course name.

## Language Toggle

* “TH | EN” with middle pipe divider; active language is Charcoal; inactive is 50% Charcoal; on hover both full Charcoal; click target 32×32.

## Notification Banner (rare)

* Full-width band with **Warning Amber** left border 4px; background 10% Amber.
* Title (14/700): “High seasonal demand”
* Body (14/regular): “Weekend allocations fill quickly in December.”

## Badges

* **Flagship** (Success Green background, white 12/700, 8px radius)
* **Limited** (Warning Amber outline, text Amber)

---

# Microcopy (verbatim text to use)

* **Primary CTAs**: “Request Invoice”, “Talk to concierge”, “Request slot”, “RSVP”
* **Labels**: Name, Company, Phone, Preferred channel, Message
* **Placeholders**:

  * Search: “Search course or area”
  * Phone: “+66 …”
* **Helper text**:

  * “Cart & caddie paid at course.”
  * “Weekend/holiday rounds use 1.5 credits.”
  * “We reply in under 2 hours.”

---

# States & Interactions (visual only)

* **Hover (links)**: underline animates in from left; color stays Link Blue.

* **Focus (keyboard)**: visible 2px outline (Soft Black) outside element + 2px Gold glow—meets ≥3:1 for interactive non-text UI. ([W3C][3])

* **Active (buttons)**: pressed state drops shadow, darkens by 6% (use Rich Gold).

* **Disabled**: 30% opacity; keep label color legible against background.

* **Form validation**:

  * Error inline under field; red icon 16px; short message (“Enter a valid phone number”).
  * Success (rare): green check icon 16px; “Looks good.”
  * Required fields show a subtle gold dot (•) after label.

* **Empty states** (Courses filter):

  * Illustration: thin outline flag + magnifier
  * Title: “No courses match those filters”
  * Body: “Clear filters or search a different area.”
  * Action: “Clear filters” (Secondary)

* **Loading shimmer**: light gray shimmer bars over cards and table rows; 8px radius; 1200ms cycle.

---

# Accessibility Visual Rules (enforced visually)

* Never place text over photographic areas with < 4.5:1 contrast; if unavoidable, add a translucent Off-White scrim 70–85%. ([W3C][1])
* Form inputs must have **visible** boundaries (≥3:1) even without hover/focus. ([W3C][3])
* Thai body text keeps generous line-height (≈1.8); avoid cramped vertical rhythm and clipping marks. ([samui-infotech.com][2])
* Icon-only buttons always include an adjacent visible label on desktop; on mobile, provide tooltip text on long-press.

---

# 404 & System Pages (brief)

## 404

* Large “404” in Charcoal; subline: “This page has gone golfing.”
* Button: “Back to Home” (Primary)

## Success (Invoice request)

* Checkmark illustration in Gold; title: “Thanks — we’ll contact you shortly.”
* Body: “Expect a reply within 2 hours.”

---

# Competitive Tone Guardrail (visual)

Pacific Links Thailand leans on **bold hero slogans** and a broad network claim (“1,000+ courses”). We stay **clean, white, and explicit** about the offer (2 seats, 150 rounds, ceilings) with **named, legible tables** and clear trust signals (Bangkok concierge, weekend allocations, invoicing). Keep claims **short and visible**—no dense paragraphs. ([pacificlinksthailand.com][4])

# Trust Signals to Render (visual only)

* Monochrome logos of partners in a neat strip.
* Short testimonial cards with executive names/titles.
* Contact info fully spelled out in the footer (address, phone, email, messaging) — a known credibility boost for B2B sites. ([Nielsen Norman Group][6])

---

## Deliverables for the coding agent (all visual/content, no tech choices)

1. **Header & Nav** exactly as above (80px tall, white, gold accents, sticky reduced state).
2. **Home** hero with the **exact headline and subline** provided and CTAs labeled precisely.
3. **Value cards**, **comparison snapshot**, **course tiles** with the given copy and measurements.
4. **Membership** page with the single plan card + bullets verbatim, plus the amber notice block.
5. **Courses & Coverage** table with the 6 named columns, filter bar visuals, row hover visuals, and the Nikanti sample row.
6. **How It Works** step cards + credit ticket diagram styling.
7. **Concierge** contact cards + short form with labels/placeholders exactly as written.
8. **Events** grid, **FAQ** accordions, **Footer** columns, and **system pages** (404/Success).
9. **All states**: hover, focus, active, disabled; error visuals as described.
10. **Accessibility visuals** and **Thai typography line-height** honored.

If you want, I can turn this into a pixel-perfect redline PDF with measured margins and a content inventory spreadsheet next.

[1]: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html?utm_source=chatgpt.com "Understanding Success Criterion 1.4.3: Contrast (Minimum)"
[2]: https://www.samui-infotech.com/the-importance-of-thai-typography-in-web-design/?utm_source=chatgpt.com "Mastering Thai Fonts and Typography in Web Design"
[3]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html?utm_source=chatgpt.com "Understanding Success Criterion 1.4.11: Non-text Contrast"
[4]: https://www.pacificlinksthailand.com/?utm_source=chatgpt.com "Pacific Links Thailand"
[5]: https://www.nikantigolfclub.com/?utm_source=chatgpt.com "Nikanti Golf Club - Most Unique Golf Course in Thailand"
[6]: https://www.nngroup.com/articles/trustworthy-design/?utm_source=chatgpt.com "Trustworthiness in Web Design: 4 Credibility Factors"
