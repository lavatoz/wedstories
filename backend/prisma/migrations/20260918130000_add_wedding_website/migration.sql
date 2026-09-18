-- Phase 3A: full wedding website data model

CREATE TABLE "WebsiteSettings" (
  "id" TEXT NOT NULL,
  "invitationId" TEXT NOT NULL,
  "heroTitle" TEXT,
  "introText" TEXT,
  "storyTitle" TEXT DEFAULT 'Our Story',
  "galleryTitle" TEXT DEFAULT 'Moments',
  "scheduleTitle" TEXT DEFAULT 'Wedding Details',
  "rsvpTitle" TEXT DEFAULT 'RSVP',
  "wishesTitle" TEXT DEFAULT 'Wedding Wishes',
  "showStory" BOOLEAN NOT NULL DEFAULT true,
  "showGallery" BOOLEAN NOT NULL DEFAULT true,
  "showRsvp" BOOLEAN NOT NULL DEFAULT true,
  "showWishes" BOOLEAN NOT NULL DEFAULT true,
  "primaryColor" TEXT NOT NULL DEFAULT '#8B6B3F',
  "backgroundColor" TEXT NOT NULL DEFAULT '#F7F4EE',
  "headingFont" TEXT NOT NULL DEFAULT 'Playfair Display',
  "bodyFont" TEXT NOT NULL DEFAULT 'Inter',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WebsiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StoryMilestone" (
  "id" TEXT NOT NULL,
  "invitationId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "date" TEXT,
  "description" TEXT NOT NULL,
  "imageId" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "StoryMilestone_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GalleryImage" (
  "id" TEXT NOT NULL,
  "invitationId" TEXT NOT NULL,
  "mediaId" TEXT NOT NULL,
  "caption" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

CREATE TYPE "RSVPResponse" AS ENUM ('YES', 'NO', 'MAYBE');

CREATE TABLE "GuestRSVP" (
  "id" TEXT NOT NULL,
  "invitationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "response" "RSVPResponse" NOT NULL,
  "message" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GuestRSVP_pkey" PRIMARY KEY ("id")
);

CREATE TYPE "WishStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE "Wish" (
  "id" TEXT NOT NULL,
  "invitationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" "WishStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WebsiteSettings_invitationId_key" ON "WebsiteSettings"("invitationId");
CREATE INDEX "StoryMilestone_invitationId_order_idx" ON "StoryMilestone"("invitationId", "order");
CREATE INDEX "GalleryImage_invitationId_order_idx" ON "GalleryImage"("invitationId", "order");
CREATE INDEX "GuestRSVP_invitationId_createdAt_idx" ON "GuestRSVP"("invitationId", "createdAt");
CREATE INDEX "Wish_invitationId_status_createdAt_idx" ON "Wish"("invitationId", "status", "createdAt");

ALTER TABLE "WebsiteSettings"
  ADD CONSTRAINT "WebsiteSettings_invitationId_fkey"
  FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "StoryMilestone"
  ADD CONSTRAINT "StoryMilestone_invitationId_fkey"
  FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "StoryMilestone"
  ADD CONSTRAINT "StoryMilestone_imageId_fkey"
  FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "GalleryImage"
  ADD CONSTRAINT "GalleryImage_invitationId_fkey"
  FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "GalleryImage"
  ADD CONSTRAINT "GalleryImage_mediaId_fkey"
  FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "GuestRSVP"
  ADD CONSTRAINT "GuestRSVP_invitationId_fkey"
  FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Wish"
  ADD CONSTRAINT "Wish_invitationId_fkey"
  FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

