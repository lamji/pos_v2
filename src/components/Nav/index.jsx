import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import SimpleDialogDemo from '../Loader/backdrop';
import { useRouter } from 'next/router';
import { enablePullToRefresh, statusBar } from 'webtonative';
import BottomNav from '../Mobile/bottomNav';
import { getCookie } from '@/src/common/app/cookie';
import MobileDrawer from '../Mobile/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useDeviceType } from '@/src/common/helpers';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import useFetchDocumentsBackup from '@/src/common/hooks/useFetchDocuments';

// import LogoutIcon from '@mui/icons-material/Logout';

export default function Nav() {
  const { fetchDocuments } = useFetchDocumentsBackup();
  const { isMobile } = useDeviceType();
  const router = useRouter();
  const currentPath = router.pathname;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = getCookie('t');

  enablePullToRefresh(true);
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
      console.log('Backup completed');
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setLoading(false);
    }
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
          padding: '10px',
          background: token ? '#ef783e' : 'white',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,

          height: '60px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
          {token && (
            <>
              <Box>
                <IconButton onClick={() => setOpen(true)}>
                  <MenuIcon style={{ color: 'white' }} />
                </IconButton>
                <MobileDrawer status={open} setStatus={(i) => setOpen(i)} />
              </Box>
            </>
          )}

          {token && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography fontWeight={700} textAlign="center">
                {currentPath === '/dashboard' && 'Dashboard'}
                {currentPath === '/' && 'POS'}

                {/* {currentPath === '/utang' && 'Total Utang:  ' + formatCurrency(state.totalUtang)} */}
                {currentPath === '/utang' && 'UTANG LIST'}
                {currentPath === '/add' && 'ADD / UPDATE'}
                {currentPath === '/payment' && 'PAYMENT'}
                {currentPath === '/admin' && 'ADMIN'}
                {currentPath === '/report' && 'REPORT'}
                {currentPath === '/backup' && 'BACKUP / RESTORE'}
              </Typography>
              <IconButton onClick={handleBackup}>
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  <CloudDoneIcon sx={{ color: 'white' }} />
                )}
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <SimpleDialogDemo />
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Box>
      <Box
        sx={{
          marginTop: '60px',
          position: 'relative',
        }}
      ></Box>
      {token && <>{isMobile && <BottomNav />}</>}
    </div>
  );
}
