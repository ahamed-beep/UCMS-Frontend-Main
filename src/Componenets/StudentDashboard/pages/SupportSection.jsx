import React from "react";

const supportCards = [
    {
        title: "Email Support",
        info: "support@upskills.com",
        sub: "Response within 24 hours",
        icon: "📧",
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Phone Support",
        info: "+1 234 567 8900",
        sub: "Mon-Fri: 9:00 AM - 6:00 PM",
        icon: "📞",
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Live Chat",
        info: "Chat with our team",
        sub: "Available during office hours",
        icon: "💬",
        color: "bg-purple-100 text-purple-600",
    },
];

const faqs = [
    {
        q: "How do I submit an assignment?",
        a: "Go to the Assignments page, upload your file and click submit.",
    },
    {
        q: "Can I retake a quiz if I'm not satisfied with my score?",
        a: "Yes, multiple attempts may be allowed depending on settings.",
    },
    {
        q: "How do I access course materials?",
        a: "Navigate to your enrolled course to access all materials.",
    },
    {
        q: "What if I miss a scheduled class?",
        a: "Recordings are usually available within 24 hours.",
    },
    {
        q: "How can I track my progress?",
        a: "Visit the Progress page to see your analytics.",
    },
    {
        q: "Who do I contact for technical issues?",
        a: "Use the contact form or email support.",
    },
];

const troubleshooting = [
    {
        title: "Cannot upload files",
        desc: "Ensure file is under 10MB and supported format.",
    },
    {
        title: "Video not playing",
        desc: "Check internet and clear browser cache.",
    },
    {
        title: "Quiz not loading",
        desc: "Refresh page and ensure JavaScript is enabled.",
    },
    {
        title: "Login issues",
        desc: "Check credentials or reset password.",
    },
];

const SupportSection = () => {

    return (
        <div className="bg-gray-50 min-h-screen p-6 space-y-6">

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                {supportCards.map((card, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl shadow">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${card.color}`}
                        >
                            {card.icon}
                        </div>
                        <h3 className="mt-3 font-semibold">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.info}</p>
                        <p className="text-xs text-gray-400">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">Contact Support Team</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        placeholder="Your Name"
                        className="border p-2 rounded"
                    />
                    <input
                        placeholder="Email Address"
                        className="border p-2 rounded"
                    />
                </div>
                <input
                    placeholder="Subject"
                    className="border p-2 rounded w-full mt-4"
                />
                <textarea
                    placeholder="Message"
                    className="border p-2 rounded w-full mt-4 h-32"
                />
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    Send Message
                </button>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">Frequently Asked Questions</h2>
                {faqs.map((faq, i) => (
                    <details key={i} className="border-b py-2">
                        <summary className="cursor-pointer font-medium">
                            {faq.q}
                        </summary>
                        <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
                    </details>
                ))}
            </div>

            {/* Troubleshooting */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">Basic Troubleshooting</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {troubleshooting.map((item, i) => (
                        <div key={i} className="border p-4 rounded">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-blue-50 p-6 rounded-xl flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">Still need help?</h3>
                    <p className="text-sm text-gray-600">
                        Our support team is available Mon-Fri 9AM-6PM
                    </p>
                </div>
                <div className="space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Schedule a Call
                    </button>
                    <button className="border px-4 py-2 rounded">
                        Browse Docs
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SupportSection
