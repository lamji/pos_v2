import { useEffect, useState } from 'react';
import { readAllDocumentsTransactions } from '@/src/common/app/lib/pouchDbTransaction';
import useStyles from './useStyles';

type Transaction = {
  total: number;
  date: string;
};

export default function useViewModel() {
  const classes = useStyles();
  const [transactionsData, setTransactionsData] = useState<any>([]);

  function getMonthlyTotalsForYear(transactions: Transaction[], year: number): number[] {
    const monthlyTotals = Array(12).fill(0); // Initialize totals for Jan to Dec

    // Filter transactions based on the specified year
    const filteredTransactions = transactions.filter((tx) => {
      const txYear = new Date(tx.date).getFullYear();
      return txYear === year;
    });

    // Calculate monthly totals
    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.date);
      const month = date.getMonth(); // 0 = January, 11 = December
      monthlyTotals[month] += tx.total;
    });

    return monthlyTotals;
  }

  const yearToFilter = new Date().getFullYear(); // Dynamically get the current year
  const result = getMonthlyTotalsForYear(transactionsData, yearToFilter);

  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await readAllDocumentsTransactions();
        console.log('Fetched transactionsData', { data, classes });
        setTransactionsData(data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  return { classes, transactionsData, chartResult: result, monthLabels };
}
