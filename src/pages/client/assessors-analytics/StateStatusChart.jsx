import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
        },
    },
};

const labels = ['ANDAMAN AND NICOBAR ISLANDS', 'ANDHRA PRADESH', 'ARUNACHAL PRADESH', 'ASSAM', 'BIHAR', 'CHANDIGARH', 'CHATTISGARH', 'DADRA AND NAGAR HAVELI', "DAMAN AND DIU", "DELHI", "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JAMMU AND KASHMIR", "JHARKHAND", "KARNATAKA", "KERALA", "LAKSHADWEEP", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORM", "NAGALAND", "ODISHA", "PUDUCHERRY", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTRAKHAND", "WEST BENGAL"];

export const data = {
    labels,
    datasets: [
        {
            label: 'Batch Count',
            data: [4],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};

const StateStatusChart = () => {
    return <div className='state-status-chart-area'>
        <div className="top-text">
            <h5>State Status</h5>
        </div>
        <Bar options={options} data={data} className='bar-chart' />
    </div>;
}

export default StateStatusChart