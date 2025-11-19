export interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

export const usPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "$179",
    oldPrice: "$299",
    features: [
      "No Time Constraint",
      "AI-powered job matching",
      "Resume Optimization",
      "Basic Analytical Dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/JVH7USSFZUZ54",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Most popular for mid-level professionals",
    price: "$329",
    oldPrice: "$449",
    features: [
      "Everything in Ignite",
      "Priority job matching",
      "Advance analytics & insights",
      "LinkedIn profile optimization",
      "Interview preparation tips",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/LWJ9TX2XTQXEE",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For senior professionals & executives",
    price: "$579",
    oldPrice: "$699",
    features: [
      "Everything in Professional",
      "Executive-level job targeting",
      "Portfolio development",
      "Cover Letters",
      "Network introduction requests",
      "Emailing Recruiters",
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://www.paypal.com/ncp/payment/T592BBX83DZ2Y",
  },
];

export const canadaPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "CA$279",
    oldPrice: "CA$389",
    features: [
      "AI-powered job matching",
      "250 tailored applications",
      "Resume optimization",
      "Basic analytics dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/XE595XT8FUR3W",
  },
  {
    title: "PROFESSIONAL",
    tag: "Most Popular",
    subTitle: "500 Applications",
    description: "Most popular for mid-level professionals",
    price: "CA$489",
    oldPrice: "CA$619",
    features: [
      "Everything in Ignite",
      "500 tailored applications",
      "Priority job matching",
      "Advanced analytics & insights",
      "LinkedIn profile optimization",
      "Interview preparation tips",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/XHDEFS696TUSW",
  },
  {
    title: "EXECUTIVE",
    tag: "Premium",
    subTitle: "1200+ Applications",
    description: "For senior professionals & executives",
    price: "CA$839",
    oldPrice: "CA$949",
    features: [
      "Everything in Professional",
      "1000+ tailored applications",
      "Executive-level job targeting",
      "Portfolio development",
      "Cover letters",
      "Network introduction requests",
      "Emailing Recruiters",
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://www.paypal.com/ncp/payment/BDTDTA7CRXXWQ",
  },
];

