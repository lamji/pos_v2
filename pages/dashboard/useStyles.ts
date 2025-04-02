export default function useStyles() {
  return {
    rootBox: {
      padding: '10px',
      background: 'white',
      borderRadius: 15,
      marginTop: '60px',
    },
    saleBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    onClickBox: {
      padding: '10px',
      // background: '#ef783e',
      borderRadius: 2,
      width: '48%',
      boxShadow: '1px 1px 18px -5px rgba(0,0,0,0.2)',
    },
    utangTyp: {
      fontSize: '9px',
      background: 'white',
      padding: '4px',
      borderRadius: '3px',
      color: 'red',
    },
    cashType: {
      fontSize: '9px',
      background: 'white',
      padding: '4px',
      borderRadius: '3px',
      mt: '3px',
    },
    todayBox: {
      padding: '10px',
      // border: '2px solid #ff6b23',
      // background: '#ef783e',
      borderRadius: 2,
      width: '48%',
      boxShadow: '1px 1px 18px -5px rgba(0,0,0,0.2)',
    },
    todayUtang: {
      fontSize: '9px',
      background: 'white',
      padding: '4px',
      borderRadius: '3px',
      color: 'red',
    },
    todayCash: {
      fontSize: '9px',
      background: 'white',
      padding: '4px',
      borderRadius: '3px',
      mt: '3px',
    },
    fastMovingWrapper: {
      background: '#ff6e31',
      p: 1,
      borderRadius: 2,
      mt: '5px',
      border: '2px solid #ffe8de',
      boxShadow: '1px 1px 18px -5px rgba(0,0,0,0.75)',
    },
    fastMovingTyp: {
      fontSize: '11px',
      fontWeight: 700,
      mb: '10px',
      color: 'white',
    },
    fastMovingMapBox: {
      padding: '9px',
      borderRadius: 2,
      border: '1px solid #2d3349',
      gap: 2,
      width: '90px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'center',
      margin: '1px',
      background: '#fff9f6',
      flexShrink: 0, // Prevent the items from shrinking
    },
    filterTyp: {
      fontSize: '12px',
      fontWeight: 700,
      my: 2,
    },
    transactionItemsMap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      borderBottom: '1px solid #e0e0e0',
      margin: '5px',
    },
    boxData: {
      background: '#F6F5F2',
      borderRadius: 2,
      marginBottom: '100px',
    },
    innerBox: {
      borderBottom: '1px solid #e0e0e0',
      padding: '5px ',
      margin: '5px',
    },
    transactionBox: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      mt: '3px',
    },
    tName: {
      fontSize: '10px',
      fontWeight: 700,
      width: '170px',
    },
    tDate: {
      width: '100px',
      color: 'gray',
      fontSize: '10px',
    },
  };
}
