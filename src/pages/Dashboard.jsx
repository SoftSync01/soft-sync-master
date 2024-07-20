import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
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
import { get, ref } from "firebase/database";
import DropdownFilter from '../components/DropdownFilter';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableCard } from '../partials/dashboard/SortableCards';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentuid, setCurrentUser] = useState("");
  const [dashboardState, setDashboardState] = useState([
    { id: 'card01', visible: true, component: DashboardCard01 },
    { id: 'card02', visible: true, component: DashboardCard02 },
    { id: 'card03', visible: false, component: DashboardCard03 },
    { id: 'card04', visible: false, component: DashboardCard04 },
    { id: 'card05', visible: false, component: DashboardCard05 },
    { id: 'card06', visible: false, component: DashboardCard06 },
    { id: 'card07', visible: false, component: DashboardCard07 },
    { id: 'card08', visible: false, component: DashboardCard08 },
    { id: 'card09', visible: false, component: DashboardCard09 },
    { id: 'card10', visible: false, component: DashboardCard10 },
    { id: 'card11', visible: false, component: DashboardCard11 },
    { id: 'card12', visible: false, component: DashboardCard12 },
    { id: 'card13', visible: false, component: DashboardCard13 },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInfo();
  }, []);

  const updateDashboardState = (updates) => {
    setDashboardState((prevState) => {
      const updatedState = prevState.map((card) =>
        updates[card.id] !== undefined ? { ...card, visible: updates[card.id] } : card
      );
      return updatedState;
    });
  };

  const getLoggedInfo = async () => {
    if (auth.currentUser == null) {
      navigate("/");
      return;
    }
    const currentuid = auth.currentUser.uid;
    setCurrentUser(currentuid);
    const dbRef = ref(db, "user/" + currentuid);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      setDashboardState((prevState) =>
        prevState.map((card) => ({
          ...card,
          visible: userData[card.id] ?? false,
        }))
      );
    } else {
      alert("no data found");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = dashboardState.findIndex(card => card.id === active.id);
      const newIndex = dashboardState.findIndex(card => card.id === over.id);

      const updatedCards = [...dashboardState];
      const [movedCard] = updatedCards.splice(oldIndex, 1);
      updatedCards.splice(newIndex, 0, movedCard);

      setDashboardState(updatedCards);
    }
  };

  const renderCard = (card) => {
    const { id, component: CardComponent, visible } = card;
    return visible ? (
      <SortableCard key={id} id={id} component={CardComponent} currentUid={currentuid} updateDashboardState={updateDashboardState} />
    ) : null;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
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
                <DropdownFilter dashboardState={dashboardState} updateDashboardState={updateDashboardState} />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <AddView currentUid={currentuid} updateDashboardState={updateDashboardState} />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={dashboardState.filter(card => card.visible).map(card => card.id)}>
                  {dashboardState.map(renderCard)}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
