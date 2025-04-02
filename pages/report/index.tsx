import AppCardButton from '@/src/components/Mobile/CradButton';
import Nav from '@/src/components/Nav';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';
import { MobileScreenShare, Home, List } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import { Box } from '@mui/material';

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

export default function Report() {
  const cardButtons = [
    {
      label: 'Transactions',
      Icon: MobileScreenShare,
      onCLickEvt: () => alert('Button 1 clicked!'),
    },
    {
      label: 'G-List',
      Icon: List,
      onCLickEvt: () => alert('Button 2 clicked!'),
    },
    {
      label: 'Z-Reading',
      Icon: AddShoppingCartIcon,
      onCLickEvt: () => alert('Button 3 clicked!'),
    },
    {
      label: 'Home',
      Icon: Home,
      onCLickEvt: () => alert('Button 4 clicked!'),
    },
  ];

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Nav />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // Allow wrapping of items into two rows
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 1, // Adds space between the buttons
          padding: 2, // Optional padding
          width: '60%',
          margin: '0 auto', // Center the box
        }}
      >
        {cardButtons.map((button, index) => (
          <Box key={index}>
            <AppCardButton label={button.label} Icon={button.Icon} onCLickEvt={button.onCLickEvt} />
          </Box>
        ))}
      </Box>
    </div>
  );
}
