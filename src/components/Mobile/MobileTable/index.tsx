import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Box,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import SlideTransition from '@mui/material/Slide';
import { formatCurrency } from '@/src/common/helpers';
import Barcode from 'react-barcode';

import { updateDocument } from '@/src/common/app/lib/pouchdbServiceItems';
import { openAlert } from '@/src/common/reducers/items';
import { useDispatch } from 'react-redux';
import { setRefetch } from '@/src/common/reducers/data';

type MobileTableProps = {
  title?: string;
  data: any;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <SlideTransition direction="up" ref={ref} {...props} />;
});

const MobileTable: React.FC<MobileTableProps> = ({ title = 'Users', data }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const dispatch = useDispatch();

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (selectedRow) {
      setSelectedRow({
        ...selectedRow,
        [field]: field === 'name' ? e.target.value : Number(e.target.value),
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateDocument({ ...selectedRow, type: 'New' });
      setOpenEdit(false);
      dispatch(
        openAlert({
          title: 'Success',
          message: 'Item updated successfully',
          type: 'updateItems',
        })
      );
      dispatch(setRefetch());
    } catch (error) {
      dispatch(
        openAlert({
          title: 'Error',
          message: 'Are you sure you want to restore?',
          type: '',
        })
      );
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: 'auto', padding: '10px' }} elevation={0}>
        <Typography variant="h6" sx={{ p: 2 }}>
          {title}
        </Typography>
        <Table size="small" aria-label="mobile table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ width: '20%', p: 0 }}>
                <strong>Stocks</strong>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <strong>Price</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow
                key={index}
                hover
                onClick={() => handleRowClick(row)}
                sx={{ cursor: 'pointer', py: 2 }}
              >
                <TableCell
                  sx={{
                    fontSize: '12px',
                    py: '15px',
                    textTransform: 'capitalize',
                    width: '50%',
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '12px',
                    px: '10px',
                    width: '20%',
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {row.quantity}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '12px',
                    textTransform: 'capitalize',
                    px: '10px',
                    width: '40%',
                  }}
                >
                  {formatCurrency(row.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Fullscreen Modal */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: 'transparent' }} elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Product Details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 3 }}>
          {openEdit ? (
            <>
              {selectedRow && (
                <DialogContentText component="div">
                  <Box sx={{ textAlign: 'center' }}>
                    <Barcode value={selectedRow?.barcode} />
                  </Box>
                  <Box sx={{ mb: 2, border: '1px solid gray', p: 2, borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom>
                      Edit Item
                    </Typography>
                    <TextField
                      label="Name"
                      variant="outlined"
                      size="small"
                      value={selectedRow.name}
                      onChange={(e: any) => handleChange(e, 'name')}
                      sx={{ mb: 2, mr: 2 }}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      label="Price"
                      variant="outlined"
                      size="small"
                      value={selectedRow.price}
                      onChange={(e: any) => handleChange(e, 'price')}
                      sx={{ mb: 2, mr: 2 }}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      label="Quantity"
                      variant="outlined"
                      size="small"
                      value={selectedRow.quantity || ''}
                      onChange={(e: any) => handleChange(e, 'quantity')}
                      sx={{ mb: 2, mr: 2 }}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      label="Regular Price"
                      variant="outlined"
                      size="small"
                      value={selectedRow.regularPrice}
                      onChange={(e: any) => handleChange(e, 'regularPrice')}
                      sx={{ mb: 2, mr: 2 }}
                      fullWidth
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 2 }}
                        onClick={() => {
                          handleClose();
                          setOpenEdit(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </DialogContentText>
              )}
            </>
          ) : (
            <>
              {selectedRow && (
                <DialogContentText component="div">
                  <Box sx={{ textAlign: 'center' }}>
                    <Barcode value={selectedRow?.barcode} />
                  </Box>
                  <Typography sx={{ fontSize: '12px' }}>
                    <strong>Product Name: </strong>
                    {selectedRow.name}
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    <strong>Price: </strong>
                    {formatCurrency(selectedRow.price)}
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    <strong>Stocks: </strong>
                    {selectedRow.quantity}
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    <strong>Regular Price: </strong>
                    {formatCurrency(selectedRow.regularPrice || 0)}
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    <strong>Interest: </strong>
                    {formatCurrency(selectedRow.price - selectedRow.regularPrice)}
                  </Typography>
                  {selectedRow && (
                    <>
                      <Button
                        variant="contained"
                        sx={{ textTransform: 'capitalize', p: 0, color: 'white' }}
                        onClick={() => {
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </DialogContentText>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileTable;
