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
  Trash2,
  StickyNote,
  Send,
  Edit2,
  Save,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";

const GrowthPlanLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [editingNote, setEditingNote] = useState(null);
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
  const toggleNotes = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
    setNoteInput("");
    setEditingNote(null);
  };

  const handleUpdateLead = async (id, data) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/growth-plan-leads/${id}/status`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads((prev) => prev.map((l) => (l._id === id ? res.data : l)));
      return true;
    } catch (err) {
      console.error("Error updating lead:", err);
      return false;
    }
  };

  const handleAddNote = async (id, currentNotes) => {
    if (!noteInput.trim()) return;
    const timestamp = new Date().toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
    const newNoteEntry = `[${timestamp}] By Admin:\n${noteInput}`;
    const updatedNotes = currentNotes ? currentNotes + "\n\n" + newNoteEntry : newNoteEntry;
    const success = await handleUpdateLead(id, { notes: updatedNotes });
    if (success) setNoteInput("");
  };

  const saveEditedNote = async () => {
    if (!editingNote) return;
    const { leadId, index, text } = editingNote;
    const lead = leads.find(l => l._id === leadId);
    if (!lead || !lead.notes) return;
    const notesArray = lead.notes.split("\n\n");
    notesArray[index] = text;
    const newNotesString = notesArray.join("\n\n");
    const success = await handleUpdateLead(leadId, { notes: newNotesString });
    if (success) setEditingNote(null);
  };

  const handleDeleteNote = async (leadId, noteIndex, currentNotes) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    const notesArray = currentNotes.split("\n\n");
    notesArray.splice(noteIndex, 1);
    const newNotesString = notesArray.join("\n\n");
    await handleUpdateLead(leadId, { notes: newNotesString });
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12}/> COMPLETED</span>;
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
                  <th className="px-6 py-4">Notes</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 uppercase text-xs font-bold">
                {filteredLeads.map((lead) => (
                  <Fragment key={lead._id}>
                    <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === lead._id ? 'bg-indigo-50/50' : ''}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {lead.firstName} {lead.lastName}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="text-gray-900">{lead.email}</div>
                        <div className="text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">
                        {lead.company || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleNotes(lead._id)}
                          className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-500 transition-colors relative group"
                          title={lead.notes ? lead.notes.split("\n\n").pop() : "No notes yet"}
                        >
                          <MessageSquare size={18} />
                          {lead.notes && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-400 border border-white" />
                          )}
                        </button>
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
                          <Users size={18} />
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Notes Panel */}
                    {expandedRow === lead._id && (
                      <tr>
                        <td colSpan={7} className="px-0">
                          <div className="bg-indigo-50/30 p-4 border-b border-indigo-100 shadow-inner">
                            <div className="max-w-3xl mx-auto">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-semibold text-indigo-900 flex items-center">
                                  <StickyNote size={16} className="mr-2" />
                                  Notes & History
                                </h4>
                                <button onClick={() => setExpandedRow(null)} className="text-gray-400 hover:text-gray-700"><X size={16}/></button>
                              </div>

                              <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-3 max-h-60 overflow-y-auto space-y-3 shadow-sm">
                                {lead.notes ? lead.notes.split("\n\n").map((noteBlock, nIdx) => (
                                  <div key={nIdx} className="p-3 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                    {editingNote?.leadId === lead._id && editingNote?.index === nIdx ? (
                                      <div className="space-y-2">
                                        <textarea
                                          value={editingNote.text}
                                          onChange={(e) => setEditingNote({ ...editingNote, text: e.target.value })}
                                          className="w-full text-xs p-2 border border-indigo-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                                          rows={3}
                                        />
                                        <div className="flex justify-end gap-2">
                                          <button onClick={() => setEditingNote(null)} className="text-xs text-gray-500">Cancel</button>
                                          <button onClick={saveEditedNote} className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-3 py-1 rounded-md"><Save size={12}/> Save</button>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <p className="text-xs text-gray-600 whitespace-pre-wrap lowercase">{noteBlock}</p>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 bg-white/80 p-1 rounded-md shadow-sm">
                                          <button onClick={() => setEditingNote({ leadId: lead._id, index: nIdx, text: noteBlock })} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 size={12}/></button>
                                          <button onClick={() => handleDeleteNote(lead._id, nIdx, lead.notes)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12}/></button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )) : <span className="text-xs text-gray-400 italic">No notes added yet.</span>}
                              </div>

                              <div className="flex gap-2">
                                <textarea
                                  value={noteInput}
                                  onChange={(e) => setNoteInput(e.target.value)}
                                  placeholder="Type a new note..."
                                  className="flex-1 text-xs border border-indigo-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                                  rows={2}
                                />
                                <button
                                  onClick={() => handleAddNote(lead._id, lead.notes)}
                                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 flex items-center gap-2"
                                >
                                  Add <Send size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                {filteredLeads.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">No leads found.</td></tr>
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
