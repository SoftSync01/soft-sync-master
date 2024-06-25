import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { auth } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import { get, ref,update } from "firebase/database";
import Dashboard from '../pages/Dashboard';

function DropdownFilter({ align, dashboardState, updateDashboardState}) {

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

  const clearFilter = async(e)=>{
    var filtercheckbox = document.querySelectorAll('input[type="checkbox"]');

    filtercheckbox.forEach(filtercheckbox =>{
      filtercheckbox.checked = false;
    });
  }

  const [items, setItems] = useState([]);

  const filterDashboard = async(e)=>{
    const currentuid = auth.currentUser.uid;
    console.log(currentuid);
    const dbRef = ref(db,"user/"+ currentuid);

    var Direct = document.getElementById("Direct");
    var RTV = document.getElementById("RTV");
    var Top = document.getElementById("Top");
    var Sales = document.getElementById("Sales");
    var Last = document.getElementById("Last");
    var TotalSpent = document.getElementById("TotalSpent");

    const updates = {
      card01: true,
      card02: true,
      card03: true,
      card04: Direct.checked,
      card05: RTV.checked,
      card06: Top.checked,
      card07: Top.checked,
      card08: Sales.checked,
      card09: Sales.checked,
      card10: Last.checked,
      card11: Last.checked,
      card12: TotalSpent.checked,
      card13: TotalSpent.checked,
    };

    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          // Check if key exists in userData before updating
          if (userData.hasOwnProperty(key)) {
            userData[key] = updates[key];
          }
        }
      }
      // Now userData contains updated values where keys exist in both objects
      console.log(userData);
      await update(dbRef,userData)
      updateDashboardState(userData);
    } else {
      alert("No data found");
      return;
    }
    setDropdownOpen(false);
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full left-0 right-auto min-w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === 'right' ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto'
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">Filters</div>
          <ul className="mb-4">
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" id = "Direct"/>
                <span className="text-sm font-medium ml-2">Direct VS Indirect</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" id = "RTV" />
                <span className="text-sm font-medium ml-2">Real Time Value</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" id = "Top"/>
                <span className="text-sm font-medium ml-2">Top Channels</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" id = "Sales" />
                <span className="text-sm font-medium ml-2">Sales VS Refunds</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" id = "Last" />
                <span className="text-sm font-medium ml-2">Last Order</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" id = "TotalSpent" />
                <span className="text-sm font-medium ml-2">Total Spent</span>
              </label>
            </li>
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20">
            <ul className="flex items-center justify-between">
              <li>
                <button className="btn-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200"
                  onClick={clearFilter}
                >
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                  //onClick={() => setDropdownOpen(false)}
                  //onClick={() => filterDashboard()}
                  onClick={filterDashboard}
                  onBlur={() => setDropdownOpen(false)}
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


export default DropdownFilter;

