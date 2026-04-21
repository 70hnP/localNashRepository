import { ReactNode } from 'react';

interface LayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onReset: () => void;
  children: ReactNode;
}

const tabs = ['Dashboard', 'Competency', 'Annual Goals', 'Quarterly Objectives', 'Evidence', 'Scorecards'];

export function Layout({ activeTab, onTabChange, onReset, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <h1>CEO Master Growth Playbook</h1>
          <p>MVP funcional con persistencia local</p>
        </div>
        <button onClick={onReset} className="danger-btn" type="button">
          Reset datos
        </button>
      </header>

      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'tab active' : 'tab'}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}
