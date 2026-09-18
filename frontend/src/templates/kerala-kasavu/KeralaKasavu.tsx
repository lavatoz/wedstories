import type { TemplateData } from '../../types';

export default function KeralaKasavu({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#FFFFF0] text-gray-800 relative overflow-y-auto custom-scrollbar">
      {/* Kasavu Gold Border */}
      <div className="absolute top-0 bottom-0 left-3 w-4 md:w-6 bg-gradient-to-b from-[#C5A059] via-[#E2C974] to-[#C5A059] shadow-lg z-10" />
      <div className="absolute top-0 bottom-0 right-3 w-4 md:w-6 bg-gradient-to-b from-[#C5A059] via-[#E2C974] to-[#C5A059] shadow-lg z-10" />

      <div className="px-10 md:px-16 py-20 flex flex-col items-center text-center relative z-20">
        
        {data.couplePhotoUrl ? (
          <div className="mb-12">
             <img src={data.couplePhotoUrl} alt="Couple" className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-[#C5A059] p-1 shadow-md bg-white" />
          </div>
        ) : (
          <div className="mb-12">
             <img src="/templates/couple_placeholder.jpg" alt="floral" className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#C5A059] p-1 opacity-70" />
          </div>
        )}

        <p className="text-sm uppercase tracking-[0.2em] text-[#A67C00] font-medium mb-6">
          We invite you
        </p>

        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
          {data.brideName || 'Ananya'}
        </h1>
        <span className="text-2xl text-[#C5A059] italic my-2 block">&amp;</span>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-10">
          {data.groomName || 'Arjun'}
        </h1>
        
        <p className="max-w-xs text-sm text-gray-600 mb-12 italic leading-relaxed">
          {data.customMessage || "Request the pleasure of your company to celebrate our auspicious union."}
        </p>

        <div className="space-y-6 bg-white/80 p-8 rounded-xl shadow-md border border-[#E2C974]/50 w-full max-w-sm mb-12 backdrop-blur-sm">
          <div>
            <p className="font-bold tracking-widest text-[#A67C00] mb-2 uppercase text-lg">{data.weddingDate || '20 December 2026'}</p>
            <p className="text-gray-600 font-medium">{data.weddingTime || '10:30 AM'}</p>
          </div>
          <div className="pt-4 border-t border-[#E2C974]/30">
            <p className="font-serif text-2xl text-gray-900 mb-1">{data.venue || 'Leela Palace'}</p>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">{data.location || 'Kochi, Kerala'}</p>
          </div>
        </div>

        {data.events && data.events.length > 0 && (
          <div className="w-full max-w-sm text-left mb-12">
            <h3 className="font-serif text-2xl text-center mb-8 border-b border-[#E2C974] pb-4 text-[#A67C00]">Other Events</h3>
            {data.events.map(event => (
              <div key={event.id} className="mb-6 flex justify-between border-b border-gray-200 pb-4 last:border-0 items-end">
                <div className="pr-4">
                  <p className="font-bold text-gray-800 text-lg mb-1">{event.name}</p>
                  <p className="text-sm text-gray-500 italic">{event.venue}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[#A67C00]">{event.date}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-8 pt-8 w-full max-w-xs text-center border-t border-[#E2C974]">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A67C00] mb-3">RSVP</p>
            <p className="font-bold text-gray-900">{data.rsvpName}</p>
            <p className="text-sm text-gray-600 mt-1">{data.rsvpPhone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
