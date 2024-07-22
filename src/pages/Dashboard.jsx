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
import { get, ref, set, update} from "firebase/database";
import DropdownFilter from '../components/DropdownFilter';
import { DndContext, KeyboardSensor, useSensor, useSensors, MouseSensor } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableCard } from '../partials/dashboard/SortableCards';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentuid, setCurrentUser] = useState("");
  const [dashboardState, setDashboardState] = useState([
    { id: 'card01', visible: true, component: DashboardCard01, position: 1 },
    { id: 'card02', visible: true, component: DashboardCard02, position: 2 },
    { id: 'card03', visible: true, component: DashboardCard03, position: 3 },
    { id: 'card04', visible: true, component: DashboardCard04, position: 4 },
    { id: 'card05', visible: true, component: DashboardCard05, position: 5 },
    { id: 'card06', visible: true, component: DashboardCard06, position: 6 },
    { id: 'card07', visible: true, component: DashboardCard07, position: 7 },
    { id: 'card08', visible: true, component: DashboardCard08, position: 8 },
    { id: 'card09', visible: true, component: DashboardCard09, position: 9 },
    { id: 'card10', visible: true, component: DashboardCard10, position: 10 },
    { id: 'card11', visible: true, component: DashboardCard11, position: 11 },
    { id: 'card12', visible: true, component: DashboardCard12, position: 12 },
    { id: 'card13', visible: true, component: DashboardCard13, position: 13 },
  ]);


  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInfo();
  }, []);

  const updateDashboardState = (updates) => {
    setDashboardState((prevState) => {
      const updatedState = prevState.map((card) => {
        if (updates[card.id] !== undefined) {
          return { ...card, visible: updates[card.id].visible };
        }
        return card;
      });
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
      const fetchedData = snapshot.val();

    const transformedData = Object.keys(fetchedData).map(key => {
      const dbItem = fetchedData[key];
      const componentItem = dashboardState.find(item => item.id === key);
      if (componentItem) {
        return { id: key, ...dbItem, component: componentItem.component };
      } else {
        console.warn(`Component not found for key: ${key}`);
        return { id: key, ...dbItem, component: null };
      }
    }).filter(item => item.component !== null); // Filter out items with no component

    // Sort based on position
    transformedData.sort((a, b) => a.position - b.position);

    setDashboardState(transformedData);

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
      const updatedCardsWithPosition = updatedCards.map((card, index) => ({
        ...card,
        position: index + 1
      }));

      console.log(updatedCardsWithPosition);
      setDashboardState(updatedCardsWithPosition);

    // Construct the updates object
      const updates = {};
      updatedCardsWithPosition.forEach(card => {
        updates[`${card.id}/visible`] = card.visible;
        updates[`${card.id}/position`] = card.position;
      });

      console.log(updates);
      const dbRef = ref(db, "user/" + currentuid);
      update(dbRef, updates);
    }
  };

  const renderCard = (card) => {
    const { id, component: CardComponent, visible, position } = card;
    return visible ? (
      <SortableCard key={position} id={id} component={CardComponent} currentUid={currentuid} updateDashboardState={updateDashboardState} />
    ) : null;
  }; 

  const sensors = useSensors(
    
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 25
      },
    })
  );

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
                <Datepicker Days={Days} setDateRange={setDateRange}/>
                
                {/* Add view button */}
                <AddView currentUid={currentuid} updateDashboardState={updateDashboardState} />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
