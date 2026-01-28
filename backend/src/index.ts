import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth endpoints
app.post('/api/auth/start', (req, res) => {
  // TODO: Implement magic link auth
  res.json({ message: 'Auth endpoint - coming soon' });
});

// Google OAuth (dashboard-only) - exchange Google ID token for an app session
app.post('/api/auth/google', (req, res) => {
  // TODO: Verify Google ID token, create/find user, set session cookie / return JWT
  res.json({ message: 'Google OAuth - coming soon' });
});

// Event ingestion
app.post('/api/events', (req, res) => {
  // TODO: Store events in database
  console.log('Received events:', req.body);
  res.json({ success: true, message: 'Events received' });
});

// Settings (stored as JSON for MVP)
app.post('/api/settings', async (req, res) => {
  const { email, settings } = req.body as { email?: string; settings?: unknown };
  if (!email || !settings) {
    res.status(400).json({ error: 'email and settings are required' });
    return;
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { settingsJson: JSON.stringify(settings) },
    create: { email, settingsJson: JSON.stringify(settings) },
  });

  res.json({ success: true, userId: user.id });
});

// Plan generation
app.post('/api/plan/generate', (req, res) => {
  // TODO: Implement plan generation algorithm
  res.json({ message: 'Plan generation - coming soon' });
});

// Get today's plan
app.get('/api/plan/today', (req, res) => {
  // TODO: Fetch today's plan from database
  res.json({ message: 'Today plan - coming soon' });
});

// Progress summary
app.get('/api/progress/summary', (req, res) => {
  // TODO: Calculate and return progress summary
  res.json({ message: 'Progress summary - coming soon' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
