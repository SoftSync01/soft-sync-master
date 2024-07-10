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
import { DndContext, useDroppable } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { SortableContext } from '@dnd-kit/sortable';


function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cards, setCards] = useState([
    { id: "card01", object: <Draggable id="card01"> <DashboardCard01 /></Draggable>},
    { id: "card02", object: <Draggable id="card02"> <DashboardCard02 /></Draggable>},
    { id: "card03", object: <Draggable id="card03"> <DashboardCard03 /></Draggable>},
    { id: "card04", object: <Draggable id="card04"> <DashboardCard04 /></Draggable>},
    { id: "card05", object: <Draggable id="card05"> <DashboardCard05 /></Draggable>},
    { id: "card06", object: <Draggable id="card06"> <DashboardCard06 /></Draggable>},
    { id: "card07", object: <Draggable id="card07"> <DashboardCard07 /></Draggable>},
    { id: "card08", object: <Draggable id="card08"> <DashboardCard08 /></Draggable>},
    { id: "card09", object: <Draggable id="card09"> <DashboardCard09 /></Draggable>},
    { id: "card10", object: <Draggable id="card10"> <DashboardCard10 /></Draggable>},
    { id: "card11", object: <Draggable id="card11"> <DashboardCard11 /></Draggable>},
    { id: "card12", object: <Draggable id="card12"> <DashboardCard12 /></Draggable>},
    { id: "card13", object: <Draggable id="card13"> <DashboardCard13 /></Draggable>}
  ])

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
            <DndContext>
                <div className="grid grid-cols-12 gap-6" >
              
                      {cards.map(card =>    
                        card.object
                      )}    
                  
          
              
                </div>
            </DndContext>
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;