import React from 'react'
import "./BarChart.scss";
import { BarChart, Bar, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        pv: 10,
    },
    {
        pv: 40,
    },
    {
        pv: 50,
    },
    {
        pv: 60,
    },
    {
        pv: 80,
    },
    {
        pv: 60,
    },
    {
        pv: 40,
    },
    {
        pv: 30,
    },
    {
        pv: 20,
    },
    {
        pv: 50,
    },
    {
        pv: 40,
    },
    {
        pv: 20,
    },
    {
        pv: 30,
    },
    {
        pv: 60,
    },
];

const BarChartCom = () => {
    return (
        <div className='bar-chart-area'>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis dataKey="name" /> */}
                    {/* <YAxis /> */}
                    <Tooltip />
                    <Bar dataKey="pv" stackId="a" fill="#7BA4FA" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartCom