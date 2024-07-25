import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";

export const Task = ({ id, title, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
      {/* <input type="text" className="checkbox" checked={checked} onChange={() => {
            console.log("Checkbox clicked:", id);  // Add this line
        onCheckChange(id);
        }} /> */}

      {title}
      {/* <div class="align-right"> */}
      <button className="inputWithButton" onClick={() => onRemove(id)}>remove</button>
      {/* </div> */}
    </div>
  );
};
