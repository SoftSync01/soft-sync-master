import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import FilterButton from '../../components/DropdownFilter';
import DateSelect from '../../components/DateSelect';
import Datepicker from '../../components/Datepicker';
import Banner from '../../partials/Banner';
import {MonthlySpendingCard, WeeklyRevenueCard, DailyTrafficCard, ProfitMargin, GrowthRate,TopSpending} from '../../partials/finance/Cards';
import {Dropdown, DropdownDateTypeSelect} from '../../partials/finance/Dropdown';

function Transactions() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedType, setSelectedType] = useState("Month");
  const [DateRange, setDateRange] = useState([]);
  const [Days, setDays] = useState(7);


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

              {/* Project Selector */}
              <div>
                <Dropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                
              </div>
              

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* DateType Selector */}
                {<DateSelect setDays={setDays}/>}
                {/*<DropdownDateTypeSelect selectedType={selectedType} setSelectedType={setSelectedType}/>*/}
                {/* Datepicker built with flatpickr */}
                <Datepicker align='left' Days={Days} setDateRange={setDateRange}/>               
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/*Revenue Graph*/}
                {(selectedOption != null) && <WeeklyRevenueCard DateRange={DateRange} />}
                
                {/*Expenses Graph*/}
                {(selectedOption != null) && <MonthlySpendingCard DateRange={DateRange}/> }

                {/*Profit Margin Graph*/}
                {(selectedOption != null) && <ProfitMargin DateRange={DateRange}/> }
                
                {/*Growth Rate Graph*/}     
                {(selectedOption != null) && <GrowthRate DateRange={DateRange}/> }

                {/*Top Spendings list*/}
                {(selectedOption != null) && <TopSpending DateRange={DateRange}/>}                

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