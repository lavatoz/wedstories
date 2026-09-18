import type { TemplateData } from '../../types';

export default function ModernEditorial({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#EAE8E3] text-[#1D1D1B] relative overflow-y-auto custom-scrollbar pb-24">
      <div className="h-[50vh] md:h-[60vh] w-full overflow-hidden relative">
        <img src={data.couplePhotoUrl || "/templates/couple_placeholder.jpg"} alt="couple" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-105" />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
      </div>
      
      <div className="p-8 md:p-12 -mt-16 bg-[#EAE8E3] relative z-10 mx-6 md:mx-12 shadow-2xl border border-black/5">
        <h2 className="text-[10px] uppercase font-bold tracking-[0.4em] mb-4 text-[#8C8B88]">The Wedding Issue</h2>
        
        <h1 className="text-6xl md:text-7xl font-serif leading-none tracking-tighter uppercase mb-8">
          {data.brideName || 'Ananya'}
          <br />
          <span className="text-[#A3A099] text-5xl">&amp;</span>
          <br />
          {data.groomName || 'Arjun'}
        </h1>
        
        <p className="max-w-md text-sm font-medium mb-10 leading-relaxed text-[#5A5956]">
          {data.customMessage || "You are exclusively invited to witness the union of two souls."}
        </p>

        <div className="grid grid-cols-2 gap-8 border-t-2 border-black pt-8 mb-12">
          <div>
            <p className="text-xs uppercase font-bold tracking-[0.2em] mb-2 text-[#8C8B88]">When</p>
            <p className="font-serif text-2xl mb-1">{data.weddingDate || '20 Dec 2026'}</p>
            <p className="text-sm font-medium uppercase tracking-widest">{data.weddingTime || '10:30 AM'}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-bold tracking-[0.2em] mb-2 text-[#8C8B88]">Where</p>
            <p className="font-serif text-2xl mb-1">{data.venue || 'Leela Palace'}</p>
            <p className="text-sm font-medium uppercase tracking-widest">{data.location || 'Kochi, Kerala'}</p>
          </div>
        </div>
        
        {data.events && data.events.length > 0 && (
          <div className="w-full mb-12 border-t border-black/20 pt-8">
            <h4 className="text-xs uppercase font-bold tracking-[0.4em] mb-8 text-[#8C8B88]">Itinerary</h4>
            <div className="space-y-6">
              {data.events.map(event => (
                <div key={event.id} className="grid grid-cols-[1fr_2fr] gap-4 items-baseline border-b border-black/10 pb-6 last:border-0">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">{event.date}</p>
                    <p className="text-xs text-[#8C8B88] font-medium">{event.time}</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl mb-1 uppercase tracking-tight">{event.name}</p>
                    <p className="text-sm text-[#5A5956]">{event.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-8 pt-8 border-t-2 border-black">
            <p className="text-xs uppercase font-bold tracking-[0.4em] mb-4 text-[#8C8B88]">RSVP</p>
            <div className="flex justify-between items-end">
              <p className="font-serif text-2xl uppercase tracking-tighter">{data.rsvpName}</p>
              <p className="text-sm font-medium tracking-widest">{data.rsvpPhone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
