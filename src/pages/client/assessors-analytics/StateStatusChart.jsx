import React from 'react';
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
            text: 'State Status',
        },
    },
};

const colors = [
    'rgba(255, 99, 132, 0.5)', // Red
    'rgba(54, 162, 235, 0.5)', // Blue
    'rgba(255, 206, 86, 0.5)', // Yellow
    'rgba(75, 192, 192, 0.5)', // Teal
    'rgba(153, 102, 255, 0.5)', // Purple
    'rgba(255, 159, 64, 0.5)', // Orange
];

const StateStatusChart = ({ stateBatchStatus }) => {
    console.log('stateBatchStatus', stateBatchStatus);

    const labels = stateBatchStatus&&stateBatchStatus.map(state => state.state);
    const dataValues =stateBatchStatus&& stateBatchStatus.map(state => state.stateCount);

    // Map colors to the data set based on the number of states
    const backgroundColors = stateBatchStatus&&stateBatchStatus.map((_, index) => colors[index % colors.length]);

    const data = {
        labels,
        datasets: [
            {
                label: 'Batch Count',
                data: dataValues,
                backgroundColor: backgroundColors,
            },
        ],
    };

    return (
        <div className='state-status-chart-area'>
            <div className="top-text">
                <h5>State Status</h5>
            </div>
            <Bar options={options} data={data} className='bar-chart' />
        </div>
    );
}

export default StateStatusChart;
