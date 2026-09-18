import type { TemplateData } from '../../types';

export default function DarkLuxury({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#121212] text-[#E0E0E0] relative overflow-y-auto custom-scrollbar font-sans p-6 md:p-8">
      <div className="absolute inset-0 border border-white/10 m-4 md:m-6 pointer-events-none z-20"></div>
      
      <div className="flex flex-col h-full min-h-[800px] p-6 md:p-10 relative z-10">
        
        <div className="text-right mb-16 flex justify-between items-start">
          {data.couplePhotoUrl ? (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-[#D4AF37]/50">
              <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover filter grayscale opacity-80" />
            </div>
          ) : (
            <div></div>
          )}
          <p className="text-xs uppercase tracking-[0.5em] text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2">Invitation</p>
        </div>
        
        <div className="my-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest text-white uppercase mb-4">
            {data.brideName || 'Ananya'}
          </h1>
          <div className="flex items-center gap-6 my-6">
            <div className="h-[1px] flex-1 bg-white/10"></div>
            <p className="text-[#D4AF37] font-serif text-3xl italic">&</p>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-widest text-white uppercase mt-4 text-right">
            {data.groomName || 'Arjun'}
          </h1>
          
          <p className="max-w-md ml-auto text-right text-white/50 text-sm font-light mt-12 uppercase tracking-widest leading-loose">
            {data.customMessage || "Join us for an evening of celebration"}
          </p>
        </div>

        <div className="space-y-10 border-l border-[#D4AF37]/30 pl-8 mb-16">
          <div className="relative">
            <div className="absolute -left-[33px] top-2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]"></div>
            <p className="font-bold tracking-widest text-white uppercase mb-2 text-lg">{data.weddingDate || '20 December 2026'}</p>
            <p className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase">{data.weddingTime || '10:30 AM'}</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[33px] top-2 w-2 h-2 bg-white/30 rounded-full"></div>
            <p className="font-serif text-2xl text-white mb-2">{data.venue || 'Leela Palace'}</p>
            <p className="text-xs tracking-[0.2em] text-white/60 uppercase">{data.location || 'Kochi, Kerala'}</p>
          </div>
        </div>
        
        {data.events && data.events.length > 0 && (
          <div className="w-full mb-16">
            <h4 className="text-xs uppercase font-bold tracking-[0.4em] mb-8 text-[#D4AF37]">Events</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.events.map(event => (
                <div key={event.id} className="text-sm bg-white/5 p-6 rounded-lg border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                  <p className="font-light text-white text-xl uppercase tracking-widest mb-4">{event.name}</p>
                  <p className="text-[#D4AF37] font-medium tracking-widest text-xs mb-2">{event.date} • {event.time}</p>
                  <p className="text-white/50 uppercase tracking-wider text-xs">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-auto border-t border-white/10 pt-8 flex justify-between items-end">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-2">RSVP TO</p>
              <p className="font-light tracking-widest text-white uppercase">{data.rsvpName}</p>
            </div>
            <p className="text-xs tracking-widest text-[#D4AF37]">{data.rsvpPhone}</p>
          </div>
        )}

      </div>
    </div>
  );
}
