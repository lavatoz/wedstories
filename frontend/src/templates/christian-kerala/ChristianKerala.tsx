import type { TemplateData } from '../../types';

export default function ChristianKerala({ data }: { data: TemplateData }) {
  return (
    <div className="w-full min-h-[800px] h-full bg-slate-50 text-slate-800 relative overflow-y-auto custom-scrollbar p-6 md:p-8">
      <div className="border-4 border-double border-slate-300 min-h-full p-8 md:p-12 flex flex-col items-center text-center bg-white rounded-lg shadow-sm relative">
        
        {data.couplePhotoUrl && (
          <div className="mb-10 w-full max-w-[280px] aspect-[4/5] mx-auto overflow-hidden rounded-t-full shadow-md border-8 border-slate-50">
            <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mb-8">
          <svg className="w-12 h-12 text-slate-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2v20M8 8h8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="font-serif italic text-xl text-slate-500 mb-6">Holy Matrimony of</p>

        <h1 className="text-4xl md:text-5xl font-serif text-slate-800 uppercase tracking-widest mb-4">
          {data.brideName || 'Ananya'}
        </h1>
        <p className="text-sm text-slate-400 uppercase tracking-widest mb-4 font-bold">AND</p>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-800 uppercase tracking-widest mb-10">
          {data.groomName || 'Arjun'}
        </h1>
        
        <p className="max-w-md text-slate-500 text-sm italic mb-12">
          {data.customMessage || "Together with their families, request the honor of your presence as they exchange vows."}
        </p>

        <div className="w-full max-w-sm mx-auto border-t border-slate-200 pt-10 mb-10">
          <p className="font-serif text-2xl mb-2 text-slate-900">{data.weddingDate || '20 December 2026'}</p>
          <p className="text-slate-500 mb-8 uppercase tracking-widest text-sm font-bold">{data.weddingTime || '10:30 AM'}</p>
          
          <p className="font-serif text-xl text-slate-800 mb-2">{data.venue || 'St. Mary\'s Cathedral'}</p>
          <p className="text-sm text-slate-500 uppercase tracking-widest">{data.location || 'Kochi, Kerala'}</p>
        </div>
        
        {data.events && data.events.length > 0 && (
          <div className="w-full mt-6 mb-12 max-w-sm mx-auto">
            <h4 className="text-sm font-bold mb-6 uppercase tracking-[0.2em] text-slate-400 border-b border-slate-200 pb-4">Reception & Events</h4>
            <div className="space-y-6">
              {data.events.map(event => (
                <div key={event.id} className="text-sm">
                  <p className="font-serif text-lg text-slate-800 mb-1">{event.name}</p>
                  <p className="text-slate-500 font-medium">{event.date} at {event.time}</p>
                  <p className="text-slate-500 italic mt-1">{event.venue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(data.rsvpName || data.rsvpPhone) && (
          <div className="mt-auto pt-8 w-full max-w-xs mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">Kindly RSVP</p>
            <p className="font-medium text-slate-800">{data.rsvpName}</p>
            <p className="text-sm text-slate-500 mt-1">{data.rsvpPhone}</p>
          </div>
        )}

      </div>
    </div>
  );
}
