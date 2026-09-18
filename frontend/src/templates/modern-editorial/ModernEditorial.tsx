import type { TemplateData } from '../../types';

export default function ModernEditorial({ data }: { data: TemplateData }) {
  const site = data.website;
  const primary = site?.primaryColor || '#8B6B3F';
  const background = site?.backgroundColor || '#F7F4EE';

  return (
    <main
      className="w-full min-h-screen text-[#1D1D1B] overflow-x-hidden"
      style={{ backgroundColor: background }}
    >
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 bg-white/85 backdrop-blur border-b border-black/10">
        <span className="font-serif text-lg">{data.brideName || 'Bride'} &amp; {data.groomName || 'Groom'}</span>
        <div className="hidden md:flex items-center gap-7 text-[10px] uppercase tracking-[0.25em] font-bold">
          <a href="#story">Story</a>
          <a href="#schedule">Details</a>
          {site?.showGallery !== false && <a href="#gallery">Gallery</a>}
          {site?.showRsvp !== false && <a href="#rsvp">RSVP</a>}
        </div>
      </nav>

      <section className="min-h-[calc(100vh-65px)] grid lg:grid-cols-2">
        <div className="relative min-h-[55vh] lg:min-h-[calc(100vh-65px)] overflow-hidden">
          <img
            src={data.couplePhotoUrl || '/templates/couple_placeholder.jpg'}
            alt="The couple"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex items-center px-8 py-16 md:px-16 lg:px-20">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase font-bold tracking-[0.45em] mb-7" style={{ color: primary }}>
              {site?.heroTitle || 'The Wedding Issue'}
            </p>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.82] tracking-[-0.06em] uppercase">
              {data.brideName || 'Ananya'}
              <span className="block text-4xl md:text-5xl my-4 text-black/30">&amp;</span>
              {data.groomName || 'Arjun'}
            </h1>
            <p className="mt-10 max-w-md text-base leading-7 text-black/60">
              {site?.introText || data.customMessage || 'Two lives, one story, and a day we would love to share with you.'}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#schedule" className="px-6 py-3 bg-[#1D1D1B] text-white text-xs uppercase tracking-[0.2em] font-bold">
                Wedding Details
              </a>
              {site?.showGallery !== false && (
                <a href="#gallery" className="px-6 py-3 border border-black/20 text-xs uppercase tracking-[0.2em] font-bold">
                  View Moments
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {site?.showStory !== false && (
        <section id="story" className="px-8 md:px-16 lg:px-24 py-24 md:py-32 border-t border-black/10">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: primary }}>Chapter One</p>
              <h2 className="mt-4 text-5xl md:text-7xl font-serif tracking-tight">{site?.storyTitle || 'Our Story'}</h2>
            </div>
            <div className="space-y-10">
              {(data.story?.length ? data.story : [{
                id: 'default',
                title: 'A new chapter begins',
                date: data.weddingDate,
                description: data.customMessage || 'Our story continues with the people we love, in a place we will always remember.',
                order: 0
              }]).map((item) => (
                <article key={item.id} className="grid md:grid-cols-[120px_1fr] gap-6 border-b border-black/10 pb-10 last:border-0">
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-black/40">{item.date || ''}</div>
                  <div>
                    {item.imageUrl && <img src={item.imageUrl} alt="" className="w-full max-h-80 object-cover mb-6 grayscale" />}
                    <h3 className="text-2xl md:text-3xl font-serif">{item.title}</h3>
                    <p className="mt-3 leading-7 text-black/60">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="schedule" className="px-8 md:px-16 lg:px-24 py-24 md:py-32 bg-[#1D1D1B] text-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: primary }}>The Celebration</p>
          <h2 className="mt-4 text-5xl md:text-7xl font-serif">{site?.scheduleTitle || 'Wedding Details'}</h2>

          <div className="mt-14 border-t border-white/20">
            <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-8 py-8 border-b border-white/15">
              <span className="text-xs uppercase tracking-[0.25em] text-white/40">Wedding</span>
              <span className="font-serif text-2xl">{data.weddingDate || '20 December 2026'}</span>
              <span className="text-sm uppercase tracking-[0.15em]">{data.weddingTime || '10:30 AM'}</span>
            </div>
            <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-8 py-8 border-b border-white/15">
              <span className="text-xs uppercase tracking-[0.25em] text-white/40">Venue</span>
              <span className="font-serif text-2xl">{data.venue || 'Wedding Venue'}</span>
              <span className="text-sm text-white/60">{data.location || 'Kerala, India'}</span>
            </div>
            {(data.events || []).map((event) => (
              <div key={event.id} className="grid md:grid-cols-[1fr_1fr_1fr] gap-8 py-8 border-b border-white/15">
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">{event.name}</span>
                <span className="font-serif text-2xl">{event.date}</span>
                <span className="text-sm text-white/60">{event.time} · {event.venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {site?.showGallery !== false && data.gallery?.length > 0 && (
        <section id="gallery" className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: primary }}>Visual Diary</p>
              <h2 className="mt-4 text-5xl md:text-7xl font-serif">{site?.galleryTitle || 'Moments'}</h2>
            </div>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {data.gallery.map((image) => (
              <figure key={image.id} className="mb-5 break-inside-avoid">
                {image.mediaUrl && <img src={image.mediaUrl} alt={image.caption || ''} className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />}
                {image.caption && <figcaption className="mt-2 text-xs uppercase tracking-[0.15em] text-black/50">{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {site?.showRsvp !== false && (data.rsvpName || data.rsvpPhone) && (
        <section id="rsvp" className="px-8 md:px-16 lg:px-24 py-24 md:py-32 border-t border-black/10">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: primary }}>Kindly Respond</p>
            <h2 className="mt-4 text-5xl md:text-7xl font-serif">{site?.rsvpTitle || 'RSVP'}</h2>
            <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t-2 border-black pt-6">
              <p className="font-serif text-3xl">{data.rsvpName}</p>
              <a href={data.rsvpPhone ? `tel:${data.rsvpPhone.replace(/[^+\d]/g, '')}` : '#'} className="text-sm uppercase tracking-[0.2em] font-bold">
                {data.rsvpPhone}
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="px-8 py-16 text-center border-t border-black/10">
        <p className="font-serif text-3xl">{data.brideName || 'Bride'} &amp; {data.groomName || 'Groom'}</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-black/40">With love, WedStory</p>
      </footer>
    </main>
  );
}
