import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown() {
    const options = ["Soft Plus", "Soft Advanced", "Soft Professional"];

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const refDropdown = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (refDropdown.current && !refDropdown.current.contains(event.target)) {
            setIsOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleButtonClick() {
        setIsOpen(!isOpen);
    };

    function handleOptionClick(option) {
        setSelectedOption(option);
        setIsOpen(false);
    }

    return (
        <div className="relative inline-block text-left">
            <div ref={refDropdown}>
                <button className="inline-flex justify-center w-72 px-4 py-2 text-lg font-bold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onClick={handleButtonClick}>
                    <span>{selectedOption ? selectedOption :'Choose a Project'}</span>
                </button>
                {isOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {options.map((option, index) => (
                        <button
                          key={index}
                          className="block w-full text-left px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
        </div>
    );
}
