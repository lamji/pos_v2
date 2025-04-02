import { setData } from '@/src/common/reducers/data';
import Nav from '@/src/components/Nav';
import EditableTable from '@/src/components/Table';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { readAllDocuments } from '@/src/common/app/lib/pouchdbServiceItems';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookie = req.headers.cookie;

  const cookies = cookie ? parse(cookie) : undefined;
  const isAuthenticated = cookies?.t ? true : false;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      fullMode: false,
    },
  };
};

export default function Admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await readAllDocuments();
        dispatch(setData(docs));
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <EditableTable />
    </div>
  );
}
