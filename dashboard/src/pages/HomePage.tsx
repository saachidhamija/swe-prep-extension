import { useState, useEffect } from 'react';
import './HomePage.css';

export default function HomePage() {
  const [todayPlan, setTodayPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch today's plan from backend or extension storage
    // For now, show placeholder
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <h2>Today's Plan</h2>

      {!todayPlan ? (
        <div className="empty-state">
          <p>No plan configured yet.</p>
          <a href="/settings">Go to Settings to create your plan</a>
        </div>
      ) : (
        <div className="today-tasks">
          {/* TODO: Render today's tasks */}
        </div>
      )}
    </div>
  );
}
