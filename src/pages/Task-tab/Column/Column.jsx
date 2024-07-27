import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../Task/Task";

import "./Column.css";

export const Column = ({ tasks, onRemove }) => {
  return (
    <div className="column dark:bg-slate-700">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy} >
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} onRemove={onRemove}/>
        ))}
      </SortableContext>
    </div>
  );
};
