import type { TemplateData } from '../../types';

export default function KeralaTraditional({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#FAF5E9] text-[#7A1D1D] relative overflow-y-auto custom-scrollbar">
      {/* Decorative Border */}
      <div className="absolute inset-4 border-2 border-[#D4AF37] rounded-xl pointer-events-none z-10" />
      <div className="absolute inset-5 border border-[#D4AF37] opacity-50 rounded-lg pointer-events-none z-10" />

      <div className="relative z-20 p-10 py-16 flex flex-col items-center text-center min-h-full">
        
        {/* Top Ornament */}
        <div className="w-16 h-16 mb-8 text-[#D4AF37]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C60 30 90 40 100 50 C90 60 60 70 50 100 C40 70 10 60 0 50 C10 40 40 30 50 0 Z" />
          </svg>
        </div>
        
        {data.couplePhotoUrl && (
          <div className="mb-10 w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl mx-auto">
            <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#AA8A2A]">
          Join us in celebrating
        </p>

        <h1 className="text-5xl font-serif font-bold text-[#7A1D1D] mb-6 leading-tight">
          {data.brideName || 'Ananya'}
          <br />
          <span className="text-3xl text-[#D4AF37] italic font-normal">&amp;</span>
          <br />
          {data.groomName || 'Arjun'}
        </h1>

        <p className="max-w-xs text-sm opacity-90 mb-12 font-medium leading-relaxed">
          {data.customMessage || "Together with their families, request the honor of your presence at their wedding."}
        </p>

        <div className="bg-[#7A1D1D] w-full h-[1px] mb-10 relative">
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF5E9] px-4 text-[#D4AF37] text-xl font-serif">
             ❖
           </div>
        </div>

        <div className="space-y-6 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-1">{data.weddingDate || '20 December 2026'}</h3>
            <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold">{data.weddingTime || '10:30 AM'}</p>
          </div>
          <div>
            <p className="font-bold text-[#7A1D1D] text-lg uppercase tracking-wider">{data.venue || 'Leela Palace'}</p>
            <p className="text-sm opacity-90 font-medium mt-1">{data.location || 'Kochi, Kerala'}</p>
          </div>
        </div>

        {data.events && data.events.length > 0 && (
          <div className="w-full mt-8 mb-12">
            <h4 className="text-lg font-serif font-bold mb-8 uppercase tracking-widest text-[#D4AF37]">Festivities</h4>
            <div className="space-y-8">
              {data.events.map(event => (
                <div key={event.id} className="text-sm relative">
                  <p className="font-bold text-[#7A1D1D] text-base uppercase tracking-wider mb-1">{event.name}</p>
                  <p className="opacity-90 font-medium">{event.date} • {event.time}</p>
                  <p className="opacity-80 italic mt-1">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-8 pt-8 border-t border-[#D4AF37]/30 w-full">
            <p className="text-xs tracking-[0.2em] uppercase text-[#AA8A2A] mb-3">RSVP</p>
            <p className="font-bold text-[#7A1D1D]">{data.rsvpName}</p>
            <p className="text-sm opacity-90 mt-1">{data.rsvpPhone}</p>
          </div>
        )}

      </div>
    </div>
  );
}
