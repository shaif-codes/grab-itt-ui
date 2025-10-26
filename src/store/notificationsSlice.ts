import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationType } from '../types/notification';

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [
    {
      id: '1',
      type: NotificationType.PROMOTIONAL,
      title: 'Special Offer!',
      message: 'Get 50% off on all vegetables today',
      timestamp: Date.now() - 3600000,
      read: false,
      data: { url: 'ProductList' },
    },
    {
      id: '2',
      type: NotificationType.ORDER_STATUS,
      title: 'Order Delivered',
      message: 'Your order #12345 has been delivered',
      timestamp: Date.now() - 7200000,
      read: false,
      data: { orderId: '12345' },
    },
    {
      id: '3',
      type: NotificationType.SYSTEM,
      title: 'New Products Added',
      message: 'Check out our new collection of organic fruits',
      timestamp: Date.now() - 86400000,
      read: true,
      data: { productId: '1' },
    },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  clearNotifications,
  removeNotification,
} = notificationsSlice.actions;

// Selectors
export const selectUnreadCount = (state: { notifications: NotificationsState }) => 
  state.notifications.notifications.filter(n => !n.read).length;

export const selectNotifications = (state: { notifications: NotificationsState }) => 
  state.notifications.notifications;

export const selectNotificationsByType = (type: NotificationType) => 
  (state: { notifications: NotificationsState }) => 
    state.notifications.notifications.filter(n => n.type === type);

export default notificationsSlice.reducer;


