import type { TemplateData } from '../../types';

export default function Floral({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-[#FDFBF7] text-[#5C5C5C] relative overflow-y-auto custom-scrollbar pb-24">
      <img src="/templates/floral_top.jpg" alt="floral top" className="w-full h-48 md:h-64 object-cover opacity-80" />
      
      <div className="px-8 md:px-12 py-16 text-center bg-white/90 backdrop-blur-md -mt-24 mx-6 md:mx-10 rounded-[2rem] shadow-xl relative z-10 border border-white">
        
        {data.couplePhotoUrl && (
          <div className="mb-10 w-32 h-32 mx-auto overflow-hidden rounded-full shadow-lg border-4 border-white">
            <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <h1 className="text-5xl md:text-6xl font-script text-[#8B6E76] mb-8 leading-tight">
          {data.brideName || 'Ananya'}
          <br /><span className="text-3xl text-gray-400 font-serif my-4 block">&amp;</span>
          {data.groomName || 'Arjun'}
        </h1>
        
        <p className="max-w-xs mx-auto text-gray-500 text-sm font-medium mb-12 italic leading-relaxed">
          {data.customMessage || "Together with our families, we invite you to share in our joy."}
        </p>

        <p className="text-sm uppercase tracking-widest text-gray-400 mb-8 border-t border-gray-100 pt-8">The Celebration</p>

        <div className="mb-10 font-serif text-2xl text-[#4A4A4A]">
          <p className="mb-2 text-[#8B6E76]">{data.weddingDate || '20 December 2026'}</p>
          <p className="text-base italic text-gray-500 font-sans">{data.weddingTime || '10:30 AM'}</p>
        </div>

        <div className="text-sm text-gray-600 mb-12">
          <p className="font-bold uppercase tracking-wider mb-1">{data.venue || 'Leela Palace'}</p>
          <p className="text-gray-500">{data.location || 'Kochi, Kerala'}</p>
        </div>
        
        {data.events && data.events.length > 0 && (
          <div className="w-full mb-12">
            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-8 border-t border-gray-100 pt-8">Festivities</h4>
            <div className="space-y-6">
              {data.events.map(event => (
                <div key={event.id} className="text-sm">
                  <p className="font-serif text-lg text-[#8B6E76] mb-1">{event.name}</p>
                  <p className="text-gray-500 font-medium mb-1">{event.date} at {event.time}</p>
                  <p className="text-gray-400 italic">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-8 border-t border-gray-100 pt-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Kindly RSVP</p>
            <p className="font-medium text-[#4A4A4A]">{data.rsvpName}</p>
            <p className="text-sm text-gray-500 mt-1">{data.rsvpPhone}</p>
          </div>
        )}
      </div>
      
      <img src="/templates/floral_bottom.jpg" alt="floral bottom" className="w-full h-48 md:h-64 object-cover opacity-60 mt-12 absolute bottom-0 z-0 pointer-events-none" />
    </div>
  );
}
