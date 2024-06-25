import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Router,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import Firebase items


// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import DatabaseTest from './pages/Database Test';
import { DndContext } from '@dnd-kit/core';
import DnDTest from './pages/DnDTest';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/analytics" element={<Analytics />} />
          <Route exact path="/database" element={<DatabaseTest />} />
          <Route exact path="/DnDTest" element={<DnDTest />} />

      </Routes>
    </>
  );
}

export default App;
