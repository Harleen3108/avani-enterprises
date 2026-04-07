import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  GripVertical,
  Link as LinkIcon,
  Zap,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LinkManagement = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    icon: "Link",
    color: "#3b82f6",
    isActive: true,
  });

  const { token } = useAuth();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/links`);
      setLinks(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch links");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.url) {
      alert("Title and URL are required");
      return;
    }

    try {
      if (editingId) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/links/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLinks(links.map((l) => (l._id === editingId ? res.data : l)));
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/links`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLinks([...links, res.data]);
      }

      setFormData({
        title: "",
        url: "",
        description: "",
        icon: "Link",
        color: "#3b82f6",
        isActive: true,
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      setError("Failed to save link");
    }
  };

  const handleEdit = (link) => {
    setFormData(link);
    setEditingId(link._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(links.filter((l) => l._id !== id));
    } catch (err) {
      setError("Failed to delete link");
    }
  };

  const handleToggleActive = async (link) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/links/${link._id}`,
        { ...link, isActive: !link.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLinks(links.map((l) => (l._id === link._id ? res.data : l)));
    } catch (err) {
      setError("Failed to update link");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      url: "",
      description: "",
      icon: "Link",
      color: "#3b82f6",
      isActive: true,
    });
  };

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
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <LinkIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Link Management</h1>
                  <p className="text-gray-600 mt-1">Manage and track your linktree page links</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium"
            >
              <Plus className="w-5 h-5" />
              Create New Entry
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Stat Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Active Links */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">ACTIVE</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {links.filter(l => l.isActive).length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Total Links */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">TOTAL LINKS</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{links.length}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <LinkIcon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Total Clicks */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">TOTAL CLICKS</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {links.reduce((sum, l) => sum + (l.clickCount || 0), 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId ? "Edit Link" : "Add New Link"}
                  </h2>
                  <button
                    onClick={closeForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Contact Us"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  {/* URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL *
                    </label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Active
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                      <Save className="w-4 h-4" />
                      {editingId ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Search and Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header with search */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Link Library</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
            </div>

            {/* Links Table */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin">Loading...</div>
              </div>
            ) : (
              <div>
                {links.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <LinkIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No links created yet. Add your first link to get started!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            TITLE & LINK
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            DESCRIPTION
                          </th>
                          <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                            CLICKS
                          </th>
                          <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                            STATUS
                          </th>
                          <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {links
                          .filter(link => 
                            link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            link.description?.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((link) => (
                          <tr key={link._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-start gap-3">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                                  style={{ backgroundColor: link.color + '20', borderLeft: `4px solid ${link.color}` }}
                                >
                                  <LinkIcon className="w-5 h-5" style={{ color: link.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900">{link.title}</p>
                                  <p className="text-xs text-gray-500 truncate">{link.url}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {link.description || '-'}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                {link.clickCount || 0}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleToggleActive(link)}
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                                  link.isActive
                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {link.isActive ? (
                                  <>
                                    <Eye className="w-3 h-3" /> Active
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3" /> Inactive
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(link)}
                                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(link._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LinkManagement;
