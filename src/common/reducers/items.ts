import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stocks: number;
  _id: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
  total: number;
  isBackDropOpen: boolean;
  alert: {
    open: boolean;
    title: string;
    message: string;
    type: string;
  };
}

const initialState: SelectedItemsState = {
  items: [],
  total: 0,
  isBackDropOpen: false,
  alert: {
    open: false,
    title: '',
    message: '',
    type: '',
  },
};

const calculateTotal = (items: SelectedItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setIsBackDropOpen: (state, action: PayloadAction<boolean>) => {
      state.isBackDropOpen = action.payload;
    },
    addItem: (state, action: PayloadAction<any>) => {
      const { id, name, price, quantity, stocks, _id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, name, price, quantity, stocks, _id });
      }
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.total = calculateTotal(state.items);
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.items = state.items.filter((item) => item.id !== id);
        state.total = calculateTotal(state.items);
      }
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.total = 0;
    },
    openAlert: (state, action: PayloadAction<{ title: string; message: string; type: string }>) => {
      state.alert = {
        open: true,
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    closeAlert: (state) => {
      state.alert = {
        open: false,
        title: '',
        message: '',
        type: '',
      };
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearItems,
  setIsBackDropOpen,
  deleteItem,
  openAlert,
  closeAlert,
} = selectedItemsSlice.actions;

export const getSelectedItems = (state: any) => state.selectedItems;

export default selectedItemsSlice.reducer;
