export const statusStyles = {
    "In Progress": "bg-[#DBEAFE] text-[#1447E6]",
    "Under Review": "bg-[#FEF9C2] text-[#A65F00]",
    Accepted: "bg-[#DCFCE7] text-[#008236]",
    Rejected: "bg-[#FFE2E2] text-[#C10007]",
};

export const applications = [
    {
        id: 1,
        icon: "/Images/pending.webp",
        university: "University of Manchester",
        program: "MSc Computer Science",
        country: "United Kingdom",
        date: "3/1/2026",
        status: "In Progress",
        timeline: [
            { label: "Application Submitted", date: "3/1/2026", done: true },
            { label: "Document Verification", date: "3/2/2026", done: true },
            { label: "Under University Review", done: false },
            { label: "Decision Received", done: false },
        ],
    },
    {
        id: 2,
        icon: "/Images/underreview.webp",
        university: "University of Toronto",
        program: "MBA",
        country: "Canada",
        date: "2/28/2026",
        status: "Under Review",
        timeline: [
            { label: "Application Submitted", date: "2/28/2026", done: true },
            { label: "Document Verification", date: "3/1/2026", done: true },
            { label: "Under University Review", date: "3/4/2026", done: true },
            { label: "Decision Received", done: false },
        ],
    },
    {
        id: 3,
        icon: "/Images/success.webp",
        university: "Australian National University",
        program: "Bachelor of Engineering",
        country: "Australia",
        date: "2/15/2026",
        status: "Accepted",
        timeline: [
            { label: "Application Submitted", date: "2/15/2026", done: true },
            { label: "Document Verification", date: "2/16/2026", done: true },
            { label: "Under University Review", date: "2/20/2026", done: true },
            { label: "Decision Received", date: "2/25/2026", done: true },
        ],
    },
    {
        id: 4,
        icon: "/Images/reject.webp",
        university: "Stanford University",
        program: "MS Data Science",
        country: "USA",
        date: "1/20/2026",
        status: "Rejected",
        timeline: [
            { label: "Application Submitted", date: "1/20/2026", done: true },
            { label: "Document Verification", date: "1/21/2026", done: true },
            { label: "Under University Review", date: "1/25/2026", done: true },
            { label: "Decision Received", date: "2/10/2026", done: true },
        ],
    },
];

export const stats = {
    total: applications.length,
    inProgress: applications.filter((a) => a.status === "In Progress").length,
    accepted: applications.filter((a) => a.status === "Accepted").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
};

export const statsConfig = [
    { label: "Total Application", value: stats.total, color: "#101828" },
    { label: "In Progress", value: stats.inProgress, color: "#155DFC" },
    { label: "Accepted", value: stats.accepted, color: "#00A63E" },
    { label: "Rejected", value: stats.rejected, color: "#E7000B" },
];

///class shedule constants
export const stats = [
    { label: "Enrolled Classes", value: 8, colr: "text-[#0F4C8A]" },
    { label: "This Week", value: 4, color: "text-[#00A63E]" },
    { label: "Completed", value: 12, color: "text-[#9810FA]" },
    { label: "Next Class", value: "Tomorrow", color: "text-[#0A0A0A]" },
];

export const classes = [
    {
        title: "IELTS Speaking Practice",
        teacher: "Dr. Sarah Johnson",
        date: "Sat, Mar 7",
        time: "2:00 PM - 4:00 PM",
        type: "Video",
        level: "Intermediate",
        topics: ["Band 7+", "Fluency", "Mock Interviews"],
    },
    {
        title: "PTE Writing Workshop",
        teacher: "Prof. Michael Chen",
        date: "Sun, Mar 8",
        time: "10:00 AM - 1:00 PM",
        type: "In-Person",
        level: "Advanced",
        topics: ["Essay", "Summarize", "Dictation"],
    },
    {
        title: "IELTS Reading Techniques",
        teacher: "Ms. Emily Davis",
        date: "Mon, Mar 9",
        time: "3:00 PM - 5:00 PM",
        type: "Video",
        level: "All Levels",
        topics: ["Skimming", "True/False", "Time"],
    },
];

export const weekly = [
    { day: "Monday", tasks: ["IELTS Listening (9 AM)", "PTE Reading (2 PM)"] },
    { day: "Tuesday", tasks: ["IELTS Writing (10 AM)", "PTE Speaking (3 PM)"] },
    { day: "Wednesday", tasks: ["IELTS Speaking (2 PM)", "Grammar Workshop (5 PM)"] },
    { day: "Thursday", tasks: ["PTE Writing (10 AM)", "IELTS Reading (3 PM)"] },
    { day: "Friday", tasks: ["PTE Speaking (11 AM)", "Mock Test Review (4 PM)"] },
    { day: "Saturday", tasks: ["Full IELTS Mock Test (9 AM)", "PTE Mock Test (2 PM)"] },
    { day: "Sunday", tasks: ["Open Q&A Session (10 AM)"] },
];

export const materials = [
    {
        title: "IELTS Speaking Topics - March 2024",
        type: "PDF",
        size: "2.4 MB",
        file: "ielts-speaking-topics-march-2024.pdf"
    },
    {
        title: "PTE Writing Templates",
        type: "PDF",
        size: "1.8 MB",
        file: "pte-writing-templates.pdf"
    },
    {
        title: "Vocabulary Builder - Academic Words",
        type: "PDF",
        size: "3.2 MB",
        file: "vocabulary-builder-academic.pdf"
    },
    {
        title: "IELTS Reading Practice Tests",
        type: "PDF",
        size: "5.1 MB",
        file: "ielts-reading-practice-tests.pdf"
    }
];
