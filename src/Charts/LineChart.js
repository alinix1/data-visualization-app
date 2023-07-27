import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale);

const LineChart = () => {
  const [chart, setChart] = useState([]);

  let baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10';
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  let apiKey = 'coinrankingf31ab871a484a83126c7e428e0b8c895a00ccf72debe343e';

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log(json);
            setChart(json.data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  let data = {
    labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: `${chart?.coins?.length} Coins Available`,
        data: chart.coins?.map((x) => x.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} height={400} />
    </>
  );
};

export default LineChart;
