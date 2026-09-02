export const benefits = [
  "Clear visual demos, from starting position to full execution",
  "Ready-to-follow sets, reps, and rest times for every movement",
  "Smart 3-phase progression: Foundation, Growth, and Intensity",
  "Form and safety guidance built into every session",
];

export const galleryGroups = [
  {
    images: ["/gallery-1.webp", "/gallery-2.webp"],
    caption: "Activation & Control · Squat Strength",
  },
  {
    images: ["/gallery-3.webp", "/gallery-4.webp"],
    caption: "All-Fours Work · Bridge Variations",
  },
  {
    images: ["/gallery-5.webp", "/gallery-6.webp"],
    caption: "Lunge & Control · Band Walks",
  },
];

export const galleryImageSize = { width: 800, height: 1200 };

export const bonusIntro = "Along with the G4 Method, you'll also get 3 exclusive bonuses:";

export const bonusFootnote =
  "All bonuses are included at no extra cost and unlocked right after purchase.";

export const bonuses = [
  {
    label: "Bonus #1",
    title: 'The "Start Right" Guide',
    text: "Learn which mini band resistance to use, how many reps and rounds to do, and how long to rest between movements.",
  },
  {
    label: "Bonus #2",
    title: "G4 Activation Protocol",
    text: "A quick 5-minute warm-up to activate your glutes before any session.",
  },
  {
    label: "Bonus #3",
    title: "25-Session Progress Tracker",
    text: "A simple visual tracker to log completed sessions, band resistance, and your progress over time.",
  },
];

export const steps = [
  {
    number: 1,
    title: "Place Your Order",
    text: "Click the button below, confirm your order details, and complete your payment.",
  },
  {
    number: 2,
    title: "Get Instant Access",
    text: "Your access instructions will be sent straight to your inbox.",
  },
  {
    number: 3,
    title: "Use It Anytime",
    text: "It's a one-time payment — no subscriptions, and it's yours to keep.",
  },
];

export interface TestimonialImage {
  image: string;
  name: string;
}

export const testimonialImages: TestimonialImage[] = [
  { image: "/testimonial-1.webp", name: "Emily Carter" },
  { image: "/testimonial-2.webp", name: "Madison Reed" },
  { image: "/testimonial-3.webp", name: "Ashley Miller" },
  { image: "/testimonial-4.webp", name: "Lauren Brooks" },
  { image: "/testimonial-5.webp", name: "Hannah Parker" },
  { image: "/testimonial-6.webp", name: "Megan Collins" },
  { image: "/testimonial-7.webp", name: "Jessica Morgan" },
];

export const testimonialImageSize = { width: 900, height: 1951 };

export const trustCards = [
  {
    title: "Clearly Outlined Content",
    text: "A PDF guide with 25 illustrated sessions, usage instructions, and safety notes.",
    icon: "heart",
  },
  {
    title: "Responsible Use",
    text: "Levels and guidance to help you follow along safely — not a substitute for professional advice.",
    icon: "lock",
  },
];

export const faqItems = [
  {
    question: "What's included in the G4 Method?",
    answer:
      "You'll get a 25-page PDF guide with a cover, usage instructions, terms of use, and 25 illustrated sessions. Each session includes the movement breakdown, target muscles, step-by-step instructions, sets, reps or time, rest, a helpful tip, and a safety note.",
  },
  {
    question: "Who is the G4 Method for?",
    answer:
      "It's designed for anyone who wants to train their glutes with a mini band at home or at the gym, choosing sessions that match their level. It's beginner-friendly, with 8 beginner, 13 intermediate, and 4 advanced sessions. The content is educational and isn't a substitute for professional guidance — if you're pregnant, a minor, recovering from surgery, or dealing with chronic pain or a health condition, please check with a doctor before starting.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "Most sessions just need a mini band and a long resistance band. A few movements also use a sturdy bench, chair, non-slip step, wall, or other support. You can stick to whatever movements match what you already have on hand — just check your band before each use.",
  },
  {
    question: "How do I access the method?",
    answer:
      "Right after your payment is confirmed, we'll email you access to your PDF guide. You can open it on your phone, tablet, or computer with any PDF reader.",
  },
  {
    question: "Is this a one-time payment, or a subscription?",
    answer:
      "It's a one-time payment with lifetime access — no subscriptions, ever. Refund terms aren't listed on this page, so please check the details shown at checkout before completing your purchase.",
  },
];

export const checkoutUrl = "https://pay.hotmart.com/T107406547L?checkoutMode=10";
