import type { TemplateData } from '../../types';

export default function MuslimKerala({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#0F3B2C] text-[#E8DCC4] relative overflow-y-auto custom-scrollbar">
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#E8DCC4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center min-h-full text-center py-16">
        
        {data.couplePhotoUrl && (
          <div className="mb-10 w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl p-1 bg-[#174F3C]">
            <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover rounded-full" />
          </div>
        )}

        <div className="border border-[#D4AF37] p-8 rounded-full w-48 h-48 flex items-center justify-center mb-10">
          <p className="font-serif italic text-4xl text-[#D4AF37]">Nikah</p>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-[#E8DCC4] tracking-wide mb-4">
          {data.brideName || 'Ananya'}
        </h1>
        <p className="text-[#D4AF37] text-lg font-serif italic mb-4">and</p>
        <h1 className="text-4xl md:text-5xl font-serif text-[#E8DCC4] tracking-wide mb-8">
          {data.groomName || 'Arjun'}
        </h1>

        <p className="max-w-md text-[#E8DCC4]/80 text-sm italic mb-12">
          {data.customMessage || "In the name of Allah, the most beneficent and merciful, we request the honor of your presence."}
        </p>

        <div className="bg-[#174F3C] w-full max-w-sm p-8 rounded-2xl border border-[#236B52] shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
          <p className="font-medium tracking-widest text-[#D4AF37] mb-2 uppercase text-lg">{data.weddingDate || '20 December 2026'}</p>
          <p className="text-sm opacity-90 mb-8">{data.weddingTime || '10:30 AM'}</p>

          <p className="font-serif text-2xl text-white mb-2">{data.venue || 'Leela Palace'}</p>
          <p className="text-sm opacity-80 mt-1 uppercase tracking-widest">{data.location || 'Kochi, Kerala'}</p>
        </div>

        {data.events && data.events.length > 0 && (
          <div className="w-full max-w-sm mb-12 text-left">
            <h4 className="text-lg font-serif font-bold mb-6 text-[#D4AF37] border-b border-[#236B52] pb-3 text-center">Events</h4>
            <div className="space-y-6">
              {data.events.map(event => (
                <div key={event.id} className="bg-[#134433] p-5 rounded-xl border border-[#236B52]/50">
                  <p className="font-serif text-[#E8DCC4] text-xl mb-1">{event.name}</p>
                  <p className="text-sm text-[#D4AF37] mb-2">{event.date} • {event.time}</p>
                  <p className="text-sm opacity-80 italic">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-8 pt-8 w-full max-w-xs border-t border-[#D4AF37]/30">
            <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3">RSVP</p>
            <p className="font-bold text-[#E8DCC4] text-lg">{data.rsvpName}</p>
            <p className="text-sm opacity-90 mt-1">{data.rsvpPhone}</p>
          </div>
        )}

      </div>
    </div>
  );
}
