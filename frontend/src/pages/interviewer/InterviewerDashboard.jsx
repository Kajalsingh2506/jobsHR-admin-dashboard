import { useState } from "react";

export default function InterviewerDashboard() {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidate: "Kajal",
      job: "Frontend Developer",
      status: "Pending",
    },
  ]);

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const submitFeedback = (id, decision) => {
    setInterviews(
      interviews.map((i) =>
        i.id === id
          ? { ...i, status: decision }
          : i
      )
    );

    setFeedback("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Interviewer Dashboard
      </h1>

      {interviews.map((interview) => (
        <div
          key={interview.id}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <h2 className="font-semibold">
            {interview.candidate}
          </h2>
          <p className="text-gray-500">
            Job: {interview.job}
          </p>
          <p>Status: {interview.status}</p>

          {interview.status === "Pending" && (
            <>
              <textarea
                className="border w-full mt-3 p-2"
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <div className="mt-2">
                <StarRating rating={rating} setRating={setRating} />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    submitFeedback(interview.id, "Selected")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Select
                </button>
                <button
                  onClick={() =>
                    submitFeedback(interview.id, "Rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/* ⭐ STAR RATING COMPONENT */
function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer text-xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
