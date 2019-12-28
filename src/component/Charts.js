import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import Moment from 'moment'
import 'moment/locale/id'

Moment.locale('id')

export default function charts(props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        width={600}
        height={400}
        data={props.data}
        margin={{
          top: 0, right: 0, left: 20, bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" vertical={false}/>
        <XAxis type="category" dataKey="time" tickFormatter={function(value, name) {
                return Moment(Moment(value, "ddd D-MMM-YYYY HH:mm").valueOf()).format('D-MMM')
              }}>
          <Label position='bottom' style={{ textAnchor: 'middle' }}>
            Time
          </Label>
        </XAxis>
        <YAxis type="number" domain={[0, 100]}>
          <Label position='insideLeft' style={{ textAnchor: 'middle' }}>
            Cap(%)
          </Label>
        </YAxis>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Area type="monotone" dataKey="capacity" stroke="#000000" fill="#7c7e80" activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
