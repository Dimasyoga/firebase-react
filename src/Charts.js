import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function charts(props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        width={600}
        height={400}
        data={props.data}
        margin={{
          top: 0, right: 0, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="timestamp"/>
        <YAxis/>
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stroke="#000000" fill="#000000" activeDot={{ r: 4 }} />
        {/* <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d"/>
        <Area type="monotone" dataKey="amt" stroke="#46ca9f" fill="#46ca9f"/> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
