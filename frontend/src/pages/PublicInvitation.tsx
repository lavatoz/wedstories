import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TemplateRenderer from '../templates/TemplateRenderer';
import { Share2 } from 'lucide-react';
import type { WeddingData } from '../types';

export default function PublicInvitation() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<{ templateId: string, data: WeddingData } | null>(null);
  const [error, setError] = useState<'not-found' | 'corrupted' | 'network-error' | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      try {
        const { api } = await import('../services/api');
        const apiData = await api.getInvitation(slug);
        setData(apiData);
      } catch (error: any) {
        // If 404 from server, do NOT fall back to local storage
        if (error.name === 'ApiError' && error.status === 404) {
          setError('not-found');
          return;
        }
        
        // Otherwise (network error, server down), try localStorage fallback
        console.warn("API failed or unavailable, falling back to localStorage", error);
        const saved = localStorage.getItem(`invite_${slug}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (!parsed.templateId || !parsed.data) throw new Error("Invalid format");
            setData(parsed);
          } catch (err) {
            setError('corrupted');
          }
        } else {
          // If no local storage and no 404, it's a network error
          setError('network-error');
        }
      }
    };

    loadData();
  }, [slug]);

  if (error === 'not-found' || error === 'corrupted' || error === 'network-error') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
          <h1 className="text-3xl font-serif text-gray-900 mb-4">
            {error === 'not-found' ? 'Invitation Not Found' : error === 'network-error' ? 'Network Error' : 'Data Corrupted'}
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {error === 'not-found' 
              ? "We couldn't find an invitation at this link. Please check the URL and try again."
              : error === 'network-error'
              ? "Unable to connect to invitation service. Please try again."
              : "The invitation data seems to be corrupted or invalid."}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-[var(--color-wed-gold)] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full"
          >
            Create Your Own
          </button>
        </div>
      </div>
    );
  }

  if (!data) return <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-gray-400 font-medium">Loading Invitation...</div>;


  const handleShare = () => {
    const url = window.location.href;
    const text = `You're invited to ${data.data.brideName} & ${data.data.groomName}'s wedding ❤️\nView the invitation here: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-grid-pattern flex justify-center items-center w-full relative p-0 md:p-8">
      <div className="w-full h-screen md:h-auto max-w-[420px] md:max-h-[850px] bg-white relative md:rounded-[2.5rem] md:shadow-2xl overflow-hidden md:border-[10px] border-gray-900 mx-auto flex flex-col">
        {/* Notch simulation on desktop */}
        <div className="hidden md:flex absolute top-0 inset-x-0 h-6 justify-center z-[100] pointer-events-none">
           <div className="w-32 h-6 bg-gray-900 rounded-b-xl"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar relative z-0">
          <TemplateRenderer templateId={data.templateId} data={data.data} />
        </div>
      </div>

      {/* Floating Action Button for Share */}
      <div className="fixed bottom-6 right-6 md:right-10 z-50">
        <button 
          onClick={handleShare}
          className="bg-white text-gray-900 p-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3 group border border-gray-100 hover:bg-gray-50"
        >
          <Share2 size={20} className="text-[var(--color-wed-gold-dark)]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap font-medium pr-2 text-sm tracking-wide">
            Share on WhatsApp
          </span>
        </button>
      </div>
    </div>
  );
}
