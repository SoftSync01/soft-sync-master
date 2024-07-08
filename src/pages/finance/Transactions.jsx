import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import Banner from '../../partials/Banner';
import {MonthlySpendingCard, WeeklyRevenueCard, DailyTrafficCard} from '../../partials/finance/Cards';
import Dropdown from '../../partials/finance/Dropdown';

function Transactions() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


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

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <div>
                <Dropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
              </div>
              

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Datepicker built with flatpickr */}
                <Datepicker align='left'/>               
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/*Expenses Graph*/}
                {(selectedOption != null) && <MonthlySpendingCard /> }
                {/*Calendar Graph*/}
                
                {/*Weekly Graph*/}
                {(selectedOption != null) && <WeeklyRevenueCard />}

                {/*Daily Traffic Graph*/}
                {(selectedOption != null) && <DailyTrafficCard />}
    
            </div>
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Transactions;