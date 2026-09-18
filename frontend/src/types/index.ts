export interface InvitationEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  order: number;
}

export interface MusicData {
  enabled: boolean;
  name: string;
  audioId: string;
  volume: number;
  url?: string;
}

export interface WebsiteSettings {
  heroTitle?: string;
  introText?: string;
  storyTitle?: string;
  galleryTitle?: string;
  scheduleTitle?: string;
  rsvpTitle?: string;
  wishesTitle?: string;
  showStory: boolean;
  showGallery: boolean;
  showRsvp: boolean;
  showWishes: boolean;
  primaryColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
}

export interface StoryMilestone {
  id: string;
  title: string;
  date?: string;
  description: string;
  imageId?: string;
  imageUrl?: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  mediaId: string;
  mediaUrl?: string;
  caption?: string;
  order: number;
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  location: string;
  brideParents?: string;
  groomParents?: string;
  events: InvitationEvent[];
  receptionDate?: string;
  receptionTime?: string;
  receptionVenue?: string;
  receptionLocation?: string;
  bridePhotoId?: string;
  bridePhotoUrl?: string;
  groomPhotoId?: string;
  groomPhotoUrl?: string;
  couplePhotoId?: string;
  couplePhotoUrl?: string;
  rsvpName?: string;
  rsvpPhone?: string;
  customMessage?: string;
  music?: MusicData;
  website?: WebsiteSettings;
  story: StoryMilestone[];
  gallery: GalleryImage[];
}

export interface TemplateData extends WeddingData {
  couplePhotoUrl?: string;
  bridePhotoUrl?: string;
  groomPhotoUrl?: string;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  previewImage: string;
  componentName: string;
}
