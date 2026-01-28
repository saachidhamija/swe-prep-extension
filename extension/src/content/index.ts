/**
 * Content script for leetcode.com
 * Extracts problem metadata and tracks user activity
 */

import { LeetCodeProblemEvent, Difficulty, ProblemStatus, SubmissionOutcome } from '../shared/types';
import { saveEvent } from '../shared/storage';

// Extract problem slug from URL
function getProblemSlug(): string | null {
  const match = window.location.pathname.match(/\/problems\/([^\/]+)/);
  return match ? match[1] : null;
}

// Extract difficulty from page
function getDifficulty(): Difficulty {
  const difficultyEl = document.querySelector('[data-difficulty]');
  if (!difficultyEl) return 'unknown';

  const difficulty = difficultyEl.getAttribute('data-difficulty')?.toLowerCase();
  if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
    return difficulty as Difficulty;
  }
  return 'unknown';
}

// Extract tags from page
function getTags(): string[] {
  const tagElements = document.querySelectorAll('[class*="tag"], [data-tag]');
  const tags: string[] = [];

  tagElements.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && text.length > 0) {
      tags.push(text);
    }
  });

  return [...new Set(tags)]; // Remove duplicates
}

// Extract status from page
function getStatus(): ProblemStatus {
  // Look for solved/attempted indicators
  const solvedIndicator = document.querySelector('[class*="solved"], [class*="accepted"]');
  const attemptedIndicator = document.querySelector('[class*="attempted"]');

  if (solvedIndicator) return 'solved';
  if (attemptedIndicator) return 'attempted';
  return 'unknown';
}

// Observe submission result
function observeSubmissionResult(): Promise<SubmissionOutcome> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      const resultText = document.body.textContent || '';

      if (resultText.includes('Accepted') || resultText.includes('AC')) {
        resolve('AC');
        observer.disconnect();
      } else if (resultText.includes('Wrong Answer') || resultText.includes('WA')) {
        resolve('WA');
        observer.disconnect();
      } else if (resultText.includes('Time Limit Exceeded') || resultText.includes('TLE')) {
        resolve('TLE');
        observer.disconnect();
      } else if (resultText.includes('Runtime Error') || resultText.includes('RTE')) {
        resolve('RTE');
        observer.disconnect();
      } else if (resultText.includes('Compile Error') || resultText.includes('CE')) {
        resolve('CE');
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      observer.disconnect();
      resolve('unknown');
    }, 30000);
  });
}

// Track page visit
let pageStartTime = Date.now();
let submissionObserver: MutationObserver | null = null;

function trackPageVisit() {
  const slug = getProblemSlug();
  if (!slug) return;

  pageStartTime = Date.now();

  // Start observing for submission results
  observeSubmissionResult().then((outcome) => {
    // Submission detected, but we'll record it when leaving the page
  });
}

function trackPageLeave() {
  const slug = getProblemSlug();
  if (!slug) return;

  const timestampEnd = Date.now();
  const timeOnPageSec = Math.floor((timestampEnd - pageStartTime) / 1000);

  const event: LeetCodeProblemEvent = {
    problem_slug: slug,
    timestamp_start: pageStartTime,
    timestamp_end: timestampEnd,
    time_on_page_sec: timeOnPageSec,
    difficulty: getDifficulty(),
    tags: getTags(),
    status: getStatus(),
    submission_outcome: 'unknown', // Will be updated if detected
  };

  saveEvent(event).catch(console.error);
}

// Initialize tracking
if (window.location.hostname === 'leetcode.com') {
  // Track initial page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageVisit);
  } else {
    trackPageVisit();
  }

  // Track page unload
  window.addEventListener('beforeunload', trackPageLeave);

  // Track navigation (for SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      trackPageLeave();
      lastUrl = url;
      setTimeout(trackPageVisit, 1000); // Wait for new page to load
    }
  }).observe(document, { subtree: true, childList: true });
}

console.log('Interview Prep Autopilot: Content script loaded');
