import { create } from 'zustand';
import type { WeddingData, Template } from '../types';

interface EditorState {
  selectedTemplate: Template | null;
  weddingData: WeddingData;
  setTemplate: (template: Template) => void;
  updateData: (data: Partial<WeddingData>) => void;
  reset: () => void;
}

const defaultWeddingData: WeddingData = {
  brideName: '',
  groomName: '',
  weddingDate: '',
  weddingTime: '',
  venue: '',
  location: '',
  events: [],
  story: [],
  gallery: [],
  website: {
    heroTitle: '',
    introText: '',
    storyTitle: 'Our Story',
    galleryTitle: 'Moments',
    scheduleTitle: 'Wedding Details',
    rsvpTitle: 'RSVP',
    wishesTitle: 'Wedding Wishes',
    showStory: true,
    showGallery: true,
    showRsvp: true,
    showWishes: true,
    primaryColor: '#8B6B3F',
    backgroundColor: '#F7F4EE',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter'
  },
  music: {
    enabled: false,
    name: '',
    audioId: '',
    volume: 0.7
  }
};

export const useEditorStore = create<EditorState>((set) => ({
  selectedTemplate: null,
  weddingData: { ...defaultWeddingData },
  setTemplate: (template) => set({ selectedTemplate: template }),
  updateData: (data) => 
    set((state) => ({ 
      weddingData: { ...state.weddingData, ...data } 
    })),
  reset: () => set({ selectedTemplate: null, weddingData: { ...defaultWeddingData } })
}));
