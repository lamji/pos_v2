import {
  queryDocumentsByBarcode,
  readAllDocuments,
} from '@/src/common/app/lib/pouchdbServiceItems';
import { useDeviceType } from '@/src/common/helpers';
import { getDataRefetch } from '@/src/common/reducers/data';
import {
  addItem,
  deleteItem,
  getSelectedItems,
  removeItem,
  setIsBackDropOpen,
  updateItemQuantity,
} from '@/src/common/reducers/items';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useStyles } from './useStyels';

export default function useViewModel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { items } = useSelector(getSelectedItems);
  const { isRefetch } = useSelector(getDataRefetch);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeOrders, setActiveOrders] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemToDelete2, setItemToDelete] = useState('');
  const [deleteProduct, setDeleteProduct] = useState('');
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isFullDataLoaded, setIsFullDataLoaded] = useState(false);
  const [stocks, setStocks] = useState(0);
  const { isMobile, isLaptop, isPC } = useDeviceType();
  const isLarge = isLaptop || isPC;

  console.log('activeOrders', activeOrders);

  // const [lastScan, setLastScan] = useState(0);
  // const [isScanning, setIsScanning] = useState(false); // State to manage scanner visibility

  // const [jsonResponse, setJsonResponse] = useState(null); // State to hold the API response

  const handleClose = () => {
    setOpen(false);
    setItemToDelete(null);
  };

  // Initialize Audio only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preload the sound effect
      const scanSuccessSound = new Audio('/scan-success.mp3');
      scanSuccessSound.preload = 'auto';
      scanSuccessSound.load(); // Ensure the sound is loaded and ready to play
      window.SCAN_SUCCESS_SOUND = scanSuccessSound;
    }
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await readAllDocuments();
        setAllItems(docs);
      } catch (err) {
        console.error('Error fetching documents', err);
      }
    };

    fetchDocuments();
  }, [isRefetch]);

  const handleAddItem = (event, value) => {
    if (value) {
      if (value.quantity <= 0) {
        Swal.fire({
          title: 'Error!',
          text: `Item ${value.name} is out of stock`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        setActiveOrders(value);
        setAutocompleteValue(null);
        handleOpen(true);
        setStocks(value.quantity);
        //dispatch(addItem({ id: value.id, name: value.name, price: value.price, _id: value._id }));
      }
    }
  };

  const handleConfirm = () => {
    dispatch(deleteItem(itemToDelete2));
    handleClose();
    setItemToDelete('');
    setItemToDelete('');
  };

  const handleDeleteItem = (id, name) => {
    setOpen(true);
    setDeleteProduct(name);
    setItemToDelete(id);
  };

  const onNewScanResult = async (decodedText) => {
    // Debounce logic to avoid handling the same scan multiple times

    if (typeof window !== 'undefined' && window.SCAN_SUCCESS_SOUND) {
      try {
        window.SCAN_SUCCESS_SOUND.currentTime = 0; // Reset time to start from the beginning
        window.SCAN_SUCCESS_SOUND.play();
      } catch (error) {
        console.error('Error playing sound', error);
      }
    }

    try {
      const data = await queryDocumentsByBarcode(decodedText);

      if (data.length > 0) {
        dispatch(setIsBackDropOpen(false));
        const matchedItem = data[0];
        if (matchedItem?.quantity <= 0) {
          Swal.fire({
            title: 'Error!',
            text: `Item ${matchedItem.name} is out of stock`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          setActiveOrders(matchedItem);
          handleOpen(true);
        }
      } else {
        toast.error('Barcode not found');
      }
    } catch (error) {
      toast.error('Error fetching item data');
      dispatch(setIsBackDropOpen(false));
    } finally {
      dispatch(setIsBackDropOpen(false));
    }
  };

  const handleIncreaseQuantity = (id) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(
      updateItemQuantity({
        id,
        quantity: (items.find((item) => item.id === id)?.quantity ?? 0) + 1,
      })
    );
  };

  const handleDecreaseQuantity = (id) => {
    const quantity = items.find((item) => item.id === id)?.quantity ?? 0;
    if (quantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleIncrement = () => {
    if (isEdit) {
      handleIncreaseQuantity(activeOrders.id);
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (isEdit) {
      handleDecreaseQuantity(activeOrders.id);
    }
    if (quantity > 1) {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }
  };

  const handleChange = (value) => {
    setQuantity(value);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleCloseQty = () => {
    setModalOpen(false);
  };

  const handleConfirmQty = () => {
    const newData = {
      id: activeOrders.id,
      name: activeOrders.name,
      price: activeOrders.price,
      quantity: quantity,
      total: activeOrders.price * quantity,
      stocks: activeOrders.quantity,
      _id: activeOrders._id,
    };
    if (isEdit) {
      setModalOpen(false);
      setQuantity(1);
      setIsEdit(false);
    } else {
      console.log('newData', newData);
      dispatch(addItem(newData));
      setModalOpen(false);
      setQuantity(1);
      setIsEdit(false);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setQuantity(1);
  };

  const handleEditItem = (data) => {
    console.log(data);
    setStocks(data.stocks);
    setIsEdit(true);
    setActiveOrders(data);
    setQuantity(data.quantity);
    handleOpen();
  };

  useEffect(() => {
    if (allItems) {
      setDisplayedItems(allItems.slice(0, 10));
    }
  }, [allItems, refetch]);

  const handleInputChange = async (event, value) => {
    if (!isFullDataLoaded && value) {
      setIsFullDataLoaded(true);
      setDisplayedItems(allItems);
    }
  };

  const handleRefetch = (i) => {
    console.log(i);
    setIsFullDataLoaded(false);
    setRefetch(!refetch);
  };

  return {
    handleIncrement,
    handleDecrement,
    handleChange,
    handleOpen,
    handleCloseQty,
    handleConfirmQty,
    handleCancel,
    activeOrders,
    setActiveOrders,
    quantity,
    modalOpen,
    open,
    handleEditItem,
    setIsEdit,
    onNewScanResult,
    allItems,
    handleAddItem,
    handleDeleteItem,
    handleConfirm,
    items,
    handleClose,
    itemToDelete2,
    deleteProduct,
    autocompleteValue,
    setRefetch,
    handleRefetch,
    handleInputChange,
    displayedItems,
    stocks,
    isLarge,
    isMobile,
    classes,
  };
}
