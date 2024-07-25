import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  MouseSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from './Column/Column';
import { Input } from './Input/Input';
import { auth, db } from '../../firebase/firebase-config';
import { get, ref, set, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


function List() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   getLoggedInfo();
  // }, []);

  const getLoggedInfo = async () => {

    if (auth.currentUser == null) {
      navigate("/");
      return;
    }

    const currentuid = auth.currentUser.uid;
    const dbRef = ref(db, "user/" + currentuid + "/tasks");
    
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const fetchedData = snapshot.val();
      setTasks(fetchedData);

    } else {
      alert("no data found");
    }
  };

  const addTask = (title) => {
    const currentuid = auth.currentUser.uid;
    const dbRef = ref(db, "user/" + currentuid + "/tasks");
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
    console.log(tasks)
    set(dbRef, tasks);
  };

  const handleRemoveTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    console.log(tasks)
  };

  // const addTask = (title) => {
  //   const newId = tasks.length + 1;
  //   setTasks((tasks) => [...tasks, { id: newId, title }]);
  //   setCheckedItems((checkedItems) => ({ ...checkedItems, [newId]: false }));
  // };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
       distance: 25
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 25
      },
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

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
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                {/*Work in Progress*/}
                <Input onSubmit={addTask} />
                
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragEnd={handleDragEnd}
                >
                  <Column id="toDo" tasks={tasks} onRemove={handleRemoveTask}/>
                </DndContext>
            </div>
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default List;