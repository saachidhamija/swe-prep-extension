# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Chrome browser
- Git

## Setup Steps

### 1. Install Dependencies

```bash
# From project root
npm install

# Or install individually
cd extension && npm install
cd ../dashboard && npm install
cd ../backend && npm install
```

### 2. Set Up Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

**Dashboard:**
```bash
cd dashboard
cp .env.example .env
# Edit .env with your configuration
```

### 3. Create Extension Icons

You need to create icon files for the extension:
- `extension/public/icons/icon16.png` (16x16)
- `extension/public/icons/icon48.png` (48x48)
- `extension/public/icons/icon128.png` (128x128)

You can use placeholder images for now or create simple icons.

### 4. Build the Extension

```bash
cd extension
npm run build
```

This creates the `dist` folder with the built extension.

### 5. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension/dist` folder

### 6. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Dashboard:**
```bash
cd dashboard
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### 7. Test the Extension

1. Visit `https://leetcode.com/problems/two-sum/` (or any LeetCode problem)
2. Open the extension popup (click the extension icon)
3. Check that it's tracking your activity

## Next Steps

1. Configure your interview plan in the dashboard
2. Generate your first plan
3. Start practicing on LeetCode!

## Troubleshooting

**Extension not loading:**
- Make sure you built the extension (`npm run build` in extension folder)
- Check browser console for errors
- Verify manifest.json is in dist folder

**Backend not connecting:**
- Check that backend is running on port 3001
- Verify CORS settings
- Check backend logs for errors

**Dashboard not loading:**
- Check that dashboard is running on port 3000
- Verify VITE_BACKEND_URL in dashboard/.env matches backend URL
