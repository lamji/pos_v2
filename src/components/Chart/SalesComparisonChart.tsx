import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SalesComparisonChartProps {
  salesData: number[]; // Sales data for each month of the year (12 months)
  monthLabels: string[]; // Labels for each month (e.g., ["Jan", "Feb", ..., "Dec"])
}

const SalesComparisonChart: React.FC<SalesComparisonChartProps> = ({ salesData, monthLabels }) => {
  const currentYear = new Date().getFullYear();
  const data = {
    labels: monthLabels, // X-axis labels (Months)
    datasets: [
      {
        label: 'Sales Comparison (Year)',
        data: salesData, // Y-axis data (Sales)
        backgroundColor: '#ef783e', // Bar color
        borderColor: '#ef783e', // Border color
        borderWidth: 1,
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
            size: 10, // Adjust size for mobile view
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10, // Adjust size for mobile view
          },
          beginAtZero: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Sales Comparison (${currentYear})`,
        font: {
          size: 14, // Title size for mobile view
        },
      },
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 10, // Legend font size
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesComparisonChart;
