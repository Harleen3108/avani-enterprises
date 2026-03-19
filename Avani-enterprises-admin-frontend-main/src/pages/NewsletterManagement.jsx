import { useState, useEffect } from "react";
import axios from "axios";
import ErrorFallback from "../components/ErrorFallback";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
  Upload,
  Loader2
} from "lucide-react";

const NewsletterManagement = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
    isPublished: false
  });

  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) fetchNewsletters();
  }, [authLoading]);

  const fetchNewsletters = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/newsletters`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setNewsletters(res.data.data || []);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setForm({ ...form, imageUrl: res.data.imageUrl });
      alert("Image uploaded successfully!");
    } catch (err) {
      alert("Image upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setUploadingImage(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      slug: "",
      content: "",
      imageUrl: "",
      isPublished: true
    });
    setShowForm(true);
  };

  const openEdit = (n) => {
    setEditing(n);
    setForm({
      ...n,
      isPublished: n.isPublished ?? true
    });
    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.slug) {
        form.slug = form.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    try {
      if (editing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/admin/newsletters/${editing._id}`, form, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/newsletters`, form, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
      }
      fetchNewsletters();
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this newsletter?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/newsletters/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchNewsletters();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const filteredNewsletters = newsletters.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  if (error) return <ErrorFallback error={error} resetError={fetchNewsletters} message="Failed to load newsletters" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Newsletter Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Draft and publish newsletters for your subscribers.</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Add New Newsletter</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by title..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all w-64 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-5 text-center w-16">#</th>
                <th className="px-6 py-5">Image</th>
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-center">Date</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-slate-400 font-bold">Loading newsletters...</td>
                </tr>
              ) : filteredNewsletters.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-slate-400 font-bold">No newsletters found.</td>
                </tr>
              ) : filteredNewsletters.map((n, idx) => (
                <tr key={n._id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-5 text-center text-sm font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                      <img
                        src={n.imageUrl ? `${import.meta.env.VITE_API_URL}${n.imageUrl}` : "https://placehold.co/150x150?text=No+Image"}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = "https://placehold.co/150x150?text=Error"}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 truncate max-w-xs">{n.title}</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${n.isPublished
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                      {n.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-xs text-slate-500 font-medium">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center gap-2">
                        <button
                        onClick={() => openEdit(n)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 border border-indigo-100 rounded-lg transition-all"
                        >
                        <Edit2 size={16} />
                        </button>
                        <button
                        onClick={() => remove(n._id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 border border-rose-100 rounded-lg transition-all"
                        >
                        <Trash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-pink-500 p-6 flex justify-between items-center z-20 shadow-lg">
              <div>
                <h2 className="text-2xl font-black text-white">{editing ? 'Edit Newsletter' : 'Create Newsletter'}</h2>
                <p className="text-xs text-indigo-100 font-medium">Fill in the details to publish your newsletter.</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white border border-white/20 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={save} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Newsletter Title</label>
                            <input
                                required
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 font-bold transition-all"
                                placeholder="E.g. Monthly Update - March 2024"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content</label>
                            <div className="h-[400px] overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <ReactQuill
                                    theme="snow"
                                    value={form.content}
                                    onChange={(content) => setForm({ ...form, content })}
                                    modules={quillModules}
                                    className="h-[350px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Featured Image</label>
                            <div className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                                {form.imageUrl ? (
                                    <>
                                        <img src={`${import.meta.env.VITE_API_URL}${form.imageUrl}`} className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-xs">Change Image</label>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        {uploadingImage ? (
                                            <Loader2 className="animate-spin text-indigo-500 mx-auto" size={32} />
                                        ) : (
                                            <>
                                                <Upload className="text-slate-300 mx-auto mb-2" size={32} />
                                                <p className="text-xs text-slate-400 font-medium">Click to upload image</p>
                                            </>
                                        )}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                            <select
                                value={form.isPublished ? "true" : "false"}
                                onChange={e => setForm({ ...form, isPublished: e.target.value === "true" })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 font-bold transition-all"
                            >
                                <option value="true">Published</option>
                                <option value="false">Draft</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Slug (URL)</label>
                            <input
                                value={form.slug}
                                onChange={e => setForm({ ...form, slug: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 font-bold transition-all text-xs"
                                placeholder="monthly-update-march-2024"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
                                disabled={uploadingImage}
                            >
                                {editing ? 'Update Newsletter' : 'Publish Newsletter'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterManagement;
