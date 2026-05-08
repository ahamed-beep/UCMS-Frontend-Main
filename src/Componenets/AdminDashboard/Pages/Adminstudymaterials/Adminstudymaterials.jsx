import { useEffect, useState } from "react";
import { Plus, Trash2, X, FileText } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const MaterialModal = ({ open, onClose, onSubmit, loading, courses, sessions }) => {
  const [form, setForm] = useState({ title: "", courseId: "", classSessionId: "", type: "PDF" });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (open) { setForm({ title: "", courseId: "", classSessionId: "", type: "PDF" }); setFile(null); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("type", form.type);
    if (form.classSessionId) fd.append("classSessionId", form.classSessionId);
    fd.append("file", file);
    onSubmit(form.courseId, fd);
  };

  const filteredSessions = sessions.filter((s) => {
  const cId = s.course?._id ?? s.course?.id ?? s.course;
  return cId === form.courseId;
});

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Add Study Material</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Title</label>
            <input value={form.title} onChange={set("title")} placeholder="Material title" className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Course</label>
            <select value={form.courseId} onChange={set("courseId")} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]">
              <option value="">Select course</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Class Session (optional)</label>
            <select value={form.classSessionId} onChange={set("classSessionId")} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]" disabled={!form.courseId}>
              <option value="">General material (no class)</option>
              {filteredSessions.map((s) => <option key={s.id} value={s.id}>{s.title} — {new Date(s.scheduledAt).toLocaleDateString()}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Type</label>
            <select value={form.type} onChange={set("type")} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]">
              <option value="PDF">PDF</option>
              <option value="DOC">DOC</option>
              <option value="VIDEO">VIDEO</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">File</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]" />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading || !file || !form.courseId || !form.title} className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f74] disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>}
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminStudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

const fetchCourses = async () => {
  try {
    const res = await axiosInstance.get("/courses");
    console.log('📚 Full courses response:', JSON.stringify(res.data));
    const raw = res.data.data ?? res.data ?? [];
    const arr = Array.isArray(raw) ? raw : [];
    console.log('📚 Courses array:', arr);
    console.log('📚 First course:', arr[0]);
    setCourses(
      arr.map((c) => ({
        ...c,
        id: c._id ?? c.id,
      }))
    );
  } catch (err) { 
    console.error('❌ Courses error:', err); 
  }
};

const fetchSessions = async () => {
  try {
    const res = await axiosInstance.get("/class-sessions");
    const raw = res.data.data ?? [];
    setSessions(
      raw.map((s) => ({
        ...s,
        id: s._id ?? s.id,
        course: s.courseId ?? s.course ?? null,
      }))
    );
  } catch (err) {
    console.error(err);
  }
};

const fetchMaterials = async (courseId) => {
  if (!courseId) { setMaterials([]); return; }
  setLoading(true);
  try {
    const res = await axiosInstance.get(`/courses/${courseId}/study-materials`);
    console.log('📄 Materials response:', JSON.stringify(res.data));
    console.log('📄 Status:', res.status);
    const raw = res.data.data ?? [];
    console.log('📄 Raw materials:', raw);
    setMaterials(
      raw.map((m) => ({
        ...m,
        id: m._id ?? m.id,
        courseId: courseId,
      }))
    );
  } catch (err) { 
    console.error('❌ fetchMaterials error:', err);
    console.error('❌ Error response:', err.response?.data);
    console.error('❌ Error status:', err.response?.status);
  } finally { 
    setLoading(false); 
  }
};

  useEffect(() => { fetchCourses(); fetchSessions(); }, []);
  useEffect(() => { fetchMaterials(selectedCourse); }, [selectedCourse]);

 const handleSave = async (courseId, formData) => {
  setSaving(true);
  try {
    await axiosInstance.post(`/courses/${courseId}/study-materials`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setSelectedCourse(courseId); // ← yeh add karo
    await fetchMaterials(courseId); // ← selectedCourse ki jagah courseId
    setModalOpen(false);
  } catch (err) { console.error(err); }
  finally { setSaving(false); }
};

  const handleDelete = async (material) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/courses/${material.courseId}/study-materials/${material.id}`);
      await fetchMaterials(selectedCourse);
      setDeleteTarget(null);
    } catch (err) { console.error(err); }
    finally { setDeleting(false); }
  };

  const columns = [
    {
      key: "title", label: "Title", width: "30%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0F4C8A] shrink-0" />
          <span className="font-medium text-sm text-[#0f172a] truncate">{row.title}</span>
        </div>
      ),
    },
    {
      key: "type", label: "Type", width: "10%",
      render: (row) => <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">{row.type}</span>,
    },
    {
      key: "size", label: "Size", width: "10%",
      render: (row) => <span className="text-sm text-[#64748b]">{row.fileSize ?? "—"}</span>,
    },
    {
      key: "class", label: "Class", width: "25%",
      render: (row) => <span className="text-sm text-[#334155]">{row.classSessionId ? sessions.find((s) => s.id === row.classSessionId)?.title ?? "Class Material" : "General"}</span>,
    },
    {
      key: "created", label: "Created", width: "15%",
      render: (row) => <span className="text-sm text-[#64748b]">{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
    {
      key: "actions", label: "Actions", width: "10%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <a href={row.fileUrl} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b]">
            <FileText className="w-3.5 h-3.5" />
          </a>
          <button onClick={() => setDeleteTarget(row)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Study Materials</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage course study materials</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] text-white text-sm font-medium rounded-xl hover:bg-[#0d3f74] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Material
        </button>
      </div>

      <div className="mb-4">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] min-w-[220px]"
        >
          <option value="">Select a course</option>
          {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      <AdminTable
        columns={columns}
        rows={materials.map((m) => ({ ...m, _key: m.id }))}
        loading={loading}
        emptyText={selectedCourse ? "No materials found for this course." : "Select a course to view materials."}
      />

      <MaterialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
        courses={courses}
        sessions={sessions}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.title}
      />
    </div>
  );
};

export default AdminStudyMaterials;