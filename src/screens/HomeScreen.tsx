import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, RefreshControl } from "react-native";
import { HomeScreenNavigationProp } from "../types/navigation";
import { colors, typography, spacing } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { Header, SearchBar, GenericBanner } from "@components/index";
import categories from "@store/catagories";
import Categories from "@components/Categories";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setPromotions, setLoading } from "../store/promotionsSlice";
import { fetchPromotions } from "../services/promotions";
import LoadingSpinner from "@components/LoadingSpinner";
import ErrorView from "@components/ErrorView";

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector(state => state.promotions.promotions);
  const loading = useAppSelector(state => state.promotions.loading);
  const error = useAppSelector(state => state.promotions.error);
  
  const [refreshing, setRefreshing] = React.useState(false);
  
  const handleShopNow = () => {
    // Navigate to ProductList screen
    (navigation as any).navigate('ProductList', {});
  };

  const handleCartPress = () => {
    (navigation as any).navigate('Cart');
  };

  const handleSearchPress = () => {
    (navigation as any).navigate('Search');
  };

  const handleNotificationPress = () => {
    (navigation as any).navigate('Notifications');
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      dispatch(setLoading(true));
      const promotionsData = await fetchPromotions();
      dispatch(setPromotions(promotionsData));
    } catch (err) {
      console.error('Failed to load promotions:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPromotions();
    setRefreshing(false);
  };

  const handlePromotionAction = (promotion: any) => {
    if (!promotion.buttonAction) return;
    
    const [action, screen, ...params] = promotion.buttonAction.split(':');
    
    if (action === 'navigate') {
      const navigationParams = params.length > 0 
        ? { category: params[1] } 
        : {};
      (navigation as any).navigate(screen, navigationParams);
    }
  };

  const offerBannerImagePath = require("@assets/images/bannerImage.png");

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <Header onCartPress={handleCartPress} onNotificationPress={handleNotificationPress} />

      {/* Search Bar */}
      <SearchBar onSearchPress={handleSearchPress} />

      {/* Welcome Banner */}
      <GenericBanner 
        title="Welcome to GRABB ITT" 
        subtitle="Start shopping for all your daily needs" 
        buttonText="Shop Now" 
        buttonAction={handleShopNow}
      />

      { /* Dynamic Promotional Banners */}
      {loading && promotions.length === 0 ? (
        <LoadingSpinner text="Loading promotions..." />
      ) : error ? (
        <ErrorView 
          message="Failed to load promotions" 
          onRetry={loadPromotions}
        />
      ) : (
        promotions.filter(p => p.active).map((promotion) => (
          <GenericBanner
            key={promotion.id}
            title={promotion.title}
            subtitle={promotion.subtitle}
            buttonText={promotion.buttonText}
            buttonAction={() => handlePromotionAction(promotion)}
            imageUrl={promotion.imageUrl}
            onlyImage={promotion.type === 'banner'}
          />
        ))
      )}
      
      {/* Fallback static banner if no promotions */}
      {!loading && promotions.length === 0 && !error && (
        <GenericBanner bannerImagePath={offerBannerImagePath} onlyImage={true} title="Great Deals on Food" />
      )}

      {/* Categories Section */}
      <Categories categories={categories} navigation={navigation as any} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.padding.lg,
  },
});