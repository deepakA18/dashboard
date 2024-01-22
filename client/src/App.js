import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from "axios";
import './App.css';

const App = () => {
  const [data,setData] = useState([]);
  
  useEffect(()=> {
    const barChart = () => {
      const margin = {top: 20, right: 20, bottom: 30,left: 40};
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      const svg = d3.select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);
  
      x.domain(data.map((d) => d.Country));
      y.domain([0, d3.max(data, (d) => d.Intensity)]);
  
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.Country))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.Intensity))
        .attr('height', (d) => height - y(d.Intensity));
    }

    axios.get('/api/data')
    .then((res)=> setData(res.data))
    .catch((err)=> console.log("Error fetching data!",err))
  
    barChart();
  },[data])

  
  return (
    <div className='App'>
      <h1>Data Visualization Dashboard</h1>
      <div id="chart-container"></div>
    </div>
)}

export default App;
