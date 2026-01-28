# Interview Prep Autopilot

> Remove the "red tape" around SWE interview preparation by automatically generating a personalized, day-by-day prep plan.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/yourusername/swe-prep-extension)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🎯 Overview

Interview Prep Autopilot is a Chrome extension + web dashboard that automatically generates a personalized, day-by-day interview preparation plan based on:
- Target role + job description
- Time remaining + hours/day availability + a weekly availability grid (time-blocked plan)
- Your LeetCode practice history (captured via extension)
- Ongoing performance and outcomes

The system creates daily plans (coding + behavioral), sends reminders, tracks progress with visualizations, and adapts plans based on your behavior and observed weaknesses.

## ✨ Features

### Core Features (MVP)
- 📅 **Automated Planning**: Generate personalized day-by-day prep plans
- 🔍 **LeetCode Integration**: Automatically track your practice sessions
- 📊 **Progress Tracking**: Visualize your progress with charts and heatmaps
- 🔔 **Smart Reminders**: Get notifications when it's time to practice
- 🎯 **Adaptive Learning**: Plans adjust based on your performance and weaknesses
- 📝 **Job Description Analysis**: Extract topics and requirements from JD

### What We Track (Privacy-First)
- Problem slug/ID
- Difficulty level
- Topic tags
- Company tags (only if they are visible to you on the page)
- Status (solved/attempted/unsolved)
- Submission outcomes (AC/WA/TLE/etc)
- Time spent on problems
- Timestamps

### What We DON'T Track
- ❌ Passwords or session cookies
- ❌ Full code solutions (by default)
- ❌ Activity outside leetcode.com
- ❌ Raw LeetCode editorial content

## 🏗️ Architecture

### Components

1. **Chrome Extension** (`/extension`)
   - Content script for leetcode.com
   - Background service worker
   - Popup UI
   - Local storage management

2. **Web Dashboard** (`/dashboard`)
   - User configuration
   - Plan visualization
   - Progress charts
   - Settings management

3. **Backend API** (`/backend`)
   - User authentication (Google OAuth in dashboard)
   - Event ingestion
   - Plan generation algorithm
   - Progress aggregation

## 🔧 Tech Choices (MVP)

- **Auth**: Google OAuth (dashboard only)
- **Database**: SQLite (via Prisma)
- **Scheduling**: time-blocked plan generated from a weekly availability grid

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Chrome browser
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/swe-prep-extension.git
   cd swe-prep-extension
   ```

2. **Install dependencies**
   ```bash
   # Install extension dependencies
   cd extension
   npm install

   # Install dashboard dependencies
   cd ../dashboard
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration

   # Dashboard
   cp dashboard/.env.example dashboard/.env
   # Edit dashboard/.env with your configuration
   ```

4. **Build the extension**
   ```bash
   cd extension
   npm run build
   ```

5. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension/dist` directory

6. **Start the development servers**
   ```bash
   # Terminal 1: Backend API
   cd backend
   npm run dev

   # Terminal 2: Dashboard
   cd dashboard
   npm run dev
   ```

## 📖 Usage

### Initial Setup

1. **Install the Chrome Extension**
   - Follow installation steps above
   - Grant permissions for leetcode.com when prompted

2. **Configure Your Plan**
   - Open the web dashboard
   - Enter your interview date
   - Set hours per day available
   - Paste job description URL or text
   - Select interview types (Coding/Behavioral/System Design)
   - Choose preferred programming language

3. **Generate Your Plan**
   - Click "Generate Plan"
   - Review your 7-day plan
   - Start practicing!

### Daily Usage

1. **Practice on LeetCode**
   - The extension automatically tracks your activity
   - No manual logging required

2. **Check Your Dashboard**
   - View today's tasks
   - See progress charts
   - Review weakness heatmap

3. **Get Reminders**
   - Receive notifications for scheduled practice blocks
   - Get nudges if you haven't started

## 🗂️ Project Structure

```
swe-prep-extension/
├── extension/              # Chrome extension
│   ├── src/
│   │   ├── content/       # Content scripts for leetcode.com
│   │   ├── background/    # Service worker
│   │   ├── popup/         # Extension popup UI
│   │   └── shared/        # Shared utilities/types
│   ├── public/            # Static assets
│   └── manifest.json      # Extension manifest
│
├── dashboard/             # Web dashboard
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
├── backend/               # Backend API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── models/        # Database models
│   │   └── utils/         # Utilities
│   └── prisma/            # Database schema (if using Prisma)
│
├── shared/                # Shared code
│   └── types/             # TypeScript types
│
└── README.md
```

## 🔧 Development

### Extension Development

```bash
cd extension
npm run dev        # Watch mode for development
npm run build      # Production build
npm run lint       # Lint code
```

### Dashboard Development

```bash
cd dashboard
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Lint code
```

### Backend Development

```bash
cd backend
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm run test       # Run tests
```

## 📊 Planning Algorithm

The planning algorithm considers:

1. **Job Description Analysis**
   - Extracts keywords and maps to LeetCode topics
   - Creates topic weight vector

2. **User Skill Assessment**
   - Analyzes LeetCode practice history
   - Calculates weakness scores per topic
   - Considers recency and success rates

3. **Plan Generation**
   - Allocates time: 70% coding, 20% behavioral, 10% system design
   - Selects problems by topic weight
   - Prioritizes unsolved problems
   - Adjusts difficulty based on performance

4. **Adaptation**
   - Increases focus on weak topics
   - Reduces difficulty for struggling areas
   - Raises difficulty for strong areas

## 🔐 Security & Privacy

- **Explicit Consent**: Users must explicitly grant leetcode.com permissions
- **Data Encryption**: User data encrypted at rest
- **Minimal Collection**: Only necessary data is collected
- **User Control**: Users can delete their account and data at any time
- **Privacy Policy**: Clear documentation of data collection practices

## 📈 Success Metrics

- **D1 Activation**: User creates plan + installs extension
- **Weekly Retention**: Returns ≥3 days/week
- **Plan Adherence**: % of tasks completed
- **Improvement Proxy**: Higher medium success rate over time
- **Time-to-Plan**: <60 seconds from JD input to plan display

## 🗺️ Roadmap

### MVP Milestones
- [x] M1: Extension reads problem metadata + stores local history
- [ ] M2: User config + generate 7-day plan (static heuristic)
- [ ] M3: Progress dashboard + reminders
- [ ] M4: Adaptive plan regen based on last 7 days events

### Post-MVP Features
- Calendar integration (Google Calendar)
- Multiple interview pipelines
- System design modules
- Spaced repetition scheduling
- Mock interview mode with timed sets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- LeetCode for providing the platform
- The open-source community for inspiration and tools

## 📧 Contact

Saachi - [Your Email]

Project Link: [https://github.com/yourusername/swe-prep-extension](https://github.com/yourusername/swe-prep-extension)

---

**Note**: This is an MVP (v0.1). Features and APIs may change as we iterate based on user feedback.
