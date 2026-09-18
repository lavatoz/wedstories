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
