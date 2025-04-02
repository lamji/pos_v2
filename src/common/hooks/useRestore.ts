import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreDocument } from '../app/lib/pouchdbServiceItems';
import { restoreUtangDocument } from '../app/lib/pouchDbUtang';
import { restoreTransactionDocs } from '../app/lib/pouchDbTransaction';
import { setIsBackDropOpen } from '../reducers/items';
import apiClient from '../app/axios';

const useRestore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const restoreItems = async () => {
    setIsLoading(true);
    dispatch(setIsBackDropOpen(true)); // Open the backdrop
    setError(null); // Reset any previous errors

    try {
      const response = await apiClient.get('api/restore');

      const data = response.data;
      const userData = data.users || {};

      const itemsData = userData.items || [];
      const utangsData = userData.utangs || [];
      const transactionsData = userData.transactions || [];

      if (data.success) {
        // Create an array of promises for restoring 'items' documents
        const restoreItemPromises = itemsData.map(async ({ _rev, ...cleanedData }: any) => {
          await restoreDocument(cleanedData);
        });

        // Create an array of promises for restoring 'utang' documents
        const restoreUtangPromises = utangsData.map(async ({ _rev, ...cleanedData }: any) => {
          await restoreUtangDocument(cleanedData);
        });

        // Create an array of promises for restoring 'transactions' documents
        const restoreTransactionsPromises = transactionsData.map(
          async ({ _rev, ...cleanedData }: any) => {
            await restoreTransactionDocs(cleanedData);
          }
        );

        // Wait for all restore operations to complete
        await Promise.all([
          ...restoreItemPromises,
          ...restoreUtangPromises,
          ...restoreTransactionsPromises,
        ]);
      }
    } catch (err) {
      setError('An error occurred while restoring data');
      console.error(err);
    } finally {
      setIsLoading(false);
      dispatch(setIsBackDropOpen(false)); // Close the backdrop
    }
  };

  return { restoreItems, isLoading, error };
};

export default useRestore;
