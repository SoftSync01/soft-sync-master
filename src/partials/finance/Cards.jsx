import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

//Revenue [To do Week/Month/Year Filtering]
export function WeeklyRevenueCard({DateRange}) {

    const data = {
        labels: DateRange,
        datasets: [
            {
                label: 'Revenue',
                data: [5000, 10000, 7500, 12500, 10000, 15000, 17500],
                borderColor: '#9f7aea',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
                borderWidth: 2.5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md col-span-12 sm:col-span-12 lg:col-span-12">
            <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-100">Revenue</span>
                <span className="text-gray-400 dark:text-slate-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold dark:text-slate-100">$37.5K</h2>
                <span className="text-green-500 dark:text-green-400">On track</span>
            </div>
            <div className="mt-4 h-36">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

//Spendings Card [To do Week/Month/Year Filtering]
export function MonthlySpendingCard({DateRange}) {
    const data = {
        labels: DateRange,
        datasets: [
            {
                label: 'Spending',
                data: [30000, 35000, 37000, 40000, 38000, 37500],
                borderColor: '#4c51bf',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md col-span-4 sm:col-span-4 lg:col-span-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-100">Spendings</span>
                <span className="text-gray-400 dark:text-slate-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold dark:text-slate-100">$37.5K</h2>
                <span className="text-green-500 dark:text-green-400">On track</span>
            </div>
            <div className="mt-4 h-36">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

//Profit Margin [To do Week/Month/Year Filtering]
export function ProfitMargin({DateRange}) {

    const revenueData = [5000, 10000, 7500, 12500, 10000, 15000, 17500];
    const spendingData = [200, 5000, 5000, 5000, 5000, 5000, 10000];

    function calculateProfitMargins(revenueData, spendingData) {
        const profitMargins = revenueData.map((revenue, index) => {
            const spending = spendingData[index];
            const profitMargin = ((revenue - spending) / revenue) * 100;
            return profitMargin.toFixed(2); // keeping two decimal places
        });
        return profitMargins;
    }

    const profitMargins = calculateProfitMargins(revenueData, spendingData);

    const data = {
        labels: DateRange,
        datasets: [
            {
                label: 'Profit',
                data: profitMargins,
                borderColor: '#4c51bf',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md col-span-4 sm:col-span-4 lg:col-span-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-100">Profit Margin</span>
                <span className="text-gray-400 dark:text-slate-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold dark:text-slate-100">{profitMargins[profitMargins.length - 1] + "%"}</h2>
                <span className="text-green-500 dark:text-green-400">On track</span>
            </div>
            <div className="mt-4 h-36">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

//Growth Rate [To do Week/Month/Year Filtering]
export function GrowthRate({DateRange}) {

    const calculateGrowthRates = (data) => {
        const growthRates = [];
        for (let i = 1; i < data.length; i++) {
            const growthRate = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
            growthRates.push(growthRate.toFixed(2)); // keeping two decimal places
        }
        return growthRates;
    };

    const revenueData = [5000, 10000, 7500, 12500, 10000, 15000, 17500];
    const growthRates = calculateGrowthRates(revenueData);

    const data = {
        labels: DateRange,
        datasets: [
            {
                label: 'Revenue change [%]',
                data: growthRates,
                borderColor: '#4c51bf',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md col-span-4 sm:col-span-4 lg:col-span-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-100">Growth Rate</span>
                <span className="text-gray-400 dark:text-slate-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold dark:text-slate-100">{growthRates[growthRates.length - 1] + "%"}</h2>
                <span className="text-green-500 dark:text-green-400">On track</span>
            </div>
            <div className="mt-4 h-36">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

//Top Spending [To do Week/Month/Year Filtering]
export function TopSpending({DateRange}) {
    const data = {
        labels: DateRange,
        datasets: [
            {
                label: 'Spending',
                data: [30000, 35000, 37000, 40000, 38000, 37500],
                borderColor: '#4c51bf',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const tableData = [
        {
            item: 'Github',
            sales: '2.4K',
            costPerItem: '$3,877',
            totalRevenue: 267,
            profitMargin: '4.7%',
            color: '#24292E'
        },
        {
            item: 'Twitter',
            sales: '2.2K',
            costPerItem: '$3,426',
            totalRevenue: 249,
            profitMargin: '4.4%',
            color: '#1DA1F2'
        },
        {
            item: 'Google ',
            sales: '2.0K',
            costPerItem: '$2,444',
            totalRevenue: 224,
            profitMargin: '4.2%',
            color: '#EA4335'
        }
    ];

    return (
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Selling Item</h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Item</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Sales</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Cost per Item</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Total Revenue</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Profit Margin</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <div className="flex items-center">
                          <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                            <circle fill={row.color} cx="18" cy="18" r="18" />
                          </svg>
                          <div className="text-slate-800 dark:text-slate-100">{row.item}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{row.sales}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-emerald-500">{row.costPerItem}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{row.totalRevenue}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">{row.profitMargin}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

// Daily Traffic [Sort by Week/Month/Year]
export function DailyTrafficCard() {
    const data = {
        labels: ['0', '4', '8', '12', '16'],
        datasets: [
            {
                label: 'Visitors',
                data: [500, 1500, 1000, 2000, 2500],
                backgroundColor: '#38b2ac',
                borderColor: '#38b2ac',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md col-span-12 sm:col-span-12 lg:col-span-12">
            <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-slate-100">Customer Traffic</span>
                <span className="text-gray-400 dark:text-slate-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold dark:text-slate-100">2,579</h2>
                <span className="text-green-500 dark:text-green-400">+4.26%</span>
            </div>
            <div className="mt-4 h-36">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
