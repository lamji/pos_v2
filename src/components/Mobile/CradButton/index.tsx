import React from 'react';
import { Button, Typography, Box } from '@mui/material';

interface AppCardButtonProps {
  label: string;
  Icon: React.ComponentType<any>; // Accepts any icon component
  onCLickEvt: () => void; // Optional click handler
}

const AppCardButton: React.FC<AppCardButtonProps> = ({ label, Icon, onCLickEvt }) => {
  return (
    <>
      {label === 'empty' ? (
        <>
          <Box
            sx={{
              backgroundColor: 'white', // Button background color
              borderRadius: '10%', // Ensures the button is circular
              padding: 0, // Removes extra padding
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px', // Full width of the parent container
            }}
          ></Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100px', // Full width of the parent container
            }}
          >
            {/* Circle Button with Icon */}
            <Button
              onClick={onCLickEvt}
              variant="outlined"
              sx={{
                backgroundColor: 'white', // Button background color
                borderRadius: '10%', // Ensures the button is circular
                padding: 0, // Removes extra padding
                width: 60, // Set equal width and height for circle
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disableRipple // Removes the ripple effect
            >
              <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', textAlign: 'center' }}>
            {label}
          </Typography>
        </>
      )}
    </>
  );
};

export default AppCardButton;
