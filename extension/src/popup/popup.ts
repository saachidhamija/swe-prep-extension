import { getPlan, getEvents } from '../shared/storage';

async function loadTodayPlan() {
  const plan = await getPlan();
  const events = await getEvents();

  const tasksContainer = document.getElementById('tasks-container');
  if (!tasksContainer) return;

  if (!plan || !plan.days) {
    tasksContainer.innerHTML = '<div class="empty-state">No plan configured yet. Set up your plan in the dashboard.</div>';
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const todayPlan = plan.days.find((day: any) => day.date === today);

  if (!todayPlan) {
    tasksContainer.innerHTML = '<div class="empty-state">No tasks for today.</div>';
    return;
  }

  // Render coding tasks
  let html = '';
  if (todayPlan.coding_blocks && todayPlan.coding_blocks.length > 0) {
    todayPlan.coding_blocks.forEach((task: any) => {
      html += `
        <div class="task-item">
          <div class="task-name">${task.problem_slug || task.objective}</div>
          <div class="task-meta">${task.estimated_minutes} min • ${task.objective}</div>
        </div>
      `;
    });
  }

  tasksContainer.innerHTML = html || '<div class="empty-state">No tasks for today.</div>';

  // Update stats
  const solvedCount = events.filter((e: any) => e.status === 'solved').length;
  document.getElementById('solved-count')!.textContent = solvedCount.toString();

  // TODO: Calculate streak
  document.getElementById('streak-days')!.textContent = '0';
}

// Open dashboard button
document.getElementById('open-dashboard')?.addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:3000' }); // TODO: Use config
});

// Load plan on popup open
loadTodayPlan();
