import AppCardButton from '@/src/components/Mobile/CradButton';
import Nav from '@/src/components/Nav';
import { parse } from 'cookie';
// import { GetServerSideProps } from 'next';
import GridViewIcon from '@mui/icons-material/GridView';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RestoreIcon from '@mui/icons-material/Restore';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import React from 'react';
import { Box } from '@mui/material';

import { useRouter } from 'next/router';
import { clearCookie } from '@/src/common/app/cookie';
import { GetServerSideProps } from 'next';
import { openAlert } from '@/src/common/reducers/items';
import { useDispatch } from 'react-redux';

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

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    clearCookie(); // Ensure this properly clears the session cookies
    await router.push('/'); // Redirect to the home page
  };

  const handleOpenAlert = () => {
    dispatch(
      openAlert({
        title: 'Alert',
        message: 'Are you sure you want to restore?',
        type: 'restore',
      })
    );
  };

  const handleReload = () => {
    window.location.reload();
  };

  const cardButtons = [
    {
      label: 'Dashboard',
      Icon: GridViewIcon,
      onCLickEvt: () => router.push('/dashboard'),
    },
    {
      label: 'Transactions',
      Icon: MobileScreenShareIcon,
      onCLickEvt: () => alert('Button 1 clicked!'),
    },
    {
      label: 'G-List',
      Icon: ListIcon,
      onCLickEvt: () => alert('Button 2 clicked!'),
    },
    {
      label: 'Z-Reading',
      Icon: AddShoppingCartIcon,
      onCLickEvt: () => alert('Button 3 clicked!'),
    },
    {
      label: 'POS',
      Icon: PointOfSaleIcon,
      onCLickEvt: () => router.push('/pos'),
    },
    {
      label: 'Lista',
      Icon: FormatListNumberedIcon,
      onCLickEvt: () => router.push('/utang'),
    },
    {
      label: 'Add',
      Icon: PostAddIcon,
      onCLickEvt: () => router.push('/add'),
    },
    {
      label: 'Refresh',
      Icon: OnDeviceTrainingIcon,
      onCLickEvt: () => handleReload(),
    },
    {
      label: 'Products',
      Icon: ListAltIcon,
      onCLickEvt: () => router.push('/admin'),
    },
    {
      label: 'Restore',
      Icon: RestoreIcon,
      onCLickEvt: () => handleOpenAlert(),
    },
    {
      label: 'Logout',
      Icon: ExitToAppIcon,
      onCLickEvt: () => handleSignout(),
    },
    {
      label: 'empty',
      Icon: ExitToAppIcon,
      onCLickEvt: () => null,
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
          width: '100%',
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
