import { useState, useEffect } from "react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import axiosInstance from "../../Api/axiosInstance";
import { ArticleCard } from "./ArticleCard.jsx";

const categories = [
  "All Posts",
  "IELTS Tips",
  "PTE Tips",
  "Visa Guidelines",
  "Study Abroad Tips",
  "Career Advice",
  "Scholarships",
];



const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [showMore, setShowMore] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [featuredExpanded, setFeaturedExpanded] = useState(false);

  const [featuredPost, setFeaturedPost] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get('/blogs/featured');
        setFeaturedPost(res.data.data);
      } catch (error) {
        console.error('Featured fetch error:', error);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: showMore ? 20 : 6,
          ...(activeCategory !== "All Posts" && { category: activeCategory }),
        };
        const res = await axiosInstance.get('/blogs/published', { params });
        setArticles(res.data.data.data);
      } catch (error) {
        console.error('Blogs fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [activeCategory, showMore]);

  const toggleCard = (idx) => {
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const showFeatured =
    activeCategory === "All Posts" ||
    featuredPost?.category === activeCategory;

  const col1 = articles.filter((_, i) => i % 3 === 0);
  const col2 = articles.filter((_, i) => i % 3 === 1);
  const col3 = articles.filter((_, i) => i % 3 === 2);

  return (
    <div>
      <Navbar />
      <Head
        title="Blog & Resources"
        subtitle="Expert insights, tips, and guides for your study abroad journey"
      />

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 font-inter rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-gray-200 hover:border-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {showFeatured && featuredPost && (
            <>
              <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter mb-4 wrap-break-word">Featured Post</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-12 ">
                <div className=" grid md:grid-cols-2">
                  <div className="h-[260px] overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#0F4C8A] font-inter text-xs font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-[#4A5565] font-inter">{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A0A0A] font-inter mb-3 leading-snug wrap-break-word">
                      {featuredPost.title}
                    </h3>
                    <p className="text-[#4A5565] font-inter text-sm mb-5 leading-relaxed wrap-break-word">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#4A5565] font-inter mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <button
                      onClick={() => setFeaturedExpanded((prev) => !prev)}
                      className="text-[#FF6B35] text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all w-fit"
                    >
                      {featuredExpanded ? "Show Less ↑" : "Read More →"}
                    </button>
                  </div>
                </div>

                {featuredExpanded && (
                  <div className="px-8 pb-8 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed wrap-break-word">
                      {featuredPost.description}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <h2 className="text-2xl font-bold text-[#1E2939] font-inter mb-4">Latest Articles</h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-6 flex-1 min-w-0">
                {col1.map((article) => {
                  const idx = articles.indexOf(article);
                  return (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      idx={idx}
                      expandedCards={expandedCards}
                      toggleCard={toggleCard}
                    />
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6 flex-1 min-w-0">
                {col2.map((article) => {
                  const idx = articles.indexOf(article);
                  return (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      idx={idx}
                      expandedCards={expandedCards}
                      toggleCard={toggleCard}
                    />
                  );
                })}
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-6 flex-1 min-w-0">
                {col3.map((article) => {
                  const idx = articles.indexOf(article);
                  return (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      idx={idx}
                      expandedCards={expandedCards}
                      toggleCard={toggleCard}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {articles.length === 0 && !loading && (
            <p className="text-center text-gray-500 py-12">No articles in this category yet.</p>
          )}

          {!showMore && articles.length >= 6 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowMore(true)}
                className="px-8 py-3 rounded-lg bg-[#FF6B35] font-inter text-white font-semibold hover:bg-orange-600 transition-colors shadow-sm"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;