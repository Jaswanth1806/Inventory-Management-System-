import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import './InventoryChart.css'; // Import the CSS file

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function InventoryChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('http://localhost:9000/api/items')
      .then(response => {
        const items = response.data;
        const labels = items.map(item => item.name);
        const prices = items.map(item => item.price);

        setData({
          labels,
          datasets: [{
            label: 'Product Prices',
            data: prices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 2
          }]
        });
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="chart-container">
      <h2>Inventory Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
}

export default InventoryChart;
