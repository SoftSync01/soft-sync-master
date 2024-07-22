import React from 'react';
import Flatpickr from 'react-flatpickr';
import { useState, useEffect } from 'react';

function Datepicker({align,setDateRange,Days}) {
  const [dates, setDates] = useState([new Date().setDate(new Date().getDate() - 6), new Date()]);
  //const [DateRange, setDateRange] = useState([]);

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - Days);

    const newDates = [startDate, endDate];
    setDates(newDates);
    handleDatesChange(newDates);
  }, [Days]);

  const formatDate = (date) => {
    if (Days > 30) {
      const month = date.toLocaleString('default', { month: 'long' });
      return month;
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}.${month}`;
    }
  };

  const getAllDatesInRange = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const handleDatesChange = (selectedDates) => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;
      const allDates = getAllDatesInRange(start, end);
      const formattedDates = allDates.map(date => formatDate(date));

      // If the difference between dates is 30 days or more, show by months
      if ((end - start) / (1000 * 60 * 60 * 24) >= 30) {
        const uniqueMonths = Array.from(new Set(formattedDates));
        setDateRange(uniqueMonths);
      } else {
        setDateRange(formattedDates);
      }
    }
    setDates(selectedDates); // Update state with selected dates
  };

  const options = {
    mode: 'range',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'M j, Y',
    defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
    prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      instance.element.value = dateStr.replace('to', '-');
      const customClass = (align) ? align : '';
      instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
    },
    onChange: handleDatesChange,
  }

  return (
    <div className="relative">
      <Flatpickr 
        className="form-input pl-9 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-[30rem] h-[2.80rem] bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" 
        options={options} 
        value={dates}
      />
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 ml-3" viewBox="0 0 16 16">
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  );
}

export default Datepicker;
