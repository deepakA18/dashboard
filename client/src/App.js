import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then(res => {
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch(error => {
        console.error('AxiosError:', error);
      });
  }, []);

  useEffect(() => {
    drawBarChart(filteredData);
  }, [filteredData]);

  const drawBarChart = (chartData) => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    d3.select('#chart-container svg').remove(); // Clear existing chart
  
    const svg = d3.select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);
  
    x.domain(chartData.map((d) => d.sector));
    y.domain([0, d3.max(chartData, (d) => +d.Intensity || 0)]);
  
    svg
      .selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.Country))
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(+d.Intensity || 0))  // Ensure 'Intensity' is treated as a number
      .attr('height', (d) => height - y(+d.Intensity || 0));
  
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));
  };
  

  const filter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredData(data.filter(f => f.topic.toLowerCase().includes(searchTerm)));
  };

  return (
    <div className='App'>
      <h1>Data Visualization Dashboard</h1>
      <div id="chart-container">
        <input type='text' onChange={filter} placeholder='Search by sector...' />
      </div>
    </div>
  );
};

export default App;
