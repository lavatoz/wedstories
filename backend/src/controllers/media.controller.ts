import { Request, Response } from 'express';
import { PrismaClient, MediaType } from '@prisma/client';
import { mediaStorage } from '../services/media.service';
import fs from 'fs';

const prisma = new PrismaClient();

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;
    const isImage = file.mimetype.startsWith('image/');
    const isAudio = file.mimetype.startsWith('audio/');

    if (!isImage && !isAudio) {
      // Remove the file if invalid
      await fs.promises.unlink(file.path).catch(console.error);
      return res.status(400).json({ success: false, message: 'Unsupported file type' });
    }

    const { url, storageKey } = await mediaStorage.uploadFile(file);

    const mediaType = isImage ? MediaType.IMAGE : MediaType.AUDIO;

    const media = await prisma.media.create({
      data: {
        type: mediaType,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        storageKey,
        url,
      }
    });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    console.error('Failed to upload media:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    
    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        couplePhotos: true,
        bridePhotos: true,
        groomPhotos: true,
        musicAudios: true,
      }
    });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Check if the media is still referenced by any invitation
    const inUse = 
      media.couplePhotos.length > 0 || 
      media.bridePhotos.length > 0 || 
      media.groomPhotos.length > 0 || 
      media.musicAudios.length > 0;

    if (inUse) {
      return res.status(400).json({ success: false, message: 'Media is still in use by an invitation' });
    }

    await prisma.media.delete({ where: { id } });
    await mediaStorage.deleteFile(media.storageKey);

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Failed to delete media:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
