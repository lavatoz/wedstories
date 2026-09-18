import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import templatesRouter from './routes/templates';
import invitationsRouter from './routes/invitations';

import path from 'path';
import mediaRouter from './routes/media';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173'] : ['http://localhost:5173'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is healthy' });
});

app.use('/api/templates', templatesRouter);
app.use('/api/invitations', invitationsRouter);
app.use('/api/media', mediaRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
