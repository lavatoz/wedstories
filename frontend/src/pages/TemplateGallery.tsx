import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { templates } from '../utils/templates';
import { useEditorStore } from '../store/useEditorStore';

const categories = ['All', 'Kerala', 'Traditional', 'Modern', 'Minimal', 'Floral', 'Luxury', 'Christian', 'Muslim', 'Hindu', 'Dark', 'Editorial'];

export default function TemplateGallery() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const setTemplate = useEditorStore((state) => state.setTemplate);
  const navigate = useNavigate();

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = filter === 'All' || t.category === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (template: typeof templates[0]) => {
    setTemplate(template);
    navigate(`/create/${template.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white py-12 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link to="/" className="text-gray-500 hover:text-gray-900 font-medium text-sm mb-4 inline-block transition-colors">← Back to Home</Link>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900">Discover Designs</h1>
              <p className="text-gray-500 mt-2">Find the perfect aesthetic for your special day.</p>
            </div>
            <input 
              type="text" 
              placeholder="Search inspiration..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-72 px-5 py-3 bg-gray-100 border-transparent rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full pb-2 mt-8 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  filter === c 
                    ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 mt-12">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative w-full">
                <img 
                  src={template.previewImage} 
                  alt={template.name} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">
                    {template.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">{template.name}</h3>
                  <p className="text-white/70 line-clamp-2 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{template.description}</p>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template);
                    }}
                    className="w-full bg-white text-gray-900 px-6 py-3.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
                  >
                    Use This Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredTemplates.length === 0 && (
          <div className="text-center py-32 text-gray-500 text-xl font-serif">
            No designs found matching your vision.
          </div>
        )}
      </main>
    </div>
  );
}
