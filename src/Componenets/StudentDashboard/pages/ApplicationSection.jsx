import React from "react";

const ApplicationSection = () => {
  const statusStyles = {
    "In Progress": "bg-blue-100 text-blue-600",
    "Under Review": "bg-yellow-100 text-yellow-600",
    Accepted: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  const applications = [
    {
      id: 1,
      university: "University of Manchester",
      program: "MSc Computer Science",
      country: "UK",
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
      university: "University of Toronto",
      program: "MBA",
      country: "Canada",
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
      university: "Australian National University",
      program: "Bachelor of Engineering",
      country: "Australia",
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
      university: "Stanford University",
      program: "MS Data Science",
      country: "USA",
      status: "Rejected",
      timeline: [
        { label: "Application Submitted", date: "1/20/2026", done: true },
        { label: "Document Verification", date: "1/21/2026", done: true },
        { label: "Under University Review", date: "1/25/2026", done: true },
        { label: "Decision Received", date: "2/10/2026", done: true },
      ],
    },
  ];

  const stats = {
    total: applications.length,
    inProgress: applications.filter((a) => a.status === "In Progress").length,
    accepted: applications.filter((a) => a.status === "Accepted").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Application Status</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-semibold">{stats.total}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-xl font-semibold">{stats.inProgress}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-xl font-semibold">{stats.accepted}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-xl font-semibold">{stats.rejected}</p>
        </div>
      </div>

      {/* Applications */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white border rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{app.university}</h3>
                <p className="text-sm text-gray-500">
                  {app.program} • {app.country}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${statusStyles[app.status]}`}
              >
                {app.status}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {app.timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-full mt-1 ${
                      step.done ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{step.label}</p>
                    {step.date && (
                      <p className="text-xs text-gray-500">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationSection
