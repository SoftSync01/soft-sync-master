import React, { useState,useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
//import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import AddView from '../components/AddView';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import { auth } from "../firebase/firebase-config";
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase/firebase-config";
import { getDatabase, ref,child,get,set,update,remove,push } from "firebase/database";
import DropdownFilter from '../components/DropdownFilter';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentuid, setCurrentUser] = useState("");

  const navigate = useNavigate();

  // Save states to remember customisability
  const [dashboardState, setDashboardState] = useState({
    card01: true,
    card02: true,
    card03: false,
    card04: false,
    card05: false,
    card06: false,
    card07: false,
    card08: false,
    card09: false,
    card10: false,
    card11: false,
    card12: false,
    card13: false,
  });

  useEffect(()=> {
    getLoggedInfo();
  },[]);

  const updateDashboardState = (updates) => {
    setDashboardState((prevState) => ({
      ...prevState,
      ...updates,
    }));
    console.log("update Complete");
  };

  const getLoggedInfo = async(e)=>{
    if(auth.currentUser == null){
      navigate("/");
      return;
    }
    const currentuid = auth.currentUser.uid;
    setCurrentUser(currentuid);
    const dbRef = ref(db,"user/"+ currentuid);
    const snapshot = await get(dbRef);
    if(snapshot.exists){
      const userData = snapshot.val();
      setDashboardState({
        card01: userData.card01,
        card02: userData.card02,
        card03: userData.card03,
        card04: userData.card04,
        card05: userData.card05,
        card06: userData.card06,
        card07: userData.card07,
        card08: userData.card08,
        card09: userData.card09,
        card10: userData.card10,
        card11: userData.card11,
        card12: userData.card12,
        card13: userData.card13,
      });
    }else{
        alert("no data found");
    }
    console.log("setup Complete");
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <DropdownFilter dashboardState={dashboardState} updateDashboardState={updateDashboardState}/>
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <AddView currentUid={currentuid} updateDashboardState={updateDashboardState} />               
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Soft Plus) */}
              {dashboardState.card01 && <DashboardCard01 currentUid={currentuid} updateDashboardState={updateDashboardState} />}
              {/* Line chart (Soft Advanced) */}
              {dashboardState.card02 && <DashboardCard02 currentUid={currentuid} updateDashboardState={updateDashboardState} />}
              {/* Line chart (Soft Professional) */}
              {dashboardState.card03 && <DashboardCard03 currentUid={currentuid} updateDashboardState={updateDashboardState} />}
              {/* Bar chart (Direct vs Indirect) */}
              {dashboardState.card04 && <DashboardCard04 currentUid={currentuid} updateDashboardState={updateDashboardState} />}
              {/* Line chart (Real Time Value) */}
              {dashboardState.card05 && <DashboardCard05 currentUid={currentuid} updateDashboardState={updateDashboardState}/>}
              {/* Doughnut chart (Top Countries) */}
              {dashboardState.card06 && <DashboardCard06 />}
              {/* Table (Top Channels) */}
              {dashboardState.card07 && <DashboardCard07 />}
              {/* Line chart (Sales Over Time) */}
              {dashboardState.card08 && <DashboardCard08 />}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {dashboardState.card09 && <DashboardCard09 />}
              {/* Card (Customers) */}
              {dashboardState.card10 && <DashboardCard10 />}
              {/* Card (Reasons for Refunds) */}
              {dashboardState.card11 && <DashboardCard11 />}
              {/* Card (Recent Activity) */}
              {dashboardState.card12 && <DashboardCard12 />}
              {/* Card (Income/Expenses) */}
              {dashboardState.card13 && <DashboardCard13 />}
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;