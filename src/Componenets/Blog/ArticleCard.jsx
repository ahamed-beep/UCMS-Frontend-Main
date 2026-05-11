 export  const ArticleCard = ({ article, idx, expandedCards, toggleCard }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow ">
    <div className="h-44 overflow-hidden shrink-0">
      <img className="w-full h-full object-cover" src={article.imageUrl} alt={article.title} />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#0F4C8A] font-inter text-xs font-medium">
          {article.category}
        </span>
        <span className="text-xs text-[#6A7282] font-inter">{article.readTime}</span>
      </div>
      <h3 className="text-lg font-bold text-[#1E2939] font-inter mb-2 leading-snug break-words">
        {article.title}
      </h3>
      <p className="text-gray-600 text-sm mb-3 leading-relaxed break-words">
        {article.excerpt}
      </p>

      {expandedCards[idx] && (
        <div className="border-t border-gray-100 pt-3 mb-4 max-h-48 overflow-y-auto">
          <p className="text-[#4A5565] font-inter text-xs leading-relaxed break-all">
            {article.description}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 text-xs text-[#6A7282] font-inter">
          <span className="flex items-center gap-1 shrink-0">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {article.author}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <button
          onClick={() => toggleCard(idx)}
          className="text-orange-500 text-xs font-semibold hover:text-orange-600 transition-colors whitespace-nowrap ml-2 shrink-0"
        >
          {expandedCards[idx] ? "Show Less ↑" : "Read More →"}
        </button>
      </div>
    </div>
  </div>
);