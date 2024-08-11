import { useState } from "react";

import "./Input.css";

export const Input = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);

    setInput("");
  };

  return (
    <div className="container">
      <input
        className="input dark:bg-slate-800"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>
      <button onClick={handleSubmit} className="button dark:bg-slate-700" >
        Add
      </button>
      </p>
        
      
    </div>
  );
};