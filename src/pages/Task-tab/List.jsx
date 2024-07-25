import React, { useState } from 'react';

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
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from './Column/Column';
import { Input } from './Input/Input';
import { RemoveBt } from './Remove-bt/Remove-bt';

function List() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
    setCheckedItems({ ...checkedItems, [title]: false });
  };

  const handleRemoveTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  // const addTask = (title) => {
  //   const newId = tasks.length + 1;
  //   setTasks((tasks) => [...tasks, { id: newId, title }]);
  //   setCheckedItems((checkedItems) => ({ ...checkedItems, [newId]: false }));
  // };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
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