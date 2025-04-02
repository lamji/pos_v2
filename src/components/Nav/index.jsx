import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import SimpleDialogDemo from '../Loader/backdrop';
import { useRouter } from 'next/router';
import { enablePullToRefresh, statusBar } from 'webtonative';
// import BottomNav from '../Mobile/bottomNav';
import { getCookie } from '@/src/common/app/cookie';
import MobileDrawer from '../Mobile/Drawer';
import { useState } from 'react';
// import { useDeviceType } from '@/src/common/helpers';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import useFetchDocumentsBackup from '@/src/common/hooks/useFetchDocuments';
import useStyles from './useStyles';
import ModalAlert from '../Dialog/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedItems, closeAlert } from '@/src/common/reducers/items';
import useRestore from '@/src/common/hooks/useRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useRefetch from '@/src/common/hooks/useRefetch';

// import LogoutIcon from '@mui/icons-material/Logout';

export default function Nav() {
  const dispatch = useDispatch();
  const { alert } = useSelector(getSelectedItems);
  const { fetchDocuments } = useFetchDocumentsBackup();
  const { restoreItems } = useRestore();
  const refetch = useRefetch();
  const classes = useStyles();
  const router = useRouter();
  const currentPath = router.pathname;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = getCookie('t');

  enablePullToRefresh(false);
  statusBar({
    style: 'dark',
    color: '#ef783e',
    overlay: true, //Only for android
  });

  const handleBackup = async () => {
    setLoading(true);
    try {
      // Simulate backup request (replace with actual API call)
      await fetchDocuments();
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(closeAlert());

    // Create a map of alert types to their corresponding functions
    const alertActions = {
      restore: restoreItems,
      updateItems: refetch,
    };

    // Check if the type exists in the map, and call the corresponding function
    const action = alertActions[alert.type];
    if (action) {
      action(); // Call the action function dynamically
    }
  };

  const handleBack = () => {
    router.push('/'); // This will navigate back to the previous page
  };

  // useEffect(() => {
  //   // Run backup every 1 minute
  //   const interval = setInterval(() => {
  //     handleBackup();
  //   }, 60000); // 1 minute

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div>
      <Box
        sx={{
          background: token ? '#ef783e' : 'white',
          ...classes.root,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
          {token && (
            <>
              <Box>
                {currentPath !== '/' && (
                  <>
                    <IconButton onClick={handleBack}>
                      <ArrowBackIcon style={{ color: 'white' }} />
                    </IconButton>
                  </>
                )}

                <MobileDrawer status={open} setStatus={(i) => setOpen(i)} />
              </Box>
            </>
          )}

          {token && (
            <Box sx={classes.boxWrapper}>
              <Typography fontWeight={700} textAlign="center">
                {currentPath === '/dashboard' && 'Dashboard'}
                {currentPath === '/' && 'MOBILE POS'}

                {/* {currentPath === '/utang' && 'Total Utang:  ' + formatCurrency(state.totalUtang)} */}
                {currentPath === '/utang' && 'UTANG LIST'}
                {currentPath === '/add' && 'ADD / UPDATE'}
                {currentPath === '/payment' && 'PAYMENT'}
                {currentPath === '/admin' && 'ADMIN'}
                {currentPath === '/report' && 'REPORT'}
                {currentPath === '/backup' && 'BACKUP / RESTORE'}
                {currentPath === '/pos' && 'POS'}
              </Typography>
              <IconButton onClick={handleBackup}>
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  <CloudSyncIcon sx={{ color: 'white' }} />
                )}
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <SimpleDialogDemo />
      <ModalAlert
        open={alert.open}
        onClose={handleClose}
        title={alert.title}
        message={alert.message}
      />
      <Box sx={classes.bottomSx}></Box>
      <Box sx={classes.footerButton}></Box>
      {/* {token && <>{isMobile && <BottomNav />}</>} */}
    </div>
  );
}
