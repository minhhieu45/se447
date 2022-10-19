import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default class Chart extends Component {
  render() {
    const data = [
      {
        name: "month 1",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "month 2",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "month 3",
        uv: 3000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "month 4",
        uv: 5000,
        pv: 2800,
        amt: 2290,
      },
      {
        name: "month 5",
        uv: 3000,
        pv: 2800,
        amt: 2290,
      },
      {
        name: "month 6",
        uv: 1000,
        pv: 100,
        amt: 2290,
      },
      {
        name: "month 7",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "month 8",
        uv: 2100,
        pv: 900,
        amt: 2290,
      },
      {
        name: "month 9",
        uv: 20,
        pv: 9000,
        amt: 2290,
      },
    ];
    return (
      <div>
        <h2>Sale Anlytics</h2>
        <LineChart
          width={1300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
