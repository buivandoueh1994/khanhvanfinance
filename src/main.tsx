import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LeaderOnboardingPage } from './components/LeaderOnboardingPage';
import './index.css';

function RootRouter() {
  const pathname = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const isLeaderForm =
    pathname === '/ho-so-quan-ly' ||
    pathname === '/ho-so-ban-dieu-hanh' ||
    pathname === '/ho-so-vung-khanh-van' ||
    pathname === '/ho-so-leader' ||
    pathname === '/form-leader' ||
    pathname === '/quan-ly-ho-so-leader' ||
    params.get('form') === 'leader';

  if (isLeaderForm) {
    return <LeaderOnboardingPage />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>,
);
