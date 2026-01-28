import { useMemo, useState } from 'react';
import './SettingsPage.css';
import { UserConfig, Weekday, WeeklyAvailabilityGrid } from '../../../shared/types';

function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

function makeEmptyAvailability(slotMinutes: 30 | 60 = 60): WeeklyAvailabilityGrid {
  const slotsPerDay = (24 * 60) / slotMinutes;
  const emptyDay = Array.from({ length: slotsPerDay }, () => false);
  return {
    timezone: getBrowserTimezone(),
    slot_minutes: slotMinutes,
    grid: {
      0: [...emptyDay],
      1: [...emptyDay],
      2: [...emptyDay],
      3: [...emptyDay],
      4: [...emptyDay],
      5: [...emptyDay],
      6: [...emptyDay],
    },
  };
}

export default function SettingsPage() {
  const [config, setConfig] = useState<Partial<UserConfig>>({
    interview_date: '',
    hours_per_day: 2,
    availability: makeEmptyAvailability(60),
    interview_types: {
      coding: true,
      behavioral: true,
      system_design: false,
    },
  });

  const availability = config.availability ?? makeEmptyAvailability(60);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const weekdays: Array<{ day: Weekday; label: string }> = useMemo(
    () => [
      { day: 0, label: 'Sun' },
      { day: 1, label: 'Mon' },
      { day: 2, label: 'Tue' },
      { day: 3, label: 'Wed' },
      { day: 4, label: 'Thu' },
      { day: 5, label: 'Fri' },
      { day: 6, label: 'Sat' },
    ],
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save config and generate plan
    console.log('Config:', config);
    alert('Settings saved! Plan generation coming soon...');
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="interview-date">Interview Date</label>
          <input
            type="date"
            id="interview-date"
            value={config.interview_date}
            onChange={(e) => setConfig({ ...config, interview_date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hours-per-day">Hours per Day</label>
          <input
            type="number"
            id="hours-per-day"
            min="0.5"
            max="12"
            step="0.5"
            value={config.hours_per_day}
            onChange={(e) => setConfig({ ...config, hours_per_day: parseFloat(e.target.value) })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jd-text">Job Description</label>
          <textarea
            id="jd-text"
            rows={6}
            placeholder="Paste job description or URL here..."
            value={config.jd_text || ''}
            onChange={(e) => setConfig({ ...config, jd_text: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>When are you free? (Weekly grid)</label>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            Timezone: <strong>{availability.timezone}</strong> • Click cells to toggle availability
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '64px repeat(7, 1fr)',
              gap: 6,
              userSelect: 'none',
              overflowX: 'auto',
              paddingBottom: 4,
            }}
          >
            <div />
            {weekdays.map((w) => (
              <div key={w.day} style={{ textAlign: 'center', fontSize: 12, color: '#333' }}>
                {w.label}
              </div>
            ))}

            {hours.map((h) => (
              <div key={`row-${h}`} style={{ display: 'contents' }}>
                <div style={{ fontSize: 12, color: '#666', paddingTop: 6 }}>{`${String(h).padStart(2, '0')}:00`}</div>
                {weekdays.map((w) => {
                  const slotIdx = h; // 60-min slots: 1 slot per hour
                  const isOn = Boolean(availability.grid[w.day]?.[slotIdx]);
                  return (
                    <button
                      key={`${w.day}-${h}`}
                      type="button"
                      aria-pressed={isOn}
                      onClick={() => {
                        const next = structuredClone(availability);
                        next.grid[w.day][slotIdx] = !next.grid[w.day][slotIdx];
                        setConfig({ ...config, availability: next });
                      }}
                      style={{
                        height: 22,
                        borderRadius: 4,
                        border: '1px solid #ddd',
                        background: isOn ? '#4CAF50' : '#fff',
                        cursor: 'pointer',
                      }}
                      title={`${w.label} ${String(h).padStart(2, '0')}:00`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Interview Types</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={config.interview_types?.coding}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    interview_types: { ...config.interview_types!, coding: e.target.checked },
                  })
                }
              />
              Coding
            </label>
            <label>
              <input
                type="checkbox"
                checked={config.interview_types?.behavioral}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    interview_types: { ...config.interview_types!, behavioral: e.target.checked },
                  })
                }
              />
              Behavioral
            </label>
            <label>
              <input
                type="checkbox"
                checked={config.interview_types?.system_design}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    interview_types: { ...config.interview_types!, system_design: e.target.checked },
                  })
                }
              />
              System Design
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Generate Plan
        </button>
      </form>
    </div>
  );
}
