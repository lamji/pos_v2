import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InventoryIcon from '@mui/icons-material/Inventory';
import { clearCookie } from '@/src/common/app/cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Typography } from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import { openAlert } from '@/src/common/reducers/items';
import { useDispatch } from 'react-redux';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';

interface PropsDrawer {
  status: boolean;
  setStatus: (i: boolean) => void;
}

export default function MobileDrawer({ status, setStatus }: PropsDrawer) {
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen: boolean) => () => {
    setStatus(newOpen);
  };
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

  const DrawerList = (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}
      role="presentation"
    >
      <Box onClick={toggleDrawer(false)} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            background: '#ef783e',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Image
            src="/logov3.png" // Placeholder logo URL
            alt="Bank Logo"
            width={40}
            height={40}
            priority
          />
          <Typography
            fontWeight={700}
            mx={2}
            variant="h6"
            textAlign={'center'}
            sx={{ color: 'white' }}
          >
            M-POS v.1.0
          </Typography>
        </Box>

        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push('/admin')}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary={'All Items'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push('/report')}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={'Report'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push('/inventory')}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary={'Create Inventory'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ padding: 2 }}>
        <List sx={{ padding: 0 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleReload}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <OnDeviceTrainingIcon />
              </ListItemIcon>
              <ListItemText primary="Refresh" />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleOpenAlert}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <RestoreIcon />
              </ListItemIcon>
              <ListItemText primary="Restore" />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0 }}>
          <ListItem disablePadding sx={{ padding: 0 }}>
            <ListItemButton onClick={handleSignout}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer open={status} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
