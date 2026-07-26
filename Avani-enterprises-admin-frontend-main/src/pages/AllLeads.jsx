/**
 * AllLeads.jsx — the single lead inbox.
 *
 * Replaces Leads Dashboard + 7-Day Launch + LandingPageFree, which were three
 * copies of the same table hard-filtered to one `source` value each. That was
 * fine when three forms existed. The site now has a shared lead form on ~460
 * pages, so any lead whose source was not one of those three values appeared on
 * no page at all.
 *
 * This page shows every lead in the Form collection and makes the origin page a
 * first-class column and filter instead of a hidden hard-coded predicate.
 */

import { useState, useEffect, useMemo, Fragment } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Download, Search, Users, Trash2, StickyNote, ExternalLink,
  ChevronDown, ChevronUp, ShieldAlert, RefreshCw, Send, X,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import { sourceGroup, sourceLabel, sourcePath, sourceUrl, sourceColor } from "../utils/leadSource";

const STATUSES = ["not responded", "contacted", "interested", "not interested", "converted"];

const STATUS_STYLE = {
  "not responded": "bg-gray-100 text-gray-700 border-gray-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  interested: "bg-amber-50 text-amber-700 border-amber-200",
  "not interested": "bg-rose-50 text-rose-700 border-rose-200",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const AllLeads = () => {
  const { token, loading: authLoading } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showSpam, setShowSpam] = useState(false);

  const [expanded, setExpanded] = useState(null);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    if (!authLoading && token) fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, token]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || res.data.leads || [];
      setLeads(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const spamCount = useMemo(() => leads.filter((l) => l.isSpam).length, [leads]);

  const visible = useMemo(
    () => (showSpam ? leads : leads.filter((l) => !l.isSpam)),
    [leads, showSpam]
  );

  /** Counts per origin bucket — drives the "where leads come from" bar. */
  const groupCounts = useMemo(() => {
    const m = new Map();
    visible.forEach((l) => {
      const g = sourceGroup(l);
      m.set(g, (m.get(g) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [visible]);

  /** Exact pages, most productive first. This is the answer to "which page?". */
  const topPages = useMemo(() => {
    const m = new Map();
    visible.forEach((l) => {
      const p = sourcePath(l) || "(not recorded)";
      m.set(p, (m.get(p) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [visible]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return visible.filter((l) => {
      if (groupFilter !== "ALL" && sourceGroup(l) !== groupFilter) return false;
      if (statusFilter !== "ALL" && (l.status || "not responded") !== statusFilter) return false;
      if (!q) return true;
      return (
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.includes(search) ||
        sourcePath(l).toLowerCase().includes(q) ||
        sourceLabel(l).toLowerCase().includes(q)
      );
    });
  }, [visible, search, groupFilter, statusFilter]);

  const now = new Date();
  const thisMonth = visible.filter((l) => {
    const d = new Date(l.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const today = visible.filter(
    (l) => new Date(l.createdAt).toDateString() === now.toDateString()
  ).length;

  // ── Actions ────────────────────────────────────────────────────────────────
  const updateLead = async (id, patch) => {
    try {
      await axios.patch(`${API}/leads/${id}`, patch, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, ...patch } : l)));
      return true;
    } catch {
      alert("Could not save. Please try again.");
      return false;
    }
  };

  const deleteLead = async (lead) => {
    const who = lead.name || lead.email || "this lead";
    if (!window.confirm(`Delete ${who}?\n\nThis permanently removes the lead. It cannot be undone.`))
      return;
    try {
      await axios.delete(`${API}/leads/${lead._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads((prev) => prev.filter((l) => l._id !== lead._id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete. Please try again.");
    }
  };

  const addNote = async (lead) => {
    if (!noteInput.trim()) return;
    const stamp = new Date().toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
    const entry = `[${stamp}] ${noteInput.trim()}`;
    const notes = lead.notes ? `${lead.notes}\n\n${entry}` : entry;
    if (await updateLead(lead._id, { notes })) setNoteInput("");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filtered.map((l) => ({
        Name: l.name || "",
        Phone: l.phone || "",
        Email: l.email || "",
        Service: Array.isArray(l.services) ? l.services.join(", ") : l.service || "",
        "Came from": sourcePath(l) || "(not recorded)",
        "Source type": sourceGroup(l),
        Referrer: l.referrer || "",
        Status: l.status || "not responded",
        Notes: l.notes || "",
        Date: new Date(l.createdAt).toLocaleString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, `Avani_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <RefreshCw className="animate-spin mr-2" size={18} /> Loading leads…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-8 md:pt-4 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Leads</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Every enquiry from every page, with the page it came from.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchLeads}
            className="inline-flex items-center px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            <RefreshCw size={16} className="mr-2" /> Refresh
          </button>
          <button
            onClick={exportExcel}
            className="inline-flex items-center bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-black transition text-sm font-medium"
          >
            <Download size={16} className="mr-2" /> Export ({filtered.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total leads", value: visible.length, icon: Users },
          { label: "This month", value: thisMonth, icon: Users },
          { label: "Today", value: today, icon: Users },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{s.value}</p>
          </div>
        ))}
        <button
          onClick={() => setShowSpam((v) => !v)}
          className={clsx(
            "text-left rounded-2xl border shadow-sm p-5 transition",
            showSpam ? "bg-rose-50 border-rose-200" : "bg-white border-gray-100 hover:bg-gray-50"
          )}
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={13} /> Flagged spam
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{spamCount}</p>
          <p className="text-[11px] text-gray-500 mt-1">{showSpam ? "Showing — click to hide" : "Hidden — click to show"}</p>
        </button>
      </div>

      {/* Where leads come from */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">Where your leads come from</h2>
        <p className="text-xs text-gray-500 mb-4">Click a type to filter the table below.</p>

        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setGroupFilter("ALL")}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition",
              groupFilter === "ALL"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            All ({visible.length})
          </button>
          {groupCounts.map(([g, n]) => (
            <button
              key={g}
              onClick={() => setGroupFilter(g === groupFilter ? "ALL" : g)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition",
                groupFilter === g ? "bg-gray-900 text-white border-gray-900" : sourceColor(g) + " hover:opacity-80"
              )}
            >
              {g} ({n})
            </button>
          ))}
        </div>

        {topPages.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Top pages producing leads
            </p>
            <div className="space-y-1.5">
              {topPages.map(([path, n]) => (
                <div key={path} className="flex items-center gap-3 text-sm">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-700 truncate">{path}</span>
                      {path !== "(not recorded)" && (
                        <a
                          href={`https://www.avanienterprises.in${path}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-300 hover:text-gray-600 shrink-0"
                          title="Open page"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full"
                        style={{ width: `${(n / topPages[0][1]) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 w-8 text-right">{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email or page…"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
        >
          <option value="ALL">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {["Name", "Contact", "Service", "Came from", "Status", "Date", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center text-gray-400">
                    No leads match these filters.
                  </td>
                </tr>
              )}
              {filtered.map((lead) => {
                const group = sourceGroup(lead);
                const path = sourcePath(lead);
                const url = sourceUrl(lead);
                const status = lead.status || "not responded";
                const isOpen = expanded === lead._id;

                return (
                  <Fragment key={lead._id}>
                    <tr className={clsx("border-b border-gray-50 hover:bg-gray-50/50", lead.isSpam && "opacity-60")}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {lead.name || "—"}
                          {lead.isSpam && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-semibold">
                              SPAM
                            </span>
                          )}
                        </div>
                        {lead.cityState && (
                          <div className="text-xs text-gray-400">{lead.cityState}</div>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="block text-gray-900 hover:underline">
                            {lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="block text-xs text-gray-500 hover:underline truncate max-w-[190px]">
                            {lead.email}
                          </a>
                        )}
                      </td>

                      <td className="px-4 py-3 text-gray-600 max-w-[180px]">
                        <span className="line-clamp-2">
                          {Array.isArray(lead.services) && lead.services.length
                            ? lead.services.join(", ")
                            : lead.service || "—"}
                        </span>
                      </td>

                      {/* The column this whole rebuild exists for. */}
                      <td className="px-4 py-3">
                        <span
                          className={clsx(
                            "inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border mb-1",
                            sourceColor(group)
                          )}
                        >
                          {group}
                        </span>
                        {path ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 font-mono text-xs text-gray-600 hover:text-gray-900 hover:underline max-w-[210px]"
                            title={url}
                          >
                            <span className="truncate">{path}</span>
                            <ExternalLink size={11} className="shrink-0 opacity-50" />
                          </a>
                        ) : (
                          <div className="text-xs text-gray-400 italic">not recorded</div>
                        )}
                        {lead.referrer && (
                          <div className="text-[10px] text-gray-400 truncate max-w-[210px]" title={lead.referrer}>
                            via {lead.referrer.replace(/^https?:\/\//, "").split("/")[0]}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={status}
                          onChange={(e) => updateLead(lead._id, { status: e.target.value })}
                          className={clsx(
                            "text-xs font-medium rounded-md border px-2 py-1.5 cursor-pointer",
                            STATUS_STYLE[status] || STATUS_STYLE["not responded"]
                          )}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                        <div className="text-gray-400">
                          {new Date(lead.createdAt).toLocaleTimeString("en-GB", {
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => { setExpanded(isOpen ? null : lead._id); setNoteInput(""); }}
                            className={clsx(
                              "p-2 rounded-lg transition relative",
                              isOpen ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            )}
                            title="Notes"
                          >
                            <StickyNote size={15} />
                            {lead.notes && !isOpen && (
                              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteLead(lead)}
                            className="p-2 rounded-lg text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition"
                            title="Delete lead"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr className="bg-gray-50/70 border-b border-gray-100">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="max-w-3xl space-y-3">
                            {lead.notes ? (
                              <pre className="whitespace-pre-wrap text-xs text-gray-700 bg-white rounded-lg border border-gray-200 p-3 font-sans">
                                {lead.notes}
                              </pre>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No notes yet.</p>
                            )}
                            <div className="flex gap-2">
                              <input
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addNote(lead)}
                                placeholder="Add a note…"
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                              />
                              <button
                                onClick={() => addNote(lead)}
                                className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black inline-flex items-center gap-1.5"
                              >
                                <Send size={14} /> Save
                              </button>
                              <button
                                onClick={() => setExpanded(null)}
                                className="p-2 rounded-lg text-gray-400 hover:bg-gray-200"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Showing {filtered.length} of {visible.length} leads
        {spamCount > 0 && !showSpam && ` · ${spamCount} flagged as spam and hidden`}
      </p>
    </div>
  );
};

export default AllLeads;
