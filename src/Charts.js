import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

export default function charts(props) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart
        width={600}
        height={400}
        data={props.data}
        margin={{
          top: 0, right: 0, left: 20, bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" vertical={false}/>
        <XAxis type="category" dataKey="time">
          <Label position='bottom' style={{ textAnchor: 'middle' }}>
            Time
          </Label>
        </XAxis>
        <YAxis type="number" domain={[0, 100]}>
          <Label position='left' style={{ textAnchor: 'middle' }}>
            Cap
          </Label>
        </YAxis>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Area type="monotone" dataKey="capacity" stroke="#000000" fill="#000000" activeDot={{ r: 4 }} />
        {/* <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d"/>
        <Area type="monotone" dataKey="amt" stroke="#46ca9f" fill="#46ca9f"/> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
