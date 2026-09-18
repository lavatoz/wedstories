import type { TemplateData } from '../../types';

export default function HinduKerala({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#FFF3E0] text-[#E65100] relative overflow-y-auto custom-scrollbar">
      {/* Decorative top border */}
      <div className="h-4 w-full bg-gradient-to-r from-[#FFB300] via-[#FF6F00] to-[#FFB300] sticky top-0 z-20 shadow-md"></div>
      
      <div className="p-8 md:p-12 flex flex-col items-center text-center py-16">
        
        {data.couplePhotoUrl && (
          <div className="mb-12 w-full max-w-[280px] aspect-square mx-auto overflow-hidden rounded-[2rem] shadow-xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mb-8">
           <svg className="w-16 h-16 text-[#FF6F00]" viewBox="0 0 100 100" fill="currentColor">
              {/* simplified lotus shape */}
              <path d="M50 10 Q40 50 10 50 Q40 50 50 90 Q60 50 90 50 Q60 50 50 10 Z" />
           </svg>
        </div>

        <p className="font-medium text-[#FF8F00] uppercase tracking-widest text-sm mb-6">
          Shubh Vivah
        </p>

        <h1 className="text-5xl md:text-6xl font-serif text-[#E65100] font-bold mb-4 drop-shadow-sm">
          {data.brideName || 'Ananya'}
        </h1>
        <span className="text-2xl font-medium text-[#FFB300] my-4 block uppercase tracking-widest">weds</span>
        <h1 className="text-5xl md:text-6xl font-serif text-[#E65100] font-bold mb-8 drop-shadow-sm">
          {data.groomName || 'Arjun'}
        </h1>
        
        <p className="max-w-md text-[#E65100]/80 text-sm font-medium mb-12">
          {data.customMessage || "Together with our families, we joyfully invite you to celebrate our union."}
        </p>

        <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#FFB300] to-transparent mx-auto mb-10"></div>

        <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-[#FFE0B2] shadow-lg mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#E65100] mb-2">{data.weddingDate || '20 December 2026'}</h3>
            <p className="text-sm font-bold text-[#FF8F00] uppercase tracking-wider">{data.weddingTime || '10:30 AM'}</p>
          </div>
          <div className="pt-4 border-t border-[#FFE0B2]">
            <p className="font-bold text-xl text-[#E65100] mb-1">{data.venue || 'Leela Palace'}</p>
            <p className="text-sm text-[#E65100]/80 uppercase tracking-widest">{data.location || 'Kochi, Kerala'}</p>
          </div>
        </div>

        {data.events && data.events.length > 0 && (
          <div className="w-full max-w-md mb-12">
            <h4 className="text-xl font-serif font-bold mb-8 text-[#FF6F00] flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-[#FF6F00]"></span>
              Wedding Events
              <span className="w-8 h-[1px] bg-[#FF6F00]"></span>
            </h4>
            <div className="space-y-6">
              {data.events.map(event => (
                <div key={event.id} className="bg-white/50 p-5 rounded-2xl border border-[#FFE0B2]/50">
                  <p className="font-serif text-xl font-bold text-[#E65100] mb-1">{event.name}</p>
                  <p className="text-sm text-[#FF8F00] font-bold mb-2">{event.date} • {event.time}</p>
                  <p className="text-sm text-[#E65100]/80">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-8 pt-8 border-t border-[#FFB300]/30 w-full max-w-xs">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF8F00] mb-3">RSVP</p>
            <p className="font-bold text-[#E65100] text-lg">{data.rsvpName}</p>
            <p className="text-sm text-[#E65100]/80 mt-1">{data.rsvpPhone}</p>
          </div>
        )}

      </div>
    </div>
  );
}
