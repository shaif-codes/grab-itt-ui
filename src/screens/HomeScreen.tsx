import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { HomeScreenNavigationProp } from "../types/navigation";
import { colors, typography, spacing } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { Header, SearchBar, GenericBanner } from "@components/index";
import categories from "@store/catagories";
import Categories from "@components/Categories";

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const offerBannerImagePath = require("@assets/images/bannerImage.png");
  
  const handleShopNow = () => {
    // Navigate to ProductList screen
    navigation.navigate('ProductList' as any);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar />

      {/* Welcome Banner */}
      <GenericBanner 
        title="Welcome to GRABB ITT" 
        subtitle="Start shopping for all your daily needs" 
        buttonText="Shop Now" 
        buttonAction={handleShopNow}
      />

      { /* Offer Banner */}
      <GenericBanner bannerImagePath={offerBannerImagePath} onlyImage={true} title="Great Deals on Food" />

      {/* Categories Section */}
      <Categories categories={categories} />

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