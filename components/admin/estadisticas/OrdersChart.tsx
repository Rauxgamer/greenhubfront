"use client";
import { useEffect, useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar, ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { fetchOrdersData } from '@/services/dataService';

export default function OrdersChart() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('pie');

  useEffect(() => {
    fetchOrdersData().then((data) => setData(data));
  }, []);

  return (
    <Box sx={{
      p: 4,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      bgcolor: 'background.paper',
      width: '100%',
      maxWidth: '900px',
      margin: 'auto'
    }}>
      <FormControl sx={{ minWidth: 150, mb: 2 }}>
        <InputLabel>Tipo de Gráfico</InputLabel>
        <Select value={chartType} label="Tipo de Gráfico" onChange={(e) => setChartType(e.target.value)}>
          <MenuItem value="pie">Pastel</MenuItem>
          <MenuItem value="radar">Radar</MenuItem>
          <MenuItem value="area">Área</MenuItem>
          <MenuItem value="line">Línea</MenuItem>
          <MenuItem value="radial">Radial</MenuItem>
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'pie' && (
          <PieChart>
            <Pie data={data} dataKey="quantity" nameKey="status" cx="50%" cy="50%" outerRadius={120}>
              {data.map((_, index) => (
                <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}

        {chartType === 'radar' && (
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="status" />
            <Radar name="Pedidos" dataKey="quantity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
            <Legend />
          </RadarChart>
        )}

        {chartType === 'area' && (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="status" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="quantity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorData)" />
          </AreaChart>
        )}

        {chartType === 'line' && (
          <LineChart data={data}>
            <XAxis dataKey="status" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        )}

        {chartType === 'radial' && (
          <RadialBarChart innerRadius="10%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="quantity" />
            <Tooltip />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
}
