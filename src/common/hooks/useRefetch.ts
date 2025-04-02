import { useDispatch } from 'react-redux';
import { setData } from '../reducers/data';
import { readAllDocuments } from '../app/lib/pouchdbServiceItems';

const useRefetch = () => {
  const dispatch = useDispatch();

  const refetch = async () => {
    try {
      const docs = await readAllDocuments();

      dispatch(setData(docs));
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  return refetch;
};

export default useRefetch;
