import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  const toggleHelpful = (reviewId: string) => {
    const newHelpful = new Set(helpfulReviews);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
    }
    setHelpfulReviews(newHelpful);
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= rating ? 'star' : 'star-outline'}
        size={14}
        color={colors.warning}
      />
    ));
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Reviews Header */}
      <View style={styles.header}>
        <View style={styles.ratingSummary}>
          <Text style={styles.averageRating}>{averageRating}</Text>
          <View style={styles.starsContainer}>
            {renderStars(Math.floor(averageRating))}
          </View>
          <Text style={styles.totalReviews}>{totalReviews} reviews</Text>
        </View>
        <TouchableOpacity 
          style={styles.writeReviewButton}
          onPress={() => {/* TODO: Navigate to write review */}}
        >
          <Ionicons name="create-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.writeReviewText}>Write Review</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsList} showsVerticalScrollIndicator={false}>
        {displayedReviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{review.userName}</Text>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            
            <Text style={styles.reviewComment}>{review.comment}</Text>
            
            <View style={styles.reviewActions}>
              <TouchableOpacity 
                style={styles.helpfulButton}
                onPress={() => toggleHelpful(review.id)}
              >
                <Ionicons 
                  name={helpfulReviews.has(review.id) ? "thumbs-up" : "thumbs-up-outline"} 
                  size={16} 
                  color={helpfulReviews.has(review.id) ? colors.primary : colors.text.secondary} 
                />
                <Text style={[
                  styles.helpfulText,
                  { color: helpfulReviews.has(review.id) ? colors.primary : colors.text.secondary }
                ]}>
                  Helpful ({review.helpful})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <TouchableOpacity 
          style={styles.showMoreButton}
          onPress={() => setShowAllReviews(!showAllReviews)}
        >
          <Text style={styles.showMoreText}>
            {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </Text>
          <Ionicons 
            name={showAllReviews ? "chevron-up" : "chevron-down"} 
            size={16} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.padding.md,
    paddingBottom: spacing.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  ratingSummary: {
    alignItems: 'center',
  },
  averageRating: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    fontWeight: '700',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
  },
  totalReviews: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    backgroundColor: colors.background.yellow,
    borderRadius: spacing.borderRadius.sm,
    gap: spacing.xs,
  },
  writeReviewText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  reviewsList: {
    maxHeight: 400,
  },
  reviewItem: {
    marginBottom: spacing.padding.md,
    paddingBottom: spacing.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.padding.sm,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  reviewComment: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.padding.sm,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  helpfulText: {
    ...typography.textStyles.caption,
    fontWeight: '500',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.padding.sm,
    marginTop: spacing.padding.sm,
    gap: spacing.xs,
  },
  showMoreText: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
