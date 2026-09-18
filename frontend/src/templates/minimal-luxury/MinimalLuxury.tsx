import type { TemplateData } from '../../types';

export default function MinimalLuxury({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-white text-gray-900 relative overflow-y-auto custom-scrollbar p-6 md:p-12">
      <div className="flex flex-col h-full min-h-full border border-gray-200 p-8 md:p-12 relative">
        
        {data.couplePhotoUrl && (
          <div className="mb-12 w-full max-w-[280px] aspect-[3/4] mx-auto overflow-hidden">
            <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        )}

        <div className="text-center mt-4">
          <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-2">
            {data.brideName || 'Ananya'}
          </h1>
          <p className="text-gray-400 font-serif italic text-xl my-4">and</p>
          <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-8">
            {data.groomName || 'Arjun'}
          </h1>
          
          <p className="max-w-sm mx-auto text-gray-500 text-sm font-light mb-16 leading-relaxed">
            {data.customMessage || "Request the honor of your presence as we celebrate our marriage."}
          </p>
        </div>

        <div className="mb-16 text-center border-y border-gray-100 py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-medium">Are getting married</p>
          
          <div className="font-serif text-3xl mb-3">
            {data.weddingDate || '20 December 2026'}
          </div>
          <div className="text-gray-500 text-sm tracking-widest uppercase font-medium">
            {data.weddingTime || '10:30 AM'}
          </div>
        </div>

        <div className="text-center mb-16">
          <p className="font-medium text-lg uppercase tracking-wider">{data.venue || 'Leela Palace'}</p>
          <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">{data.location || 'Kochi, Kerala'}</p>
        </div>
        
        {data.events && data.events.length > 0 && (
          <div className="w-full mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-medium border-b border-gray-100 pb-4">Schedule of Events</p>
            <div className="space-y-8">
              {data.events.map(event => (
                <div key={event.id} className="text-sm">
                  <p className="font-serif text-xl mb-1">{event.name}</p>
                  <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-2">{event.date} / {event.time}</p>
                  <p className="text-gray-400 italic">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">RSVP</p>
            <p className="font-medium">{data.rsvpName}</p>
            <p className="text-sm text-gray-500 mt-1">{data.rsvpPhone}</p>
          </div>
        )}

      </div>
    </div>
  );
}
