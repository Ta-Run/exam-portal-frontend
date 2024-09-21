import React from 'react';
import "./CandidateCount.scss";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1',
        uv: 0.7,
        pv: 0.3,
    },
    {
        name: '2',
        uv: 0.7,
        pv: 0.3,
    },
    {
        name: '3',
        uv: 0.8,
        pv: 0.2,
    },
    {
        name: '4',
        uv: 0.7,
        pv: 0.4,
    },
    {
        name: '5',
        uv: 0.6,
        pv: 0.5,
    },
    {
        name: '6',
        uv: 0.5,
        pv: 0.5,
    },
    {
        name: '7',
        uv: 0.4,
        pv: 0.6,
    },
    {
        name: '8',
        uv: 0.3,
        pv: 0.7,
    },
    {
        name: '9',
        uv: 0.4,
        pv: 0.8,
    },
    {
        name: '10',
        uv: 0.6,
        pv: 0.9,
    },
    {
        name: '11',
        uv: 0.8,
        pv: 1,
    },
    {
        name: '12',
        uv: 0.5,
        pv: 0.6,
    },
    {
        name: '13',
        uv: 0.4,
        pv: 0.8,
    },
    {
        name: '14',
        uv: 0.3,
        pv: 0.6,
    },
    {
        name: '15',
        uv: 0.2,
        pv: 0.5,
    },
    {
        name: '16',
        uv: 0.4,
        pv: 0.4,
    },
    {
        name: '17',
        uv: 0.4,
        pv: 0.3,
    }
];
const CandidateCount = () => {

    return (
        <div className="candidate-count-chart h-100">
            <p className="notes">Candidate Count</p>
            <ResponsiveContainer width="100%" height={240} >
                <LineChart
                    width={500}
                    height={240}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pv" stroke="#ACABAF" strokeWidth={4} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#FFAA20" strokeWidth={4} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CandidateCount