import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/companies/${id}`)
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading company details...</p>;
  }

  if (!company) {
    return <p className="p-6 text-red-600">Company not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Company Details</h1>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">Company Name:</span>{" "}
            {company.name}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={
                company.status === "ACTIVE"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {company.status}
            </span>
          </p>

          <p>
            <span className="font-semibold">HR Email:</span>{" "}
            {company.hrAdminId?.email || "-"}
          </p>

          <p>
            <span className="font-semibold">Last Updated:</span>{" "}
            {company.updatedAt
              ? new Date(company.updatedAt).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
