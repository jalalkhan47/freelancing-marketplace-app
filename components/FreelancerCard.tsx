import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';

type FreelancerCardProps = {
  name: string;
  role: string;
  rating: number;
  price: string;
  avatarUri: string;
  onPress?: () => void;
};

export default function FreelancerCard({
  name,
  role,
  rating,
  price,
  avatarUri,
  onPress,
}: FreelancerCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.role} numberOfLines={1}>{role}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surface,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FontSizes.subtitle,
    fontWeight: '700',
    color: Colors.text,
  },
  role: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  rating: {
    fontSize: FontSizes.body,
    color: Colors.text,
    fontWeight: '600',
  },
  price: {
    fontSize: FontSizes.body,
    color: Colors.primary,
    fontWeight: '700',
  },
});