import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Header from '@components/Header';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { markAsRead, markAllAsRead, clearNotifications } from '../store/notificationsSlice';
import { NotificationType, Notification } from '../types/notification';
import { ProductListScreenNavigationProp } from '../types/navigation';

interface NotificationsScreenProps {
  navigation: ProductListScreenNavigationProp;
}

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.notifications.notifications);
  const unreadCount = useAppSelector(state => 
    state.notifications.notifications.filter(n => !n.read).length
  );

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    // Navigate based on notification data
    if (notification.data?.url === 'ProductList') {
      navigation.navigate('ProductList', {});
    } else if (notification.data?.orderId) {
      // Navigate to order detail
      navigation.navigate('Orders' as any);
    } else if (notification.data?.productId) {
      navigation.navigate('ProductDetail', { productId: notification.data.productId });
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => dispatch(clearNotifications())
        }
      ]
    );
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ORDER_STATUS:
        return 'checkmark-circle-outline';
      case NotificationType.PROMOTIONAL:
        return 'megaphone-outline';
      case NotificationType.SYSTEM:
        return 'information-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ORDER_STATUS:
        return colors.success;
      case NotificationType.PROMOTIONAL:
        return colors.warning;
      case NotificationType.SYSTEM:
        return colors.info;
      default:
        return colors.text.secondary;
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unread]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) + '20' }]}>
        <Ionicons 
          name={getNotificationIcon(item.type) as any} 
          size={24} 
          color={getNotificationColor(item.type)} 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
      </View>

      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  if (notifications.length === 0) {
    return (
      <View style={styles.container}>
        <Header 
          headerHeading="Notifications" 
          onlyBadges={true}
          showBackBtn={true}
          onBackPress={() => navigation.goBack()}
        />
        
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={80} color={colors.text.secondary} />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        headerHeading="Notifications" 
        onlyBadges={true}
        showBackBtn={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleMarkAllRead}>
          <Ionicons name="checkmark-done" size={18} color={colors.primary} />
          <Text style={styles.actionButtonText}>Mark All Read</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleClearAll}>
          <Ionicons name="trash-outline" size={18} color={colors.error} />
          <Text style={[styles.actionButtonText, { color: colors.error }]}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.padding.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.xl,
  },
  emptyTitle: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginTop: spacing.padding.lg,
    marginBottom: spacing.padding.sm,
  },
  emptySubtitle: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.padding.md,
  },
  actionButtonText: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: spacing.padding.md,
    paddingTop: spacing.padding.md,
    paddingBottom: spacing.padding.xl,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.padding.md,
    marginBottom: spacing.padding.sm,
    elevation: 1,
    shadowColor: colors.shadow.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unread: {
    backgroundColor: colors.primary + '10',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.padding.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  notificationMessage: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  notificationTime: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
});


