export default function CandidateDashboard() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova",
      location: "Remote",
      experience: "1–3 Years",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "InnoSoft",
      location: "Bangalore",
      experience: "2–4 Years",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
            <p className="text-sm text-gray-500">
              Experience: {job.experience}
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
