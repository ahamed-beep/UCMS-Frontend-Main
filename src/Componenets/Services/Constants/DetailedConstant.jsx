
// export const detailedData = {
//   title: "Student File Assessment",
//   tagline: "Get a comprehensive evaluation of your academic profile to understand your eligibility for top universities worldwide.",
//   features: ["Comprehensive evaluation", "Document review", "Profile assessment", "Personalized recommendations"],
//   overview: "Our expert counselors will thoroughly review your academic credentials, work experience, extracurricular activities, and other relevant documents to provide you with an accurate assessment of your profile strength.",
//   steps: [
//     "Submit your academic documents and personal information",
//     "Expert counselor reviews your complete profile",
//     "Detailed assessment report generation",
//     "One-on-one consultation to discuss findings",
//     "Personalized university recommendations"
//   ],
//   requiredDocuments: [
//     "Academic transcripts and certificates",
//     "Standardized test scores (if available)",
//     "Work experience letters (if applicable)",
//     "Resume/CV",
//     "Statement of Purpose draft"
//   ],
//   pricing: {
//     amount: 99,
//     currency: "$",
//     type: "One-time payment",
//     includes: ["Expert guidance", "Personalized support", "Proven track record", "Follow-up assistance"]
//   },
//   faqs: [
//     {
//       question: "How long does the assessment take?",
//       answer: "Typically 2-3 business days after receiving all required documents."
//     },
//     {
//       question: "Is the assessment free?",
//       answer: "Yes, we offer a complimentary initial assessment for all prospective students."
//     },
//     {
//       question: "What happens after the assessment?",
//       answer: "You’ll receive a detailed report and recommendations for suitable universities and programs."
//     }
//   ]
// };



export const serviceCategories = [
  {
    id: "student-file-assessment", // Use this for URL routing or filtering
    title: "Student File Assessment",
    icon: "/Images/service.icon.webp",
    tagline: "Get a comprehensive evaluation of your academic profile to understand your eligibility for top universities worldwide.",
    features: ["Comprehensive evaluation", "Document review", "Profile assessment", "Personalized recommendations"],
    overview: "Our expert counselors will thoroughly review your academic credentials, work experience, extracurricular activities, and other relevant documents to provide you with an accurate assessment of your profile strength.",
    steps: [
      {id: 1, stp: "Submit your academic documents and personal information"},
      {id: 2, stp: "Expert counselor reviews your complete profile"},
      {id: 3, stp: "Detailed assessment report generation"},
      {id: 4, stp: "One-on-one consultation to discuss findings"},
      {id: 5, stp: "Personalized university recommendations"}
    ],
    requiredDocuments: ["Academic transcripts", "Standardized test scores", "Work experience letters", "Resume/CV", "SOP draft"],
    pricing: { amount: 99, includes: ["Expert guidance", "Personalized support", "Proven track record"] },
    faqs: [
      { q: "How long does it take?", a: "Typically 2-3 business days." },
      { q: "Is it free?", a: "We offer a complimentary initial assessment." }
    ]
  },
  {
    id: "visa-consultancy",
    title: "Visa Application Assistance",
    icon: "/Images/service.icon2.webp",
    tagline: "Navigate the complex visa process with expert guidance tailored to your destination country.",
    features: ["Visa documentation", "Interview prep", "Application filing"],
    overview: "We help you prepare your visa file to ensure the highest chances of approval for your study or work destination.",
    steps: [{id: 1, stp: "Initial consultation"}, {id: 2, stp: "Document collection"}, {id: 3, stp: "Mock interview"}, {id: 4, stp: "Final submission"}],
    requiredDocuments: ["Passport", "Bank statements", "Offer letter", "Sponsorship docs"],
    pricing: { amount: 150, includes: ["Document checklist", "Interview coaching"] },
    faqs: [{ q: "Do you guarantee a visa?", a: "No one can guarantee a visa, but we maximize your success rate." }]
  },
  {
    id: "university-selection",
    title: "University & Course Selection",
    icon: "/Images/service.icon3.webp",
    tagline: "Find the perfect match for your career goals from our network of 500+ global universities.",
    features: ["Career counseling", "Budget planning", "Ranking analysis"],
    overview: "Selecting the right course is the foundation of your future. We help you choose based on ROI and rankings.",
    steps: [{id: 1, stp: "Interest assessment"}, {id: 2, stp: "Shortlisting universities"}, {id: 3, stp: "Course comparison"}, {id: 4, stp: "Final selection"}],
    requiredDocuments: ["Mark sheets", "English proficiency scores"],
    pricing: { amount: 49, includes: ["Shortlist of 5 universities", "Cost estimation"] },
    faqs: [{ q: "Can I apply to multiple countries?", a: "Yes, we cover USA, UK, Canada, and Australia." }]
  },
  {
    id: "scholarship-guidance",
    title: "Scholarship & Funding Support",
    icon: "/Images/service.icon4.webp",
    tagline: "Maximize your chances of securing fully-funded or partial scholarships.",
    features: ["Essay editing", "Grant search", "Financial aid advice"],
    overview: "We identify scholarships that match your profile and help you write winning scholarship essays.",
    steps: ["Eligibility check", "Scholarship search", "Drafting essays", "Submission"],
    requiredDocuments: ["Academic records", "Letters of Recommendation", "Personal Statement"],
    pricing: { amount: 75, includes: ["Scholarship database access", "SOP review"] },
    faqs: [{ q: "What is the minimum GPA needed?", a: "It varies, but usually 3.0+ for most grants." }]
  },
  {
    id: "test-preparation",
    title: "IELTS/TOEFL/GRE Coaching",
    icon: "/Images/service.icon5.webp",
    tagline: "Achieve your target scores with our intensive online and offline coaching programs.",
    features: ["Mock tests", "Study material", "Expert tutors"],
    overview: "Join our expert-led sessions designed to help you master the techniques needed for high scores.",
    steps: ["Diagnostic test", "Concept building", "Practice sessions", "Final mock exam"],
    requiredDocuments: ["Valid ID card"],
    pricing: { amount: 120, includes: ["Free study material", "10 Mock tests"] },
    faqs: [{ q: "How long is the course?", a: "Our standard course is 6 weeks long." }]
  },
  {
    id: "accommodation-services",
    title: "Student Accommodation",
    icon: "/Images/service.icon6.webp",
    tagline: "Secure a safe and affordable place to live before you even land in your new country.",
    features: ["Verified listings", "Budget options", "Near-campus housing"],
    overview: "We help you find student-friendly housing that fits your budget and lifestyle.",
    steps: ["Requirement gathering", "Viewing options", "Booking", "Contract signing"],
    requiredDocuments: ["Visa copy", "Passport", "University offer letter"],
    pricing: { amount: 30, includes: ["Virtual tours", "Legal contract review"] },
    faqs: [{ q: "Are utilities included?", a: "This depends on the specific property you choose." }]
  },
  {
    id: "post-landing-support",
    title: "Post-Landing Assistance",
    icon: "/Images/service.icon7.webp",
    tagline: "Get help with airport pickup, bank accounts, and local orientation.",
    features: ["Airport pickup", "Sim card help", "Bank account setup"],
    overview: "Moving to a new country is hard. We make it easy by providing ground support upon your arrival.",
    steps: ["Pre-departure brief", "Airport greeting", "Local registration", "City tour"],
    requiredDocuments: ["Travel itinerary", "Contact details"],
    pricing: { amount: 60, includes: ["Airport transfer", "Local SIM card"] },
    faqs: [{ q: "Is this available in all cities?", a: "Currently available in 20+ major student cities." }]
  }
];