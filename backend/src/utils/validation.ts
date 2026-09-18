import { z } from 'zod';

export const invitationEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  date: z.string().min(1, "Event date is required"),
  time: z.string().min(1, "Event time is required"),
  venue: z.string().min(1, "Event venue is required"),
  location: z.string().optional(),
  order: z.number().int().optional().default(0),
});


export const websiteSettingsSchema = z.object({
  heroTitle: z.string().optional(),
  introText: z.string().optional(),
  storyTitle: z.string().optional(),
  galleryTitle: z.string().optional(),
  scheduleTitle: z.string().optional(),
  rsvpTitle: z.string().optional(),
  wishesTitle: z.string().optional(),
  showStory: z.boolean().optional(),
  showGallery: z.boolean().optional(),
  showRsvp: z.boolean().optional(),
  showWishes: z.boolean().optional(),
  primaryColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  headingFont: z.string().optional(),
  bodyFont: z.string().optional(),
});

export const storyMilestoneSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Story title is required"),
  date: z.string().optional(),
  description: z.string().min(1, "Story description is required"),
  imageId: z.string().optional().nullable(),
  order: z.number().int().optional().default(0),
});

export const galleryImageSchema = z.object({
  id: z.string().optional(),
  mediaId: z.string().min(1, "Gallery media is required"),
  caption: z.string().optional(),
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
  website: websiteSettingsSchema.optional(),
  story: z.array(storyMilestoneSchema).optional().default([]),
  gallery: z.array(galleryImageSchema).optional().default([]),
});
