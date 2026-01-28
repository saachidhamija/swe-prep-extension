# Contributing to Interview Prep Autopilot

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm run install:all`
3. Set up environment variables (see `.env.example` files)
4. Start development servers:
   - Extension: `npm run dev:extension`
   - Dashboard: `npm run dev:dashboard`
   - Backend: `npm run dev:backend`

## Project Structure

- `/extension` - Chrome extension code
- `/dashboard` - Web dashboard (React)
- `/backend` - Backend API (Express/Node.js)
- `/shared` - Shared TypeScript types

## Code Style

- Use TypeScript for all new code
- Follow ESLint rules (run `npm run lint:all` before committing)
- Use meaningful variable and function names
- Add comments for complex logic

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass (when tests are added)
4. Run linters: `npm run lint:all`
5. Submit a pull request with a clear description

## Questions?

Feel free to open an issue for questions or discussions.
