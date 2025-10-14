import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  ProductList: undefined;
  ProductDetail: {
    productId: string;
  };
};

export type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;
export type OrdersScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Orders'>;
export type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Profile'>;
export type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;
export type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
