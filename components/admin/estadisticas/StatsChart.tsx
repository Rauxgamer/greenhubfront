"use client";
import { useEffect, useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line,
  RadialBarChart, RadialBar, ResponsiveContainer
} from 'recharts';
import { fetchStatsData } from '@/services/dataService';

export default function StatsChart() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [sortType, setSortType] = useState('sold');

  useEffect(() => {
    fetchStatsData().then((data) => setData(data));
  }, []);

  const sortedData = [...data].sort((a, b) => b[sortType] - a[sortType]);

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
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select value={sortType} label="Ordenar por" onChange={(e) => setSortType(e.target.value)}>
            <MenuItem value="sold">Más vendidos</MenuItem>
            <MenuItem value="rating">Mejor valorados</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Tipo de Gráfico</InputLabel>
          <Select value={chartType} label="Tipo de Gráfico" onChange={(e) => setChartType(e.target.value)}>
            <MenuItem value="bar">Barras</MenuItem>
            <MenuItem value="pie">Pastel</MenuItem>
            <MenuItem value="area">Área</MenuItem>
            <MenuItem value="line">Línea</MenuItem>
            <MenuItem value="radial">Radial</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'bar' && (
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey={sortType} fill="#5B8FF9" radius={[8, 8, 0, 0]} />
          </BarChart>
        )}

        {chartType === 'pie' && (
          <PieChart>
            <Pie data={sortedData} dataKey={sortType} nameKey="name" cx="50%" cy="50%" outerRadius={120}>
              {sortedData.map((_, index) => (
                <Cell key={index} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}

        {chartType === 'area' && (
          <AreaChart data={sortedData}>
            <defs>
              <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey={sortType} stroke="#8884d8" fillOpacity={1} fill="url(#colorData)" />
          </AreaChart>
        )}

        {chartType === 'line' && (
          <LineChart data={sortedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey={sortType} stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        )}

        {chartType === 'radial' && (
          <RadialBarChart innerRadius="10%" outerRadius="80%" data={sortedData} startAngle={180} endAngle={0}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey={sortType} />
            <Tooltip />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
}
