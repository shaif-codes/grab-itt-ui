import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { colors, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const { width } = Dimensions.get('window');

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Main Image */}
      <View style={styles.mainImageContainer}>
        <Image 
          source={{ uri: images[currentImageIndex] }} 
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        {/* Image Counter */}
        <View style={styles.imageCounter}>
          <Text style={styles.counterText}>
            {currentImageIndex + 1} / {images.length}
          </Text>
        </View>

        {/* Discount Badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>25% OFF</Text>
        </View>
      </View>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
          contentContainerStyle={styles.thumbnailContent}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                currentImageIndex === index && styles.activeThumbnail
              ]}
              onPress={() => handleImageChange(index)}
            >
              <Image 
                source={{ uri: image }} 
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
  },
  mainImageContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: colors.background.secondary,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    top: spacing.padding.md,
    right: spacing.padding.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    borderRadius: spacing.borderRadius.sm,
  },
  counterText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.padding.md,
    left: spacing.padding.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    borderRadius: spacing.borderRadius.sm,
  },
  discountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  thumbnailContainer: {
    paddingVertical: spacing.padding.md,
  },
  thumbnailContent: {
    paddingHorizontal: spacing.padding.md,
    gap: spacing.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: spacing.borderRadius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});
