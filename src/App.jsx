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
import Transactions from './pages/finance/Transactions';
import DatabaseTest from './pages/Database Test';
import DnDTest from './pages/DnDTest';
import PoS from './pages/Commerce/PoS';
import Invoices from './pages/Commerce/Invoices';
import Shop from './pages/Commerce/Shop';
import Users from './pages/Community/Users';
import Profile from './pages/Community/Profile';
import Employees from './pages/Community/Employees';
import List from './pages/Task/List';
import Message from './pages/Message';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Account from './pages/Settings/Account';
import Noti from './pages/Settings/Noti';

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
          <Route exact path="/finance" element={<Transactions />} />
          <Route exact path="/database" element={<DatabaseTest />} />
          <Route exact path="/DnDTest" element={<DnDTest />} />
          <Route exact path="/commerce/PoS" element={<PoS />} />
          <Route exact path="/commerce/invoices" element={<Invoices />} />
          <Route exact path="/commerce/shop" element={<Shop />} />
          <Route exact path="/community/users" element={<Users />} />
          <Route exact path="/community/profile" element={<Profile />} />
          <Route exact path="/community/employees" element={<Employees />} />
          <Route exact path="/tasks/list" element={<List />} />
          <Route exact path="/messages" element={<Message />} />
          <Route exact path="/inbox" element={<Inbox />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/settings/account" element={<Account />} />
          <Route exact path="/settings/notifications" element={<Noti />} />

      </Routes>
    </>
  );
}

export default App;
