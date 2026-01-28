/**
 * Background service worker
 * Handles alarms, notifications, and syncing with backend
 */

import { getEvents, getUserConfig, getPlan } from '../shared/storage';

// Sync events to backend
async function syncEvents() {
  const events = await getEvents();
  const userConfig = await getUserConfig();

  if (!userConfig || events.length === 0) return;

  try {
    // TODO: Replace with actual backend URL
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events }),
    });

    if (response.ok) {
      // Clear synced events (or mark them as synced)
      console.log('Events synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync events:', error);
  }
}

// Check for scheduled reminders
async function checkReminders() {
  const plan = await getPlan();
  if (!plan) return;

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Find today's plan
  const todayPlan = plan.days?.find((day: any) => day.date === today);
  if (!todayPlan) return;

  // Check if it's time for a reminder
  // TODO: Implement reminder logic based on user's time windows

  // Show notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Interview Prep Reminder',
    message: 'Time to practice! Check your plan for today\'s tasks.',
  });
}

// Set up alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'sync-events') {
    syncEvents();
  } else if (alarm.name === 'check-reminders') {
    checkReminders();
  }
});

// Create recurring alarms
chrome.runtime.onInstalled.addListener(() => {
  // Sync events every hour
  chrome.alarms.create('sync-events', {
    periodInMinutes: 60,
  });

  // Check reminders every 15 minutes
  chrome.alarms.create('check-reminders', {
    periodInMinutes: 15,
  });
});

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SYNC_EVENTS') {
    syncEvents().then(() => sendResponse({ success: true }));
    return true; // Keep channel open for async response
  }

  if (message.type === 'GET_PLAN') {
    getPlan().then((plan) => sendResponse({ plan }));
    return true;
  }
});

console.log('Interview Prep Autopilot: Background service worker loaded');
