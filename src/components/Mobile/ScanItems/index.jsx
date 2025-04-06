import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Box,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { formatCurrency } from '@/src/common/helpers';
import LinearIndeterminate from '../../Loader/linear';
import DeleteConfirmationDialog from '../DeleteModal';
import useViewModel from './useViewModel';
import dynamic from 'next/dynamic';
// import Html5QrcodePlugin from '../../Scanner/index';

const Checkout = dynamic(() => import('../CheckOut/index'));
const BarcodeScannerComponent = dynamic(() => import('../../wt2Scanner/index'));
const QuantityAdjuster = dynamic(() => import('../QtyConfrimatoin'));

const ComboBox = () => {
  const {
    handleIncrement,
    handleDecrement,
    handleChange,
    handleCloseQty,
    handleClose,
    deleteProduct,
    handleConfirmQty,
    handleCancel,
    activeOrders,
    quantity,
    modalOpen,
    open,
    handleEditItem,
    onNewScanResult,
    allItems,
    handleAddItem,
    handleDeleteItem,
    handleConfirm,
    items,
    autocompleteValue,
    handleRefetch,
    handleInputChange,
    displayedItems,
    stocks,
    classes,
  } = useViewModel();

  return (
    <>
      {allItems ? (
        <>
          <Box sx={classes.root}>
            <Box sx={classes.SecondaryBox}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={displayedItems}
                  value={autocompleteValue}
                  disabled={allItems.length === 0}
                  getOptionLabel={(option) => option.name}
                  sx={classes.autoCompleteStyles}
                  onInputChange={handleInputChange}
                  onChange={handleAddItem}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Item"
                      // InputLabelProps={{ shrink: false }}
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <InputAdornment position="end">
                              <IconButton>
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <MenuItem {...props}>
                      <Box sx={classes.menuItems}>
                        <Box>
                          <Typography fontSize={'12px'} variant="body2" mr={1} fontWeight={700}>
                            {option.name}
                          </Typography>
                          <Typography
                            fontSize={'12px'}
                            sx={{ color: option.quantity > 0 ? 'green' : 'red' }}
                            variant="body2"
                            mr={1}
                          >
                            Stocks:{option.quantity}
                          </Typography>
                        </Box>
                        <Typography fontSize={'12px'} variant="body2" color="textSecondary">
                          {formatCurrency(option.price)}
                        </Typography>
                      </Box>
                    </MenuItem>
                  )}
                />
                <Box sx={{ marginLeft: '20px' }}>
                  <BarcodeScannerComponent dataOut={(data) => onNewScanResult(data)} size={50} />
                  {/* <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={(decodedText) => onNewScanResult(decodedText)}
                /> */}
                </Box>
              </Box>

              <Box sx={{ textAlign: 'center', paddingBottom: '300px' }}>
                <Checkout isRefresh={(i) => handleRefetch(i)} />
              </Box>
            </Box>

            <Box sx={{ background: 'white', borderRadius: '50px 50px 0 0', marginTop: '-90px' }}>
              <List
                sx={{ marginTop: '0px', height: '50vh', overflow: 'scroll', padding: '30px 20px' }}
              >
                {items.length > 0 ? (
                  items
                    .slice()
                    .reverse()
                    .map((item) => (
                      <Box key={item.id} sx={classes.itemBox}>
                        <Box sx={{ width: '130px' }}>
                          <Typography
                            fontSize={'10px'}
                            fontWeight={700}
                          >{`${item.name}`}</Typography>
                          <Typography fontSize={'9px'} fontWeight={700}>{`${formatCurrency(
                            item.price
                          )}`}</Typography>
                          <Typography
                            color={'gray'}
                            fontSize={'10px'}
                          >{`Quantity: ${item.quantity}`}</Typography>
                        </Box>
                        <Box>
                          <Typography fontSize={'12px'}>
                            {formatCurrency(item.price * item.quantity)}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right', p: '5px' }}>
                          <IconButton
                            edge="end"
                            onClick={() => handleEditItem(item)}
                            sx={{ color: 'primary.main' }}
                          >
                            <EditIcon sx={{ fontSize: '19px' }} />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteItem(item.id, item.name)}
                            sx={{ color: 'error.main', ml: '20px' }}
                          >
                            <CloseIcon sx={{ fontSize: '19px' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    ))
                ) : (
                  <ListItem>
                    <ListItemText
                      primary={<Typography color="textSecondary">No items added yet.</Typography>}
                    />
                  </ListItem>
                )}
              </List>
            </Box>

            <ToastContainer />
            <DeleteConfirmationDialog
              open={open}
              onClose={handleClose}
              onConfirm={handleConfirm}
              item={deleteProduct}
            />
          </Box>

          <QuantityAdjuster
            open={modalOpen}
            handleClose={handleCloseQty}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onChange={handleChange}
            quantity={quantity}
            onConfirm={handleConfirmQty}
            onCancel={handleCancel}
            items={activeOrders}
            stocks={stocks}
          />
        </>
      ) : (
        <LinearIndeterminate />
      )}
    </>
  );
};

export default ComboBox;
