import { LeetCodeProblemEvent } from './types';

const STORAGE_KEYS = {
  EVENTS: 'lc_events',
  USER_CONFIG: 'user_config',
  PLAN: 'current_plan',
  LAST_SYNC: 'last_sync',
} as const;

export async function saveEvent(event: LeetCodeProblemEvent): Promise<void> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.EVENTS);
  const events: LeetCodeProblemEvent[] = result[STORAGE_KEYS.EVENTS] || [];
  events.push(event);
  await chrome.storage.local.set({ [STORAGE_KEYS.EVENTS]: events });
}

export async function getEvents(): Promise<LeetCodeProblemEvent[]> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.EVENTS);
  return result[STORAGE_KEYS.EVENTS] || [];
}

export async function getUserConfig(): Promise<any> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.USER_CONFIG);
  return result[STORAGE_KEYS.USER_CONFIG] || null;
}

export async function saveUserConfig(config: any): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.USER_CONFIG]: config });
}

export async function getPlan(): Promise<any> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.PLAN);
  return result[STORAGE_KEYS.PLAN] || null;
}

export async function savePlan(plan: any): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.PLAN]: plan });
}
