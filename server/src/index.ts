import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.route.js';
import subjectRoutes from './routes/subject.route.js';
import noteRoutes from './routes/note.route.js';
import aiRoutes from "./routes/ai.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'running...' });
});

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/ai', aiRoutes);


const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});