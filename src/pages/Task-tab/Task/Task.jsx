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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task  dark:bg-slate-800">
      {/* <input type="text" className="checkbox" checked={checked} onChange={() => {
            console.log("Checkbox clicked:", id);  // Add this line
        onCheckChange(id);
        }} /> */}
      <div>
        {title}
      </div>
      <div class="mr-0 ml-auto ">
            <input type="button" class="btn mr-0 ml-auto" value="Remove" onClick={handleSubmit}></input>
      </div>
    </div>
  );
};

