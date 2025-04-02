import { CSSProperties } from 'react';

export const useStyles = () => {
  return {
    root: {
      paddingBottom: '60px',
      borderRadius: 10,
      background: 'white',
      marginTop: '-50px',
    } as CSSProperties,
    SecondaryBox: {
      backgroundColor: 'primary.main',
      height: '250px',
      padding: '70px 20px 200px 20px',
    } as CSSProperties,
    autoCompleteStyles: {
      width: '100%',
      background: 'white',
      borderRadius: '4px',
      '& .MuiAutocomplete-endAdornment': {
        display: 'none',
      },
      '& .MuiAutocomplete-inputRoot': {
        padding: '10px !important',
        borderRadius: '4px',
        '&:hover': {
          borderColor: '#888',
        },
      },
    } as CSSProperties,
    menuItems: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    } as CSSProperties,
    itemBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '98%',
      margin: '0 auto',
      background: '#f7f7f7',
      padding: '5px',
      mb: '3px',
      borderRadius: '10px',
    } as CSSProperties,
    receiptsText: {
      marginBottom: 0,
    } as CSSProperties,
  };
};
