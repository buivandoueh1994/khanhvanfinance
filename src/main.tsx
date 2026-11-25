import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = lazy(() => import('./App'));
const LeaderOnboardingPage = lazy(() =>
  import('./components/LeaderOnboardingPage').then((m) => ({
    default: m.LeaderOnboardingPage,
  }))
);
const RegionalSystemPage = lazy(() =>
  import('./components/RegionalSystemPage').then((m) => ({
    default: m.RegionalSystemPage,
  }))
);
const JourneysPage = lazy(() =>
  import('./components/JourneysPage').then((m) => ({
    default: m.JourneysPage,
  }))
);

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
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
        <LeaderOnboardingPage />
      </Suspense>
    );
  }

  const isRegionalPreview =
    pathname === '/green-power' ||
    pathname === '/green-power-group' ||
    pathname === '/vung-green-power' ||
    pathname === '/vung-khanh-van' ||
    pathname === '/xem-truoc-vung-khanh-van' ||
    params.get('preview') === 'vung-khanh-van' ||
    params.get('preview') === 'green-power';

  if (isRegionalPreview) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
        <RegionalSystemPage />
      </Suspense>
    );
  }

  const isJourneysPage =
    pathname === '/nhung-chuyen-di' ||
    pathname === '/dong-hanh-cung-khanh-van' ||
    params.get('page') === 'nhung-chuyen-di';

  if (isJourneysPage) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
        <JourneysPage />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
      <App />
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>,
);
