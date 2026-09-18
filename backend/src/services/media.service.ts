import fs from 'fs';
import path from 'path';

export interface MediaStorageService {
  uploadFile(file: Express.Multer.File): Promise<{ url: string, storageKey: string }>;
  deleteFile(storageKey: string): Promise<void>;
}

export class LocalMediaStorageService implements MediaStorageService {
  private uploadDir: string;
  private baseUrl: string;

  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads');
    this.baseUrl = process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/uploads` : `http://localhost:${process.env.PORT || 3000}/uploads`;
    
    // Ensure upload dir exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string, storageKey: string }> {
    // Note: the controller configures multer to save it with a safe uuid name
    const storageKey = file.filename;
    const url = `${this.baseUrl}/${storageKey}`;
    return { url, storageKey };
  }

  async deleteFile(storageKey: string): Promise<void> {
    const filePath = path.join(this.uploadDir, storageKey);
    // Prevent directory traversal
    if (!filePath.startsWith(this.uploadDir)) {
      throw new Error("Invalid storage key");
    }
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}

// Export a singleton instance. Can be swapped with S3MediaStorageService later.
export const mediaStorage = new LocalMediaStorageService();
