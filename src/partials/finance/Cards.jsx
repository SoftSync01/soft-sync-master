import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export function MonthlySpendingCard() {
    const data = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
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
        <div className="bg-white p-6 rounded-xl shadow-md col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-500">This month</span>
                <span className="text-gray-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold">$37.5K</h2>
                <span className="text-green-500">On track</span>
            </div>
            <div className="mt-4 h-36">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export function WeeklyRevenueCard() {
    const data = {
        labels: ['17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: 'Revenue',
                data: [5000, 10000, 7500, 12500, 10000, 15000, 17500],
                backgroundColor: '#9f7aea',
                borderColor: '#9f7aea',
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
        <div className="bg-white p-6 rounded-xl shadow-md col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-500">Weekly Revenue</span>
                <span className="text-gray-400">...</span>
            </div>
            <div className="mt-4 h-36">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

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
        <div className="bg-white p-6 rounded-xl shadow-md col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-500">Daily Traffic</span>
                <span className="text-gray-400">...</span>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold">2,579</h2>
                <span className="text-green-500">+4.26%</span>
            </div>
            <div className="mt-4 h-36">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
