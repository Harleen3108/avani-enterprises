
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Link as LinkIcon,
  MousePointerClick,
  Globe,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LinkAnalytics = () => {
  const [clicks, setClicks] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLink, setSelectedLink] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [clicksRes, linksRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/links/clicks/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/links`),
      ]);
      setClicks(clicksRes.data);
      setLinks(linksRes.data);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error("Analytics error:", err);
      setError("Failed to fetch analytics data");
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter clicks based on selected link and date range
  const filteredClicks = useMemo(() => {
    let filtered = clicks;

    if (selectedLink !== "all") {
      filtered = filtered.filter((click) => click.linkId === selectedLink);
    }

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((click) => new Date(click.createdAt) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((click) => new Date(click.createdAt) <= end);
    }

    return filtered;
  }, [clicks, selectedLink, startDate, endDate]);

  // Analytics data
  const totalClicks = filteredClicks.length;
  const uniqueUsers = new Set(filteredClicks.map((c) => c.ipAddress)).size;
  
  const clicksByLink = useMemo(() => {
    const counts = {};
    filteredClicks.forEach((click) => {
      counts[click.linkTitle] = (counts[click.linkTitle] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredClicks]);

  const topCountries = useMemo(() => {
    const counts = {};
    filteredClicks.forEach((click) => {
      const country = click.country || "Unknown";
      counts[country] = (counts[country] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredClicks]);

  const topReferrers = useMemo(() => {
    const counts = {};
    filteredClicks.forEach((click) => {
      const referrer = click.referrer || "Direct";
      counts[referrer] = (counts[referrer] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredClicks]);

  const handleExport = () => {
    const csvContent = [
      ["Link Title", "Country", "City", "Referrer", "Date", "Time"],
      ...filteredClicks.map((click) => [
        click.linkTitle,
        click.country,
        click.city,
        click.referrer || "Direct",
        new Date(click.createdAt).toLocaleDateString(),
        new Date(click.createdAt).toLocaleTimeString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
    );
    element.setAttribute("download", `link_analytics_${Date.now()}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading analytics...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide">
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="px-8 py-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Link Analytics</h1>
                  <p className="text-gray-600 mt-1">Track your linktree page performance and engagement</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-medium"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Clicks */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">TOTAL CLICKS</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalClicks.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <MousePointerClick className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Unique Users */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">UNIQUE USERS</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {uniqueUsers.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* Avg Clicks */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">AVG CLICKS/LINK</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {clicksByLink.length > 0
                      ? (totalClicks / clicksByLink.length).toFixed(1)
                      : 0}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <PieChart className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Apply Filters</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Link Filter */}
              <div className="flex-1 min-w-max">
                <label className="block text-xs font-medium text-gray-600 mb-2">Link</label>
                <select
                  value={selectedLink}
                  onChange={(e) => setSelectedLink(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Links</option>
                  {links.map((link) => (
                    <option key={link._id} value={link._id}>
                      {link.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div className="flex-1 min-w-max">
                <label className="block text-xs font-medium text-gray-600 mb-2">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                />
              </div>

              {/* End Date */}
              <div className="flex-1 min-w-max">
                <label className="block text-xs font-medium text-gray-600 mb-2">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                />
              </div>

              {/* Reset Button */}
              {(selectedLink !== "all" || startDate || endDate) && (
                <button
                  onClick={() => {
                    setSelectedLink("all");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium self-end"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Clicks by Link */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks by Link</h3>
              <div className="space-y-3">
                {clicksByLink.length > 0 ? (
                  clicksByLink.map((item) => (
                    <div key={item.title}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.title}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${(item.count / totalClicks) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No data available</p>
                )}
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
              <div className="space-y-3">
                {topCountries.length > 0 ? (
                  topCountries.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{item.country}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                        {item.count}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Referrers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topReferrers.length > 0 ? (
                topReferrers.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium truncate mb-2">Referrer</p>
                    <p className="text-sm text-gray-700 truncate mb-3">{item.referrer}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </div>

          {/* Recent Clicks Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Clicks</h3>
              <span className="text-sm text-gray-600 font-medium">{filteredClicks.length} clicks</span>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">LINK</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">COUNTRY</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">CITY</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">REFERRER</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">DATE & TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClicks.slice(0, 10).map((click, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{click.linkTitle}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{click.country || "Unknown"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{click.city || "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                        {click.referrer || "Direct"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(click.createdAt).toLocaleDateString()} {new Date(click.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredClicks.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <MousePointerClick className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No clicks recorded for the selected filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LinkAnalytics;
