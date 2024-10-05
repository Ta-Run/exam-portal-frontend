import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const JobRoleStatusChart = ({ jobRoleStatus }) => {
    // Extracting labels and data from jobRoleStatus
    const labels = jobRoleStatus.map(role => role.jobRole);
    const dataValues = jobRoleStatus.map(role => role.jobRoleCount);

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Candidates',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
    };
;
    return (
        <div className='jobrole-status-chart-area'>
            <div className="top-text">
                <h5>Job Role Status</h5>
            </div>
            <Pie data={data} options={options} />
        </div>
    );
};

export default JobRoleStatusChart;
