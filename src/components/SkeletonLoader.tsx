import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, spacing } from '@constants';

interface SkeletonLoaderProps {
  variant?: 'banner' | 'card' | 'list' | 'category' | 'custom';
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
}

export default function SkeletonLoader({ 
  variant = 'card', 
  width, 
  height,
  style 
}: SkeletonLoaderProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const getVariantStyles = () => {
    switch (variant) {
      case 'banner':
        return { width: '100%', height: 200 };
      case 'card':
        return { width: width || '100%', height: height || 150 };
      case 'list':
        return { width: '100%', height: height || 80 };
      case 'category':
        return { width: width || '48%', height: height || 120 };
      default:
        return { width: width || '100%', height: height || 100 };
    }
  };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        getVariantStyles(),
        { opacity },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.gray[200],
    borderRadius: spacing.borderRadius.md,
  },
});


