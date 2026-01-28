/**
 * Shared TypeScript types across extension, dashboard, and backend
 */

export type Difficulty = 'easy' | 'medium' | 'hard' | 'unknown';

export type ProblemStatus = 'solved' | 'attempted' | 'unsolved' | 'unknown';

export type SubmissionOutcome = 'AC' | 'WA' | 'TLE' | 'RTE' | 'CE' | 'unknown';

export interface LeetCodeProblemEvent {
  problem_slug: string;
  timestamp_start: number;
  timestamp_end: number;
  time_on_page_sec: number;
  difficulty: Difficulty;
  tags: string[];
  /**
   * Company tags if they are visible to the user on the page (e.g., premium users).
   * We do not attempt to bypass paywalls; if it's not visible, this will be empty/undefined.
   */
  companies?: string[];
  status: ProblemStatus;
  submission_outcome: SubmissionOutcome;
}

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

/**
 * Weekly availability grid for time-blocked scheduling.
 * `grid[day][slot] = true` means user is available for that slot.
 */
export interface WeeklyAvailabilityGrid {
  timezone: string; // IANA timezone, e.g. "America/Los_Angeles"
  slot_minutes: 30 | 60;
  grid: Record<Weekday, boolean[]>;
}

export interface UserConfig {
  interview_date: string; // ISO date string
  hours_per_day: number;
  daily_time_windows?: TimeWindow[];
  availability?: WeeklyAvailabilityGrid;
  interview_types: {
    coding: boolean;
    behavioral: boolean;
    system_design: boolean;
  };
  jd_url?: string;
  jd_text?: string;
  preferred_language?: string;
}

export interface TimeWindow {
  start: string; // HH:mm format
  end: string; // HH:mm format
}

export interface CodingTask {
  problem_slug?: string;
  selection_rule?: string; // e.g., "topics: ['array', 'two-pointers']"
  estimated_minutes: number;
  objective: string;
}

export interface BehavioralTask {
  prompt: string;
  rubric_checklist: string[];
  estimated_minutes: number;
}

export interface SystemDesignTask {
  topic: string;
  resources: string[];
  estimated_minutes: number;
}

export interface DayPlan {
  date: string; // ISO date string
  coding_blocks: CodingTask[];
  behavioral_blocks?: BehavioralTask[];
  system_design_blocks?: SystemDesignTask[];
  /**
   * Optional time-blocked schedule for the day.
   * When present, the UI should prefer this over the legacy *_blocks fields.
   */
  time_blocks?: Array<{
    start: string; // HH:mm (user timezone)
    end: string; // HH:mm (user timezone)
    coding_tasks: CodingTask[];
    behavioral_tasks?: BehavioralTask[];
  }>;
}

export interface Plan {
  user_id: string;
  generated_at: string; // ISO timestamp
  days: DayPlan[];
}

export interface User {
  id: string;
  email: string;
  created_at: string; // ISO timestamp
  settings: UserConfig;
}

export interface Event {
  user_id: string;
  timestamp: string; // ISO timestamp
  type: 'lc_problem_session';
  payload: LeetCodeProblemEvent;
}

export interface TagStats {
  tag: string;
  attempts_count: number;
  solve_count: number;
  recent_attempts: number; // last 14 days
  success_rate: number;
  avg_time_on_page: number;
}

export interface ProgressSummary {
  user_id: string;
  total_problems_solved: number;
  total_problems_attempted: number;
  tag_stats: TagStats[];
  completion_rate: number; // % of planned tasks completed
  streak_days: number;
}
