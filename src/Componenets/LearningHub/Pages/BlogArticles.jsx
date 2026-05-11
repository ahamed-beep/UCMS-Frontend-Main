import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axiosInstance from "../../../Api/axiosInstance";
import { Link } from "react-router-dom";

const CATEGORY_STYLES = {
  "IELTS Tips":        "bg-[#DBEAFE] text-[#1447E6]",
  "PTE Tips":          "bg-[#DCFCE7] text-[#008236]",
  "Visa Guidelines":   "bg-[#FEF9C3] text-[#854D0E]",
  "Study Abroad Tips": "bg-[#F3E8FF] text-[#8200DB]",
  "Career Advice":     "bg-[#FFEDD4] text-[#CA3500]",
  "Scholarships":      "bg-[#FCE7F3] text-[#BE185D]",
};

const ALL_CATEGORIES = Object.keys(CATEGORY_STYLES);

const BlogArticles = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const results = await Promise.all(
          ALL_CATEGORIES.map((cat) =>
            axiosInstance
              .get("/blogs/published", { params: { category: cat, limit: 1, page: 1 } })
              .then((res) => ({ category: cat, total: res.data.data.total }))
              .catch(() => ({ category: cat, total: 0 }))
          )
        );
        const map = {};
        results.forEach(({ category, total }) => { map[category] = total; });
        setCounts(map);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-inter text-[#0A0A0A] break-all">Blog & Articles</h2>
        <Link to="/blog" className="text-sm text-[#0F4C8A] font-inter font-semibold hover:underline flex items-center gap-1">
          View All Posts <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {ALL_CATEGORIES.map((cat, i) => (
          <div
            key={i}
            className="bg-white border border-[#F3F4F6] rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${CATEGORY_STYLES[cat]}`}>
              {loading ? "..." : `${counts[cat] ?? 0} Articles`}
            </span>
            <h3 className="text-base font-semibold text-gray-900 wrap-break-word">{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogArticles;