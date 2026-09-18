import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { invitationSchema } from '../utils/validation';

const prisma = new PrismaClient();

// Helper to generate a slug (simple version)
const generateSlug = (brideName: string, groomName: string) => {
  return `${brideName}-and-${groomName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

export const createInvitation = async (req: Request, res: Response) => {
  try {
    const data = invitationSchema.parse(req.body);
    
    // Generate base slug
    let baseSlug = generateSlug(data.brideName, data.groomName);
    let slug = baseSlug;
    
    // Check for duplicates and append a number if needed
    let counter = 1;
    let existing = await prisma.invitation.findUnique({ where: { slug } });
    while (existing) {
      slug = `${baseSlug}-${counter}`;
      existing = await prisma.invitation.findUnique({ where: { slug } });
      counter++;
    }

    const { events, ...invitationData } = data;

    const invitation = await prisma.invitation.create({
      data: {
        ...invitationData,
        slug,
        events: {
          create: events.map((event, idx) => ({
            ...event,
            order: event.order ?? idx
          }))
        }
      },
      include: {
        events: true,
        couplePhoto: true,
        bridePhoto: true,
        groomPhoto: true,
        musicAudio: true
      }
    });

    res.status(201).json({ success: true, data: invitation });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
    }
    console.error("Failed to create invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getInvitation = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const invitation = await prisma.invitation.findUnique({
      where: { slug },
      include: { 
        events: { orderBy: { order: 'asc' } },
        couplePhoto: true,
        bridePhoto: true,
        groomPhoto: true,
        musicAudio: true
      }
    });

    if (!invitation) {
      return res.status(404).json({ success: false, message: "Invitation not found" });
    }

    res.json({ success: true, data: invitation });
  } catch (error) {
    console.error("Failed to fetch invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateInvitation = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const data = invitationSchema.parse(req.body);
    
    const existing = await prisma.invitation.findUnique({ where: { slug } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Invitation not found" });
    }

    const { events, ...invitationData } = data;

    // To update events, we delete existing and recreate them (simplest approach for Phase 2A)
    const invitation = await prisma.invitation.update({
      where: { slug },
      data: {
        ...invitationData,
        events: {
          deleteMany: {},
          create: events.map((event, idx) => ({
            ...event,
            order: event.order ?? idx
          }))
        }
      },
      include: { 
        events: { orderBy: { order: 'asc' } },
        couplePhoto: true,
        bridePhoto: true,
        groomPhoto: true,
        musicAudio: true
      }
    });

    res.json({ success: true, data: invitation });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
    }
    console.error("Failed to update invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteInvitation = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    
    // Note: events are cascade deleted by Prisma
    await prisma.invitation.delete({ where: { slug } });
    
    res.json({ success: true, message: "Invitation deleted successfully" });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, message: "Invitation not found" });
    }
    console.error("Failed to delete invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
