import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditorStore } from '../store/useEditorStore';
import { templates } from '../utils/templates';
import TemplateRenderer from '../templates/TemplateRenderer';
import { ChevronRight, ChevronLeft, Plus, Trash2, Upload, Music as MusicIcon, Volume2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { deleteFile } from '../utils/indexedDb';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB

export default function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { selectedTemplate, setTemplate, weddingData, updateData } = useEditorStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewOpenMobile, setIsPreviewOpenMobile] = useState(false);

  useEffect(() => {
    if (!selectedTemplate && templateId) {
      const template = templates.find(t => t.slug === templateId);
      if (template) {
        setTemplate(template);
      } else {
        navigate('/templates');
      }
    }
  }, [selectedTemplate, templateId, navigate, setTemplate]);

  if (!selectedTemplate) return null;

  const totalSteps = 5;
  const handleNext = () => setCurrentStep(p => Math.min(p + 1, totalSteps));
  const handlePrev = () => setCurrentStep(p => Math.max(p - 1, 1));

  const addEvent = () => {
    updateData({
      events: [...weddingData.events, { id: uuidv4(), name: '', date: '', time: '', venue: '', location: '', order: weddingData.events.length }]
    });
  };

  const removeEvent = (id: string) => {
    updateData({
      events: weddingData.events.filter(e => e.id !== id)
    });
  };

  const updateEvent = (id: string, field: string, value: string) => {
    updateData({
      events: weddingData.events.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };
  
  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const newEvents = [...weddingData.events];
    if (direction === 'up' && index > 0) {
      [newEvents[index], newEvents[index - 1]] = [newEvents[index - 1], newEvents[index]];
    } else if (direction === 'down' && index < newEvents.length - 1) {
      [newEvents[index], newEvents[index + 1]] = [newEvents[index + 1], newEvents[index]];
    }
    updateData({ events: newEvents });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'audio', field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = type === 'image' ? MAX_IMAGE_SIZE : MAX_AUDIO_SIZE;
    if (file.size > maxSize) {
      alert(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      return;
    }
    
    if (type === 'image' && !file.type.startsWith('image/')) {
      alert("Please select a valid image file.");
      return;
    }
    if (type === 'audio' && !file.type.startsWith('audio/')) {
      alert("Please select a valid audio file.");
      return;
    }

    try {
      // API upload
      const { api } = await import('../services/api');
      const { id, url } = await api.uploadMedia(file);
      
      // Delete old file if exists
      const oldId = type === 'image' ? (weddingData as any)[field] : weddingData.music?.audioId;
      if (oldId) {
        try {
          await api.deleteMedia(oldId);
        } catch {
          // Fallback to local delete for Phase 1 legacy IDs
          await deleteFile(oldId).catch(console.error);
        }
      }

      if (type === 'image') {
        const urlField = field.replace('Id', 'Url');
        updateData({ [field]: id, [urlField]: url });
      } else {
        updateData({ music: { enabled: true, audioId: id, name: file.name, volume: weddingData.music?.volume ?? 0.7, url } });
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
      alert("Failed to upload file. Please check your network connection and try again.");
    }
  };

  const removeMusic = async () => {
    if (weddingData.music?.audioId) {
      try {
        const { api } = await import('../services/api');
        await api.deleteMedia(weddingData.music.audioId);
      } catch {
        await deleteFile(weddingData.music.audioId).catch(console.error);
      }
    }
    updateData({ music: { enabled: false, name: '', audioId: '', volume: 0.7 } });
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generateInvitation = async () => {
    setIsGenerating(true);
    let targetSlug = '';
    const fallbackSlug = `${weddingData.brideName || 'bride'}-and-${weddingData.groomName || 'groom'}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const inviteData = {
      slug: fallbackSlug,
      templateId: selectedTemplate.slug,
      data: weddingData
    };

    try {
      // 1. Try to save via API
      const { api } = await import('../services/api');
      const response = await api.createInvitation(selectedTemplate.slug, weddingData);
      targetSlug = response.slug;
      
      // Also save to localStorage as a fallback for Phase 2A hybrid mode
      inviteData.slug = targetSlug;
      localStorage.setItem(`invite_${targetSlug}`, JSON.stringify(inviteData));
      
    } catch (error) {
      console.error("API failed, falling back to localStorage", error);
      targetSlug = fallbackSlug;
      localStorage.setItem(`invite_${targetSlug}`, JSON.stringify(inviteData));
    } finally {
      setIsGenerating(false);
      navigate(`/invite/${targetSlug}`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* LEFT: Editor Form */}
      <div className={`w-full lg:w-[450px] xl:w-[500px] flex-shrink-0 border-r border-gray-200 flex flex-col h-full bg-white z-20 ${isPreviewOpenMobile ? 'hidden lg:flex' : 'flex'}`}>
        <header className="p-6 border-b border-gray-100 flex items-center justify-between">
          <button onClick={() => navigate('/templates')} className="text-gray-500 hover:text-gray-900 font-medium">← Back</button>
          <div className="font-serif font-bold text-[var(--color-wed-gold-dark)]">WedStory</div>
          <button 
            onClick={() => setIsPreviewOpenMobile(true)}
            className="lg:hidden text-sm bg-gray-900 text-white px-4 py-2 rounded-full font-medium"
          >
            Preview
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-3">Step {currentStep} of {totalSteps}</h2>
            <div className="flex gap-1.5">
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-[var(--color-wed-gold)]' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-medium mb-6 text-gray-900">Couple Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bride's Name</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] focus:border-transparent transition-all outline-none" 
                           value={weddingData.brideName} onChange={e => updateData({ brideName: e.target.value })} placeholder="E.g. Ananya" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Groom's Name</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] focus:border-transparent transition-all outline-none" 
                           value={weddingData.groomName} onChange={e => updateData({ groomName: e.target.value })} placeholder="E.g. Arjun" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-medium mb-2 text-gray-900">Photos</h3>
                <p className="text-sm text-gray-500 mb-6">Add high-quality photos (Max 10MB each). These will be stored locally on your device for now.</p>
                
                <div className="space-y-5">
                  {[
                    { label: 'Couple Photo', field: 'couplePhotoId' },
                    { label: 'Bride Photo (Optional)', field: 'bridePhotoId' },
                    { label: 'Groom Photo (Optional)', field: 'groomPhotoId' }
                  ].map(({ label, field }) => (
                    <div key={field} className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{(weddingData as any)[field] ? 'Photo uploaded' : 'No photo chosen'}</p>
                      </div>
                      <label className="cursor-pointer bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Upload size={16} /> Choose
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'image', field)} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-medium mb-6 text-gray-900">Main Wedding Details</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Wedding Date</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none" 
                           value={weddingData.weddingDate} onChange={e => updateData({ weddingDate: e.target.value })} placeholder="20 December 2026" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none" 
                           value={weddingData.weddingTime} onChange={e => updateData({ weddingTime: e.target.value })} placeholder="10:30 AM" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Venue Name</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none" 
                           value={weddingData.venue} onChange={e => updateData({ venue: e.target.value })} placeholder="Leela Palace" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location / City</label>
                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none" 
                           value={weddingData.location} onChange={e => updateData({ location: e.target.value })} placeholder="Kochi, Kerala" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-medium mb-2 text-gray-900">Events</h3>
                <p className="text-sm text-gray-500 mb-6">Add multiple events like Mehendi, Haldi, or Reception.</p>
                
                <div className="space-y-4">
                  {weddingData.events.map((event, index) => (
                    <div key={event.id} className="p-5 border border-gray-200 rounded-2xl relative bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute top-4 right-4 flex gap-2">
                         <button onClick={() => moveEvent(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-gray-900 disabled:opacity-30">↑</button>
                         <button onClick={() => moveEvent(index, 'down')} disabled={index === weddingData.events.length - 1} className="text-gray-400 hover:text-gray-900 disabled:opacity-30">↓</button>
                         <button onClick={() => removeEvent(event.id)} className="text-gray-400 hover:text-red-500 ml-2"><Trash2 size={16} /></button>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-4 text-sm uppercase tracking-wider">Event {index + 1}</h4>
                      <div className="space-y-3">
                        <input type="text" placeholder="Event Name (e.g., Mehendi)" className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                               value={event.name} onChange={e => updateEvent(event.id, 'name', e.target.value)} />
                        <div className="flex gap-3">
                          <input type="text" placeholder="Date" className="w-1/2 p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                                 value={event.date} onChange={e => updateEvent(event.id, 'date', e.target.value)} />
                          <input type="text" placeholder="Time" className="w-1/2 p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                                 value={event.time} onChange={e => updateEvent(event.id, 'time', e.target.value)} />
                        </div>
                        <input type="text" placeholder="Venue & Location" className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                               value={event.venue} onChange={e => updateEvent(event.id, 'venue', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEvent} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-medium hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    <Plus size={18} /> Add Event
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-medium mb-6 text-gray-900">Final Touches</h3>
                <div className="space-y-8">
                  {/* Music Section */}
                  <div>
                    <label className="block font-medium text-gray-900 mb-3 flex items-center gap-2"><MusicIcon size={18} /> Background Music</label>
                    <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50">
                      {weddingData.music?.enabled ? (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="truncate pr-4 font-medium text-sm text-[var(--color-wed-gold-dark)]">{weddingData.music.name}</div>
                            <button onClick={removeMusic} className="text-xs text-red-500 font-medium whitespace-nowrap bg-red-50 px-2 py-1 rounded">Remove</button>
                          </div>
                          <div className="flex items-center gap-4">
                            <Volume2 size={16} className="text-gray-400" />
                            <input type="range" min="0" max="1" step="0.05" className="w-full accent-[var(--color-wed-gold)]"
                                   value={weddingData.music.volume ?? 0.7} 
                                   onChange={e => updateData({ music: { ...weddingData.music!, volume: parseFloat(e.target.value) } })} />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-3">Add a romantic track (Max 10MB MP3).</p>
                          <label className="inline-flex cursor-pointer bg-white px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors items-center gap-2 shadow-sm">
                            <Upload size={16} /> Choose Audio
                            <input type="file" accept="audio/*" className="hidden" onChange={e => handleFileUpload(e, 'audio', 'music')} />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Custom Welcome Message</label>
                    <textarea className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none h-28 resize-none" 
                           value={weddingData.customMessage || ''} onChange={e => updateData({ customMessage: e.target.value })} 
                           placeholder="We joyfully invite you to share in our happiness..." />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">RSVP Name</label>
                      <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none" 
                             value={weddingData.rsvpName || ''} onChange={e => updateData({ rsvpName: e.target.value })} placeholder="Rahul Sharma" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">RSVP Phone</label>
                      <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-wed-gold)] transition-all outline-none" 
                             value={weddingData.rsvpPhone || ''} onChange={e => updateData({ rsvpPhone: e.target.value })} placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-white z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 1}
            className={`px-5 py-2.5 flex items-center gap-2 font-medium rounded-full transition-colors ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          {currentStep < totalSteps ? (
            <button 
              onClick={handleNext} 
              className="px-7 py-2.5 bg-gray-900 text-white rounded-full flex items-center gap-2 font-medium hover:bg-black transition-all shadow-md hover:shadow-lg"
            >
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={generateInvitation}
              disabled={isGenerating}
              className="px-8 py-2.5 bg-[var(--color-wed-gold)] text-white rounded-full flex items-center gap-2 font-bold hover:bg-[var(--color-wed-gold-dark)] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
            >
              {isGenerating ? 'Creating...' : 'Create Invitation'}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div className={`flex-1 relative bg-gray-100 ${!isPreviewOpenMobile ? 'hidden lg:block' : 'block absolute inset-0 z-50'}`}>
        {isPreviewOpenMobile && (
          <button 
            onClick={() => setIsPreviewOpenMobile(false)}
            className="absolute top-6 right-6 z-[60] bg-white text-gray-900 px-5 py-2.5 rounded-full lg:hidden shadow-xl font-medium flex items-center gap-2"
          >
            Close Preview
          </button>
        )}
        <div className="h-full w-full overflow-hidden flex items-center justify-center p-4 lg:p-12 relative bg-grid-pattern">
           {/* Phone frame constraint for preview to simulate mobile layout exactly */}
           <div className="w-full max-w-[412px] h-full max-h-[850px] bg-white shadow-2xl rounded-[2.5rem] overflow-hidden relative border-[12px] border-gray-900 mx-auto flex flex-col">
             {/* Notch simulation */}
             <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-[100] pointer-events-none">
                <div className="w-32 h-6 bg-gray-900 rounded-b-2xl"></div>
             </div>
             <div className="flex-1 overflow-y-auto bg-white custom-scrollbar relative z-0">
                <TemplateRenderer templateId={selectedTemplate.slug} data={weddingData} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
