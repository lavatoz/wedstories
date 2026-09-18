import type { WeddingData } from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export const api = {
  async createInvitation(templateId: string, data: WeddingData): Promise<{ slug: string }> {
    const payload = {
      templateId,
      brideName: data.brideName,
      groomName: data.groomName,
      weddingDate: data.weddingDate,
      weddingTime: data.weddingTime,
      venue: data.venue,
      location: data.location,
      customMessage: data.customMessage,
      rsvpName: data.rsvpName,
      rsvpPhone: data.rsvpPhone,
      
      couplePhotoId: data.couplePhotoId || null,
      bridePhotoId: data.bridePhotoId || null,
      groomPhotoId: data.groomPhotoId || null,
      
      musicEnabled: data.music?.enabled || false,
      musicName: data.music?.name || null,
      musicAudioId: data.music?.audioId || null,
      musicVolume: data.music?.volume ?? 0.7,
      
      events: data.events.map(e => ({
        name: e.name,
        date: e.date,
        time: e.time,
        venue: e.venue,
        location: e.location || undefined,
        order: e.order
      }))
    };

    const response = await fetch(`${API_URL}/invitations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new ApiError(response.status, result.message || 'Failed to create invitation');
    }
    return result.data;
  },

  async uploadMedia(file: File): Promise<{ id: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/media/upload`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new ApiError(response.status, result.message || 'Failed to upload media');
    }
    return result.data;
  },

  async deleteMedia(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/media/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const result = await response.json();
      throw new ApiError(response.status, result.message || 'Failed to delete media');
    }
  },

  async getInvitation(slug: string): Promise<{ templateId: string, data: WeddingData }> {
    const response = await fetch(`${API_URL}/invitations/${slug}`);
    
    if (response.status === 404) {
      throw new ApiError(404, 'Invitation not found');
    }

    const result = await response.json();
    if (!response.ok) {
      throw new ApiError(response.status, result.message || 'Failed to fetch invitation');
    }

    const item = result.data;
    
    // Reconstruct WeddingData format for the frontend
    const weddingData: WeddingData = {
      brideName: item.brideName,
      groomName: item.groomName,
      weddingDate: item.weddingDate,
      weddingTime: item.weddingTime,
      venue: item.venue,
      location: item.location,
      customMessage: item.customMessage || undefined,
      rsvpName: item.rsvpName || undefined,
      rsvpPhone: item.rsvpPhone || undefined,
      
      couplePhotoId: item.couplePhotoId || undefined,
      couplePhotoUrl: item.couplePhoto?.url || undefined,
      bridePhotoId: item.bridePhotoId || undefined,
      bridePhotoUrl: item.bridePhoto?.url || undefined,
      groomPhotoId: item.groomPhotoId || undefined,
      groomPhotoUrl: item.groomPhoto?.url || undefined,
      
      events: item.events.map((e: any) => ({
        id: e.id,
        name: e.name,
        date: e.date,
        time: e.time,
        venue: e.venue,
        location: e.location || '',
        order: e.order
      }))
    };

    if (item.musicEnabled) {
      weddingData.music = {
        enabled: true,
        name: item.musicName || '',
        audioId: item.musicAudioId || undefined,
        volume: item.musicVolume,
        url: item.musicAudio?.url || undefined
      };
    }

    return {
      templateId: item.templateId,
      data: weddingData
    };
  }
};
