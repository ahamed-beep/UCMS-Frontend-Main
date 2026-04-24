export const SAMPLE_VIDEO =
  "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4";

export const courses = [
  {
    slug: "ielts",
    title: "IELTS Preparation - Academic",
    teacher: "Dr. Sarah Johnson",
    hours: "48 hours",
    description: "Comprehensive IELTS Academic preparation covering Listening, Reading, Writing, and Speaking.",
    progress: 65,
    lectures: "16/24 lectures",
    time: "Tomorrow, 2:00 PM",
    status: "In Progress",
  },
  {
    slug: "pte",
    title: "PTE Writing Masterclass",
    teacher: "Prof. Michael Chen",
    hours: "30 hours",
    description: "Master PTE Academic writing with expert strategies and practice tests.",
    progress: 40,
    lectures: "8/20 lectures",
    time: "March 8, 10:00 AM",
    status: "In Progress",
  },
  {
    slug: "english",
    title: "English Communication Skills",
    teacher: "Emma Williams",
    hours: "20 hours",
    description: "Build strong English communication skills for professional and academic use.",
    progress: 100,
    lectures: "12/12 lectures",
    time: "Completed",
    status: "Completed",
  },
];

export const courseModules = {
  ielts: [
    {
      id: "m1",
      title: "Module 1: Introduction to IELTS",
      hours: "2 hours",
      items: [
        { id: "m1-l1", title: "Welcome to IELTS Preparation", duration: "15 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m1-l2", title: "IELTS Test Format Overview", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m1-l3", title: "Understanding Band Scores", duration: "10 min", type: "doc" },
        { id: "m1-l4", title: "Study Plan & Resources", duration: "15 min", type: "doc" },
        { id: "m1-l5", title: "Module 1 Quiz", duration: "30 min", type: "quiz" },
      ],
      resources: [
        { id: "m1-r1", name: "IELTS Overview Guide.pdf", meta: "PDF • 2.4 MB", url: "data:text/plain;charset=utf-8,IELTS%20Overview%20Guide" },
        { id: "m1-r2", name: "Band Score Descriptors.pdf", meta: "PDF • 1.8 MB", url: "data:text/plain;charset=utf-8,Band%20Score%20Descriptors" },
      ],
    },
    {
      id: "m2",
      title: "Module 2: Listening Skills - Part 1 & 2",
      hours: "3 hours",
      items: [
        { id: "m2-l1", title: "Listening Test Overview", duration: "15 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l2", title: "Part 1 Strategies", duration: "25 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l3", title: "Part 2 Strategies", duration: "25 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l4", title: "Practice Notes", duration: "10 min", type: "doc" },
      ],
      resources: [
        { id: "m2-r1", name: "Listening Practice Set.pdf", meta: "PDF • 3.1 MB", url: "data:text/plain;charset=utf-8,Listening%20Practice" },
      ],
    },
    {
      id: "m3",
      title: "Module 3: Reading Skills - Academic Texts",
      hours: "4 hours",
      items: [
        { id: "m3-l1", title: "Reading Test Overview", duration: "15 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m3-l2", title: "Skimming & Scanning", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m3-l3", title: "Question Types", duration: "15 min", type: "doc" },
        { id: "m3-l4", title: "Module 3 Quiz", duration: "30 min", type: "quiz" },
      ],
    },
    {
      id: "m4",
      title: "Module 4: Writing Task 1 - Academic",
      hours: "3.5 hours",
      items: [
        { id: "m4-l1", title: "Task 1 Overview", duration: "15 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m4-l2", title: "Describing Graphs", duration: "25 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m4-l3", title: "Sample Answers", duration: "15 min", type: "doc" },
      ],
    },
    {
      id: "m5",
      title: "Module 5: Writing Task 2 - Essays",
      hours: "4 hours",
      items: [
        { id: "m5-l1", title: "Essay Structure", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m5-l2", title: "Argumentation", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m5-l3", title: "Module 5 Quiz", duration: "30 min", type: "quiz" },
      ],
    },
    {
      id: "m6",
      title: "Module 6: Speaking - All Parts",
      hours: "3 hours",
      items: [
        { id: "m6-l1", title: "Speaking Overview", duration: "15 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m6-l2", title: "Part 1, 2 & 3", duration: "40 min", type: "video", videoUrl: SAMPLE_VIDEO },
      ],
    },
  ],

  pte: [
    {
      id: "m1",
      title: "Module 1: Introduction to PTE",
      hours: "2 hours",
      items: [
        { id: "m1-l1", title: "PTE Test Format", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m1-l2", title: "Scoring System", duration: "15 min", type: "doc" },
        { id: "m1-l3", title: "Module 1 Quiz", duration: "20 min", type: "quiz" },
      ],
    },
    {
      id: "m2",
      title: "Module 2: PTE Writing Skills",
      hours: "3 hours",
      items: [
        { id: "m2-l1", title: "Summarize Written Text", duration: "25 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l2", title: "Essay Writing Strategies", duration: "30 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l3", title: "Writing Templates", duration: "15 min", type: "doc" },
        { id: "m2-l4", title: "Module 2 Quiz", duration: "20 min", type: "quiz" },
      ],
      resources: [
        { id: "m2-r1", name: "PTE Writing Guide.pdf", meta: "PDF • 2.1 MB", url: "data:text/plain;charset=utf-8,PTE%20Writing%20Guide" },
      ],
    },
    {
      id: "m3",
      title: "Module 3: PTE Speaking & Reading",
      hours: "2.5 hours",
      items: [
        { id: "m3-l1", title: "Read Aloud Techniques", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m3-l2", title: "Repeat Sentence Tips", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m3-l3", title: "Module 3 Quiz", duration: "20 min", type: "quiz" },
      ],
    },
  ],

  english: [
    {
      id: "m1",
      title: "Module 1: Communication Basics",
      hours: "1.5 hours",
      items: [
        { id: "m1-l1", title: "Introduction to Communication", duration: "10 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m1-l2", title: "Verbal vs Non-Verbal", duration: "15 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m1-l3", title: "Communication Notes", duration: "10 min", type: "doc" },
        { id: "m1-l4", title: "Module 1 Quiz", duration: "15 min", type: "quiz" },
      ],
    },
    {
      id: "m2",
      title: "Module 2: Professional English",
      hours: "2 hours",
      items: [
        { id: "m2-l1", title: "Business Communication", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l2", title: "Email Writing Skills", duration: "20 min", type: "video", videoUrl: SAMPLE_VIDEO },
        { id: "m2-l3", title: "Email Templates", duration: "10 min", type: "doc" },
        { id: "m2-l4", title: "Module 2 Quiz", duration: "15 min", type: "quiz" },
      ],
      resources: [
        { id: "m2-r1", name: "Professional Email Guide.pdf", meta: "PDF • 1.5 MB", url: "data:text/plain;charset=utf-8,Email%20Guide" },
      ],
    },
  ],
};

export const materials = [
  { title: "IELTS Writing Task 1 - Introduction", sub: "45 min", type: "video" },
  { title: "IELTS Speaking Strategies Guide", sub: "2.4 MB", type: "pdf" },
  { title: "Sample Essays Collection", sub: "1.8 MB", type: "pdf" },
  { title: "Listening Practice - Lecture Format", sub: "30 min", type: "video" },
  { title: "Vocabulary Builder - Academic Words", sub: "950 KB", type: "pdf" },
  { title: "Grammar Essentials Presentation", sub: "3.2 MB", type: "play" },
];

export const exercises = [
  { title: "Writing Task 2 - Opinion Essay", sub: "5 questions · 60 min", type: "Start" },
  { title: "Reading Comprehension - Set A", sub: "10 questions · 30 min", type: "Review" },
  { title: "Listening Practice Test 1", sub: "15 questions · 40 min", type: "Review" },
  { title: "Speaking Mock Interview", sub: "8 questions · 15 min", type: "Start" },
];