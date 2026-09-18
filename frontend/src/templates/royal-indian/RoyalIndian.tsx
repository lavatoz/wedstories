import type { TemplateData } from '../../types';

export default function RoyalIndian({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#3B0918] text-[#F9E5C8] relative overflow-y-auto custom-scrollbar">
      <div className="p-8 md:p-12 text-center flex flex-col justify-center min-h-full py-16">
        
        <div className="border-2 border-[#D4AF37] p-8 md:p-12 rounded-t-[100px] relative">
          
          {data.couplePhotoUrl && (
            <div className="mb-10 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl mx-auto -mt-24 bg-[#3B0918]">
              <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover rounded-full" />
            </div>
          )}

          <p className="font-serif italic text-xl md:text-2xl text-[#D4AF37] mb-8">The Royal Celebration</p>
          
          <h1 className="text-5xl md:text-6xl font-serif text-[#F9E5C8] tracking-wide mb-2 uppercase drop-shadow-md">
            {data.brideName || 'Ananya'}
          </h1>
          <p className="text-[#D4AF37] text-2xl md:text-3xl my-6 font-serif italic">&amp;</p>
          <h1 className="text-5xl md:text-6xl font-serif text-[#F9E5C8] tracking-wide mb-12 uppercase drop-shadow-md">
            {data.groomName || 'Arjun'}
          </h1>
          
          <p className="max-w-md mx-auto text-[#F9E5C8]/80 text-sm font-medium mb-12 italic leading-relaxed">
            {data.customMessage || "Together with our families, we invite you to be part of our grand celebration."}
          </p>

          <div className="w-32 h-[2px] bg-[#D4AF37] mx-auto mb-12"></div>

          <p className="font-sans font-bold uppercase tracking-[0.3em] text-lg text-[#D4AF37] mb-4">
            {data.weddingDate || '20 December 2026'}
          </p>
          <p className="font-sans uppercase tracking-[0.2em] text-sm opacity-90 mb-10">
            {data.weddingTime || '10:30 AM'}
          </p>

          <p className="font-serif text-3xl mb-2 text-[#D4AF37]">{data.venue || 'Leela Palace'}</p>
          <p className="text-sm tracking-widest opacity-80 uppercase">{data.location || 'Kochi, Kerala'}</p>
          
          {data.events && data.events.length > 0 && (
            <div className="mt-16 mb-8 w-full max-w-sm mx-auto">
              <div className="w-full h-[1px] bg-[#D4AF37]/50 mb-8"></div>
              <h4 className="text-lg font-serif mb-8 text-[#D4AF37] uppercase tracking-widest">Events</h4>
              <div className="space-y-8">
                {data.events.map(event => (
                  <div key={event.id} className="text-sm">
                    <p className="font-bold text-[#F9E5C8] text-lg uppercase tracking-wider mb-2">{event.name}</p>
                    <p className="text-[#D4AF37] font-medium">{event.date} • {event.time}</p>
                    <p className="opacity-70 mt-1 italic">{event.venue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(data.rsvpName || data.rsvpPhone) && (
            <div className="mt-12 pt-8 w-full max-w-xs mx-auto border-t border-[#D4AF37]/30">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">RSVP</p>
              <p className="font-bold text-[#F9E5C8] text-lg">{data.rsvpName}</p>
              <p className="text-sm text-[#F9E5C8]/80 mt-1">{data.rsvpPhone}</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
