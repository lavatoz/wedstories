import { z } from 'zod';

export const invitationEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  date: z.string().min(1, "Event date is required"),
  time: z.string().min(1, "Event time is required"),
  venue: z.string().min(1, "Event venue is required"),
  location: z.string().optional(),
  order: z.number().int().optional().default(0),
});

export const invitationSchema = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  brideName: z.string().min(1, "Bride's name is required"),
  groomName: z.string().min(1, "Groom's name is required"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  weddingTime: z.string().min(1, "Wedding time is required"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  customMessage: z.string().optional(),
  rsvpName: z.string().optional(),
  rsvpPhone: z.string().optional(),
  
  // Media references (IndexedDB)
  couplePhotoId: z.string().optional().nullable(),
  bridePhotoId: z.string().optional().nullable(),
  groomPhotoId: z.string().optional().nullable(),
  
  musicEnabled: z.boolean().optional().default(false),
  musicName: z.string().optional().nullable(),
  musicAudioId: z.string().optional().nullable(),
  musicVolume: z.number().optional().default(0.7),
  
  events: z.array(invitationEventSchema).optional().default([]),
});
