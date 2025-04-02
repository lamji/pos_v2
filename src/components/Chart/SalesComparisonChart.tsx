import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register the components required for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesComparisonChartProps {
  salesData: number[]; // Sales data for each month of the year (12 months)
  monthLabels: string[]; // Labels for each month (e.g., ["Jan", "Feb", ..., "Dec"])
}

const SalesComparisonChart: React.FC<SalesComparisonChartProps> = ({ salesData, monthLabels }) => {
  const currentYear = new Date().getFullYear();

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: `Sales Comparison (${currentYear})`,
        data: salesData,
        fill: false,
        borderColor: '#ef783e',
        backgroundColor: 'rgba(239, 120, 62, 0.2)',
        pointBackgroundColor: '#ef783e',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Sales Comparison (${currentYear})`,
        font: {
          size: 14,
        },
      },
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesComparisonChart;
