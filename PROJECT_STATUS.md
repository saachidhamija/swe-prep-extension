# Project Status & Next Steps

## ✅ What's Been Created

### Project Structure
- ✅ Complete monorepo structure with workspaces
- ✅ Chrome Extension (`/extension`)
- ✅ Web Dashboard (`/dashboard`)
- ✅ Backend API (`/backend`)
- ✅ Shared types (`/shared`)

### Extension (MVP M1 - Partial)
- ✅ Manifest.json with proper permissions
- ✅ Content script for leetcode.com tracking
- ✅ Background service worker for syncing and reminders
- ✅ Popup UI with today's plan display
- ✅ Storage utilities for local data
- ✅ TypeScript types and configuration
- ✅ Build setup with Vite

### Dashboard
- ✅ React + TypeScript setup
- ✅ Routing with React Router
- ✅ Layout component with navigation
- ✅ Settings page (user config form)
- ✅ Placeholder pages (Home, Plan, Progress)
- ✅ Basic styling

### Backend
- ✅ Express server setup
- ✅ API endpoint stubs
- ✅ TypeScript configuration
- ✅ CORS setup

### Documentation
- ✅ Comprehensive README.md
- ✅ Quick Start Guide
- ✅ Contributing guidelines
- ✅ License (MIT)

## 🚧 What Needs to Be Done

### Immediate Next Steps

1. **Create Extension Icons**
   - Need to create `extension/public/icons/icon16.png`
   - Need to create `extension/public/icons/icon48.png`
   - Need to create `extension/public/icons/icon128.png`
   - Can use placeholder images for now

2. **Set Up Environment Variables**
   - Create `backend/.env` from `backend/.env.example`
   - Create `dashboard/.env` from `dashboard/.env.example`
   - Note: `.env.example` files need to be created manually (they were blocked)

3. **Install Dependencies**
   ```bash
   npm install
   cd extension && npm install
   cd ../dashboard && npm install
   cd ../backend && npm install
   ```

### MVP Milestones

#### M1: Extension reads problem metadata + stores local history ✅ (Partial)
- ✅ Content script extracts problem data
- ✅ Storage utilities created
- ⚠️ Need to test on actual LeetCode pages
- ⚠️ Need to verify DOM selectors work with current LeetCode UI

#### M2: User config + generate 7-day plan (Static heuristic) 🚧
- ✅ Settings form created
- ❌ Plan generation algorithm not implemented
- ❌ JD → topic mapping not implemented
- ❌ Problem selection logic not implemented
- ❌ Backend plan generation endpoint needs implementation

#### M3: Progress dashboard + reminders 🚧
- ✅ Dashboard structure created
- ❌ Progress charts not implemented
- ❌ Reminder logic partially implemented (needs testing)
- ❌ Notification system needs testing

#### M4: Adaptive plan regen based on last 7 days events ❌
- ❌ Skill inference algorithm not implemented
- ❌ Weakness calculation not implemented
- ❌ Plan adaptation logic not implemented

## 🔨 Implementation Priorities

### High Priority (MVP Blockers)

1. **Plan Generation Algorithm** (`backend/src/services/planner.ts`)
   - JD keyword → topic mapping
   - Problem selection from LeetCode (need API or scraping strategy)
   - Daily time allocation logic
   - 7-day plan generation

2. **LeetCode Data Source**
   - Decide: Use LeetCode API? Scrape? Static problem list?
   - Implement problem fetching/selection
   - Tag taxonomy mapping

3. **Backend Database**
   - Choose database (PostgreSQL recommended)
   - Set up Prisma or similar ORM
   - Create schema for Users, Events, Plans

4. **Authentication**
   - Implement magic link auth
   - Or use Google OAuth
   - User session management

### Medium Priority

5. **Progress Visualization**
   - Charts library integration (Recharts already added)
   - Tag heatmap component
   - Completion rate display

6. **Reminder System**
   - Test notification permissions
   - Implement time-based reminders
   - Daily recap notifications

7. **Extension Testing**
   - Test on actual LeetCode pages
   - Verify DOM selectors work
   - Test event capture accuracy

### Low Priority (Post-MVP)

8. **Adaptive Planning**
   - Skill inference algorithm
   - Weakness scoring
   - Plan regeneration logic

9. **UI Polish**
   - Better styling
   - Loading states
   - Error handling

10. **Deployment**
    - Hosting setup
    - Extension store submission prep

## 📝 Questions to Resolve

1. **LeetCode Data Access**
   - How will we get problem lists and metadata?
   - Do we need to scrape? Use an API? Maintain a static list?
   - What's the strategy for problem selection?

2. **Database Choice**
   - PostgreSQL? SQLite for MVP? MongoDB?
   - Should we use Prisma, TypeORM, or raw SQL?

3. **Authentication**
   - Magic link vs Google OAuth?
   - How to handle user sessions?

4. **Deployment**
   - Where to host backend? (Railway, Render, Vercel, etc.)
   - Where to host dashboard? (Vercel, Netlify, etc.)
   - Extension store submission requirements?

## 🐛 Known Issues

1. Extension icons missing (need to create)
2. `.env.example` files need manual creation
3. Vite config for extension may need adjustment for popup HTML
4. Backend endpoints are stubs (need implementation)
5. No database connection yet
6. No actual plan generation logic

## 📚 Useful Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [LeetCode API (if available)](https://leetcode.com/api/)
- [Vite Plugin Docs](https://vitejs.dev/guide/)
- [React Router Docs](https://reactrouter.com/)

---

**Last Updated**: 2026-01-27
**Status**: Foundation complete, ready for core feature implementation
