import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import EventPopup from '../partials/Calendar/EventPopup'
import { auth } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import { get, ref, set, update} from "firebase/database";

function Calendar() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [events, setEvents] = useState([
    { title: 'My Event', start: '2024-07-08T07:30:00', allDay: true },
    { title: 'event 2', date: '2024-07-18' }
  ]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addEvent = () => {
    const newEvent = { title: 'New Event', date: new Date().toISOString().split('T')[0] };
    //setEvents([...events, newEvent]);
  };

  useEffect(() => {
    getLoggedInfo();
  }, []);

const getLoggedInfo = async () => {

    if (auth.currentUser == null) {
      navigate("/");
      return;
    }

    const currentuid = auth.currentUser.uid;
    //setCurrentUser(currentuid);
    const dbRef = ref(db, "user/" + currentuid + "/events");
    
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const fetchedData = snapshot.val();
      setEvents(fetchedData);

    } else {
      alert("no data found");
    }
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
    const newEvent = { title: title, start: date, allDay: true };
    // Add the new event to the existing events
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    const currentuid = auth.currentUser.uid;
    const dbRef = ref(db, "user/" + currentuid + "/events");
    set(dbRef, updatedEvents);

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
              <EventPopup open={open} handleClose={handleCloseNewsletterModal} handleSave={handleSaveEvent} setDate={setDate} setTitle={setTitle}/>
            </div>
            {/* Calendar Object */}
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "addEventButton prev,next",
                center: "title",
                end: "today dayGridMonth,timeGridWeek"
              }}
              customButtons={{
                addEventButton: {
                  text: 'Add Event',
                  click: handleOpenNewsletterModal
                }
              }}
              weekends={true}
              events={events}
              editable = {true}
              droppable={true}
            />
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Calendar;