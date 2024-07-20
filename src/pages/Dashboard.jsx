import React, { useState,useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
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
import { DndContext, closestCenter, closestCorners, useDroppable } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { SortableContext, arrayMove, rectSortingStrategy, verticalListSortingStrategy, rectSwappingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from './Card';


function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cards, setCards] = useState([
    { id: "card01", object: <DashboardCard01 />},
    { id: "card02", object: <DashboardCard02 />},
    { id: "card03", object: <DashboardCard03 />},
    { id: "card04", object: <DashboardCard04 />},
    { id: "card05", object: <DashboardCard05 />},
    { id: "card06", object: <DashboardCard06 />},
    { id: "card07", object: <DashboardCard07 />},
    { id: "card08", object: <DashboardCard08 />},
    { id: "card09", object: <DashboardCard09 />},
    { id: "card10", object: <DashboardCard10 />},
    { id: "card11", object: <DashboardCard11 />},
    { id: "card12", object: <DashboardCard12 />},
    { id: "card13", object: <DashboardCard13 />}
  ])

  const getCardPos = id => cards.findIndex(card =>
    card.id === id)

  const handleDragEnd = event => {
    const {active, over} = event;

      if (active.id === over.id) return;

      setCards(cards => {
        const originalIndex = getCardPos(active.id)
        const newIndex = getCardPos(over.id)
        
        return arrayMove(cards, originalIndex, newIndex)
      })
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
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                </button>                
              </div>

            </div>

            {/* Cards */}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div >
              <SortableContext items={cards} strategy={rectSortingStrategy} >
                <div className="grid grid-cols-12 gap-6 ">
                  {cards.map(card =>    
                    // <div key={card.id}>{card.object}</div>
                    <Card id={card.id} object={card.object} key={card.id}/>
                  )}    
                  </div>
              </SortableContext>
              </div>
            </DndContext>
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );       

  // function handleDragEnd(event) {
  //   const {active, over} = event;

  //   if (active.id !== over.id) {
  //     setCards(cards => {
  //       console.log(active.id + "over" + over.id)
  //       const oldIndex = cards.indexOf(active.id); // not sure what the fuck is wrong, but smth is wrong here
  //       const newIndex = cards.indexOf(over.id);
        
  //       return arrayMove(cards, oldIndex, newIndex);
  //     })
     
  //   }
  // }
}

export default Dashboard;