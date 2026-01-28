import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <h1>Interview Prep Autopilot</h1>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Today
          </Link>
          <Link to="/plan" className={location.pathname === '/plan' ? 'active' : ''}>
            Plan
          </Link>
          <Link to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>
            Progress
          </Link>
          <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
            Settings
          </Link>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
