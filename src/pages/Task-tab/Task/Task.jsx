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

  const handleSubmit = () => {
    console.log("testing")
    onRemove(id)
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
      {/* <input type="text" className="checkbox" checked={checked} onChange={() => {
            console.log("Checkbox clicked:", id);  // Add this line
        onCheckChange(id);
        }} /> */}

      {title}
      <div class="align-right">
      <button className="btn btn-success btn-lg float-right inputWithButton" type="submit" onClick={handleSubmit}>remove</button>
      </div>
    </div>
  );
};

