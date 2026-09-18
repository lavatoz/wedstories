import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await prisma.template.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json({ success: true, data: templates });
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
