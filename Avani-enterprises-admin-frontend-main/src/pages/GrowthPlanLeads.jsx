import { useState, useEffect, useMemo, Fragment } from "react";
import axios from "axios";
import {
  Download,
  Calendar,
  Search,
  Filter,
  Users,
  MessageSquare,
  X,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";

const GrowthPlanLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { token, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && token) {
      fetchLeads();
    }
  }, [authLoading, token]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/growth-plan-leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch growth plan leads");
      setLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const search = searchTerm.toLowerCase();
      return (
        lead.firstName?.toLowerCase().includes(search) ||
        lead.lastName?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.phone?.includes(searchTerm)
      );
    });
  }, [leads, searchTerm]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12}/> SUCCESS</span>;
      case "failed":
        return <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1"><AlertCircle size={12}/> FAILED</span>;
      default:
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><Clock size={12}/> PENDING</span>;
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredLeads.map((lead) => ({
        "First Name": lead.firstName,
        "Last Name": lead.lastName,
        Email: lead.email,
        Phone: lead.phone,
        Company: lead.company || "N/A",
        Service: lead.service,
        Goals: lead.goals || "",
        "Payment Status": lead.paymentStatus || "Pending",
        Date: new Date(lead.createdAt).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GrowthPlanLeads");
    XLSX.writeFile(workbook, `Growth_Plan_Leads_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <CreditCard className="text-indigo-600" /> ₹499 Growth Plan Leads
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Track consultation requests and payment status for the ₹499 growth plan.
          </p>
        </div>
        <button
          onClick={downloadExcel}
          className="inline-flex items-center bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-md active:scale-95 text-sm"
        >
          <Download size={18} className="mr-2" /> Export to Excel
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" /></div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-gray-900">{lead.email}</div>
                      <div className="text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lead.company || "—"}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(lead.paymentStatus)}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}<br/>
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => alert(`Goals: ${lead.goals || 'No goals specified'}`)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="View Goals"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No leads found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthPlanLeads;
