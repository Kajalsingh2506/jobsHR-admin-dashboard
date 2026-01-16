import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function SuperAdminDashboard() {
   const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState({
    companies: 0,
    hrAdmins: 0,
    recruiters: 0,
    interviewsToday: 0,
  });

  const [form, setForm] = useState({
    companyName: "",
    hrName: "",
    hrEmail: "",
    password: "",
  });
  
  const [confirmModal, setConfirmModal] = useState({
  open: false,
  companyId: null,
  companyName: "",
  currentStatus: "",
});

const [searchTerm, setSearchTerm] = useState("");

const [statusFilter, setStatusFilter] = useState("ALL");

const [loadingCompanyId, setLoadingCompanyId] = useState(null);

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

const [chartStatusFilter, setChartStatusFilter] = useState(null);
const [chartMonthFilter, setChartMonthFilter] = useState(null);



  // ================= FETCH FUNCTIONS =================
  const fetchCompanies = async () => {
    const res = await api.get("/companies");
    setCompanies(res.data);
  };

  const fetchStats = async () => {
    const res = await api.get("/companies/stats");
    setStats(res.data);
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchCompanies();
    fetchStats();
  }, []);

  // ================= CREATE COMPANY =================
  const handleCreateCompany = async () => {
    try {
      await api.post("/companies", form);

      await fetchCompanies();
      await fetchStats();

      alert("Company created successfully");
      setShowModal(false);
      setForm({
        companyName: "",
        hrName: "",
        hrEmail: "",
        password: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create company");
    }
  };

  // ================= ENABLE / DISABLE COMPANY =================
  const toggleStatus = async (id) => {
    try {
       setLoadingCompanyId(id);

      await api.patch(`/companies/${id}/status`);
      await fetchCompanies();
      await fetchStats();
    } catch (err) {
      console.error(err);
      alert("Failed to update company status");
       } finally {
    setLoadingCompanyId(null);
    }
  };
  //CONFIRM STATUS
  const confirmToggleStatus = async () => {
  try {
    await toggleStatus(confirmModal.companyId);
    setConfirmModal({
      open: false,
      companyId: null,
      companyName: "",
      currentStatus: "",
    });
  } catch {
    alert("Failed to update company status");
  }
};
 


// const filteredCompanies = companies.filter((c) => {
//   const term = searchTerm.toLowerCase();

//   const matchesSearch =
//     c.name?.toLowerCase().includes(term) ||
//     c.hrAdminId?.email?.toLowerCase().includes(term);

//   const matchesStatus =
//     statusFilter === "ALL" || c.status === statusFilter;

//   return matchesSearch && matchesStatus;
// });

const filteredCompanies = companies.filter((c) => {
  const term = searchTerm.toLowerCase();

  const matchesSearch =
    c.name?.toLowerCase().includes(term) ||
    c.hrAdminId?.email?.toLowerCase().includes(term);

  const matchesDropdownStatus =
    statusFilter === "ALL" || c.status === statusFilter;

  const matchesChartStatus =
    !chartStatusFilter || c.status === chartStatusFilter;

  const matchesChartMonth = (() => {
    if (!chartMonthFilter || !c.createdAt) return true;

    const companyMonth = new Date(c.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    return companyMonth === chartMonthFilter;
  })();

  return (
    matchesSearch &&
    matchesDropdownStatus &&
    matchesChartStatus &&
    matchesChartMonth
  );
});


  
 useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);
   
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // ================= CHART DATA =================
// 1️⃣ Active vs Inactive Companies
const activeCount = companies.filter(
  (c) => c.status === "ACTIVE"
).length;

const inactiveCount = companies.filter(
  (c) => c.status === "INACTIVE"
).length;

const companyStatusData = [
  { name: "Active", value: activeCount },
  { name: "Inactive", value: inactiveCount },
];

// ================= CHART: COMPANIES CREATED PER MONTH =================
const companiesPerMonthData = Object.values(
  companies.reduce((acc, company) => {
    if (!company.createdAt) return acc;

    const date = new Date(company.createdAt);

    // Stable internal key (YYYY-MM)
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!acc[key]) {
      acc[key] = {
        month: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        count: 0,
      };
    }

    acc[key].count += 1;
    return acc;
  }, {})
);

// Pie colors
const COLORS = ["#16a34a", "#dc2626"];
  
//  exportToCSV
 const exportToCSV = () => {
  if (filteredCompanies.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = [
    "Company Name",
    "HR Email",
    "Status",
    "Created At",
    "Last Updated",
  ];

  const rows = filteredCompanies.map((c) => [
    `"${c.name}"`,
    `"${c.hrAdminId?.email || ""}"`,
    `"${c.status}"`,
    `"${c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}"`,
    `"${c.updatedAt ? new Date(c.updatedAt).toLocaleString() : ""}"`,
  ]);

  const csvContent =
    headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `companies_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Companies" value={stats.companies} />
        <StatCard title="HR Admins" value={stats.hrAdmins} />
        <StatCard title="Recruiters" value={stats.recruiters} />
       <StatCard title="Interviews Today" value={stats.interviewsToday} />
      </div>

      {/* ================= DASHBOARD CHARTS ================= */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {/* Active vs Inactive Companies */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-4 text-center">
      Active vs Inactive Companies
    </h3>

    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
        //   data={companyStatusData}
        //   dataKey="value"
        //   nameKey="name"
        //   cx="50%"
        //   cy="50%"
        //   outerRadius={80}
        //   label
        // >
            data={companyStatusData}
          dataKey="value"
        nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={80}
  label
  onClick={(data) => {
    setChartStatusFilter(
      data.name === "Active" ? "ACTIVE" : "INACTIVE"
    );
    setChartMonthFilter(null);
  }}
>

          {companyStatusData.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Companies Created Per Month */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-4 text-center">
      Companies Created Per Month
    </h3>

    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={companiesPerMonthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        {/* <Bar dataKey="count" fill="#2563eb" /> */}
          <Bar
           dataKey="count"
            fill="#2563eb"
           onClick={(data) => {
           setChartMonthFilter(data.month);
           setChartStatusFilter(null);
           }}
           />


      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      {/* COMPANY TABLE */}
      <div className="bg-white rounded shadow p-4">
        {/* <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Companies</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Company
          </button>
        </div> */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
  <h2 className="font-semibold text-lg">Companies</h2>

  <input
    type="text"
    placeholder="Search by company or HR email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border px-3 py-2 rounded w-full md:w-80"
  />
  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border px-3 py-2 rounded w-full md:w-40"
>
  <option value="ALL">All Status</option>
  <option value="ACTIVE">Active</option>
  <option value="INACTIVE">Inactive</option>
</select>
   
   {/* exportToCSV */}
 <button
  onClick={exportToCSV}
  className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
>
  Export CSV
</button>


  <button
    onClick={() => setShowModal(true)}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    + Add Company
  </button>
</div>
   <p className="text-sm text-gray-600 mb-3">
  Showing <span className="font-semibold">{filteredCompanies.length}</span> of{" "}
  <span className="font-semibold">{companies.length}</span> companies
</p>

{(chartStatusFilter || chartMonthFilter) && (
  <button
    onClick={() => {
      setChartStatusFilter(null);
      setChartMonthFilter(null);
    }}
    className="text-sm text-blue-600 underline mb-3"
  >
    Clear chart filters
  </button>
)}




        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Company Name</th>
              <th className="p-2 border">HR Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Last Updated</th>
              <th className="p-2 border text-center">Action</th>
             </tr>

          </thead>
            <tbody>
  {filteredCompanies.length === 0 ? (
    <tr>
      <td
        colSpan="5"
        className="p-6 text-center text-gray-500"
      >
        🔍 No companies found matching your search or filter
      </td>
    </tr>
       ) : (
            paginatedCompanies.map((c) => (

              <tr key={c._id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.hrAdminId?.email}</td>

                <td className="p-2 border">
                  <span
                    className={
                      c.status === "ACTIVE"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-2 border text-sm text-gray-600">
  {c.updatedAt
    ? new Date(c.updatedAt).toLocaleString()
    : "-"}
   </td>

                <td className="p-2 border text-center">
                {/* VIEW BUTTON */}
                 <button
                 onClick={() => navigate(`/superadmin/companies/${c._id}`)}
                 className="px-3 py-1 mr-2 rounded bg-blue-600 text-white"
                 >
                  View
                </button>

                 <button
                 disabled={loadingCompanyId === c._id}
                onClick={() =>
                setConfirmModal({
              open: true,
           companyId: c._id,
             companyName: c.name,
           currentStatus: c.status,
    })
  }
  className={`px-3 py-1 rounded text-white ${
    c.status === "ACTIVE" ? "bg-red-500" : "bg-green-600"
  } ${
    loadingCompanyId === c._id ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {loadingCompanyId === c._id
    ? "Processing..."
    : c.status === "ACTIVE"
    ? "Disable"
    : "Enable"}
</button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
        {totalPages > 1 && (
  <div className="flex justify-between items-center mt-4">
    <p className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </p>

    <div className="flex gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Prev
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Next
      </button>
    </div>
  </div>
)}

      </div>

      {/* ADD COMPANY MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">Add Company</h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Company Name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="HR Name"
              value={form.hrName}
              onChange={(e) =>
                setForm({ ...form, hrName: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="HR Email"
              value={form.hrEmail}
              onChange={(e) =>
                setForm({ ...form, hrEmail: e.target.value })
              }
            />

            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Temporary Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCompany}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    {/* CONFIRMATION MODAL */}
{confirmModal.open && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h2 className="text-lg font-bold mb-4">Confirm Action</h2>

      <p className="mb-4 text-gray-700">
        Are you sure you want to{" "}
        <span className="font-semibold">
          {confirmModal.currentStatus === "ACTIVE" ? "disable" : "enable"}
        </span>{" "}
        <span className="font-semibold text-blue-600">
          {confirmModal.companyName}
        </span>
        ?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() =>
            setConfirmModal({
              open: false,
              companyId: null,
              companyName: "",
              currentStatus: "",
            })
          }
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={confirmToggleStatus}
          className={`px-4 py-2 text-white rounded ${
            confirmModal.currentStatus === "ACTIVE"
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {confirmModal.currentStatus === "ACTIVE"
            ? "Yes, Disable"
            : "Yes, Enable"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

// ================= STAT CARD =================
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
