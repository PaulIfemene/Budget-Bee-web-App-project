import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import './Charts.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ sortedTransactions }) => {
  const dates = sortedTransactions.map((item) => item.date);
  const amounts = sortedTransactions.map((item) => item.amount);

  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === 'expense')
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  const finalSpendings = spendingData.reduce((acc, obj) => {
    const key = obj.tag;
    if (!acc[key]) {
      acc[key] = obj.amount;
    } else {
      acc[key] += obj.amount;
    }
    return acc;
  }, {});

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Amount Over Time',
        data: amounts,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(finalSpendings),
    datasets: [
      {
        label: 'Total Expensed',
        data: Object.values(finalSpendings),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className='charts-wrapper'>
      <div>
        <h2 style={{ marginTop: '0' }}>Financial Statistics</h2>
        <Line data={lineData} width={400} height={400} />
      </div>
      {Object.keys(finalSpendings).length > 0 && (
        <div>
          <h2>Total Spendings</h2>
          <Pie data={pieData} width={400} className='pieChart' />
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
