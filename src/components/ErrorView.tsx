import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { BUTTONS } from '@constants/button';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export default function ErrorView({ 
  message = 'Something went wrong. Please try again.',
  onRetry,
  retryText = 'Retry'
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <View style={styles.buttonContainer}>
          <Button
            title={retryText}
            onPress={onRetry}
            type={BUTTONS.PRIMARY}
            extraButtonStyle={styles.retryButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.padding.xl,
    backgroundColor: colors.background.primary,
  },
  title: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginTop: spacing.padding.lg,
    marginBottom: spacing.padding.sm,
  },
  message: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.padding.xl,
  },
  buttonContainer: {
    width: '100%',
  },
  retryButton: {
    width: '100%',
  },
});


