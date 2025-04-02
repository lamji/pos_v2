import React, { useState, useEffect } from 'react';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css'; // Import the theme
import { useSelector } from 'react-redux';
import { getData } from '@/src/common/reducers/data';

import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { usePaginateData } from '@/src/common/hooks/usePagination';
import MobileTable from '../Mobile/MobileTable';
// import { getItemsByName, postItemUpdate } from '@/src/common/api/testApi';

interface Item {
  _id: string;
  id: string;
  name: string;
  price: number;
  barcode: string;
  date: string;
  quantity: number;
  regularPrice: number;
}
const EditableTable = () => {
  const [items, setItems] = useState<Item[]>([]);
  const state = useSelector(getData);

  const {
    paginatedData,
    currentPage,
    totalPages,
    searchQuery,
    nextPage,
    prevPage,
    setSearchQuery,
  } = usePaginateData(items, 10); // 5 items per page

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchQuery(searchTerm || '');
  };
  // console.log(state);
  useEffect(() => {
    setItems(state);
  }, [state]);

  return (
    <Box sx={{ p: 1, m: 2, width: '100%', maxWidth: '1200px', mx: 'auto', marginTop: '80px' }}>
      <>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Item Look up"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e: any) => handleSearch(e)}
            sx={{ mr: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
            fullWidth
          />
        </Box>

        <MobileTable title="Product List" data={paginatedData} />
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={prevPage} disabled={currentPage === 1}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography sx={{ mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>

          <IconButton onClick={nextPage} disabled={currentPage === totalPages}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </>
    </Box>
  );
};

export default EditableTable;
