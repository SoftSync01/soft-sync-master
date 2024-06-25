import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { auth } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import { ref,update,set,get} from "firebase/database";

function AddView({
  align, currentUid
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const allCards = Array.from({ length: 13 }, (_, i) => `card${String(i + 1).padStart(2, '0')}`);
  const [items, setItems] = useState([]);

  const renderAddButton = async (e) => {
    setDropdownOpen(!dropdownOpen);
    console.log("Addview Button Pressed");
    console.log(currentUid);
    const dbRef = ref(db, "user/" + currentUid);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const itemsArray = allCards
        .filter(card => !userData.hasOwnProperty(card))
        .map(card => ({
          id: card,
          label: card,
          checked: false,
        }));
      setItems(itemsArray); // Update the state with the new items array
    } else {
      alert("No data found");
    }
  };

  const handleAddView = async (e) =>{
    setDropdownOpen(false);
    const selected = {};
    items.forEach(item => {
      if (item.checked) {
        selected[item.id] = true;
      }
    });
    //setSelectedCards(selected);
    console.log('Selected cards:', selected);
    const dbRef = ref(db,"user/" + currentUid);
    update(dbRef,selected);
  }

  const handleCheckboxChange = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClear = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: false }))
    );
  };

  return (
    <div className="relative inline-flex">
      <button 
        ref={trigger}
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        aria-haspopup="true"
        onClick={renderAddButton}
        aria-expanded={dropdownOpen}
        >
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add view</span>
        <wbr />
      </button> 
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full right-0 min-w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 transition ease-out duration-200 transform`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">Add View</div>
          <ul className="mb-4">
            {items.map((item) => (
              <li key={item.id} className="py-1 px-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <span className="text-sm font-medium ml-2">{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20">
            <ul className="flex items-center justify-between">
              <li>
                <button
                  className="btn-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={handleAddView}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default AddView;
