import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import EventPopup from '../partials/Calendar/EventPopup'

function Calendar() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [events, setEvents] = useState([
    { title: 'My Event', start: '2024-07-08T07:30:00', allDay: true },
    { title: 'event 2', date: '2024-07-18' }
  ]);

  const addEvent = () => {
    const newEvent = { title: 'New Event', date: new Date().toISOString().split('T')[0] };
    //setEvents([...events, newEvent]);
  };

  const [open, setOpen] = useState(false);

  const handleOpenNewsletterModal = () => {
    setOpen(true);
  };

  const handleCloseNewsletterModal = () => {
    setOpen(false);
  };

  const handleSaveEvent = () => {
    // Add your save logic here
    console.log("Event saved");
    setOpen(false);
  };

  const modal = document.querySelector("#modal");
  const openModal = document.querySelector("#openModal");
  const closeModal = document.querySelector("#closeModal");

  if (modal) {
    openModal &&
      openModal.addEventListener("click", () => modal.showModal());

    closeModal &&
      closeModal.addEventListener("click", () => modal.close());
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
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Work in Progress */}
              Work in Progress (Calendar Tab)

              {/* Add Modal */}
              <EventPopup open={open} handleClose={handleCloseNewsletterModal} handleSave={handleSaveEvent}/>
            </div>
            {/* Calendar Object */}
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "addEventButton",
                center: "title",
                end: "today prev,next",
              }}
              customButtons={{
                addEventButton: {
                  text: 'Add Event',
                  click: handleOpenNewsletterModal
                }
              }}
              weekends={true}
              events={events}
            />
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Calendar;