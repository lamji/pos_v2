import { CSSProperties } from 'react';

export const useStyles = () => {
  return {
    root: {
      borderRadius: '5px',
      marginBottom: '10px',
      marginTop: '50px',
    } as CSSProperties,
    button: {
      fontWeight: 700,
    } as CSSProperties,
    button2: {
      fontWeight: 700,
      width: '100%',
    } as CSSProperties,
    footerButton: {
      textAlign: 'center',
      width: '100% !important',
    } as CSSProperties,
    receiptsWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as CSSProperties,
    receiptsText: {
      marginBottom: 0,
    } as CSSProperties,
    partialButton: {
      padding: '10px',
      borderRadius: '10px',
      width: '90px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid',
      mx: '10px',
    } as CSSProperties,
    utangButton: {
      padding: '10px',
      borderRadius: '10px',
      width: '90px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mx: '10px',
      border: '2px solid',
    } as CSSProperties,
    notFoundSx: {
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'blue',
      mt: 2,
      fontSize: '12px',
    },
    backButtonSx: {
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'blue',
      mt: 2,
      fontSize: '12px',
    },
    personNotFound: {
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'blue',
      mt: 2,
      fontSize: '12px',
    },
    backButton2Sx: {
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'blue',
      mt: 2,
      fontSize: '12px',
    },
    payButtonSx: {
      width: '100%',
      height: '80px',
      fontSize: '20px',
      fontWeight: 700,
      '& .MuiButtonBase-root': { borderRadius: 'unset !important' },
    },
  };
};
