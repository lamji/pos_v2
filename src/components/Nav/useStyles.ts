import { CSSProperties } from 'react';

export default function useStyles() {
  return {
    root: {
      padding: '10px',
      color: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,

      height: '60px',
    } as CSSProperties,
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    } as CSSProperties,
    bottomSx: {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    } as CSSProperties,
    footerButton: {
      marginTop: '60px',
      position: 'relative',
    } as CSSProperties,
    receiptsWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as CSSProperties,
    receiptsText: {
      marginBottom: 0,
    },
  };
}
