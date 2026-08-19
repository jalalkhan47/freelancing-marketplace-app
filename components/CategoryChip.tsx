import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';

type CategoryChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CategoryChip({ label, selected = false, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
    fontWeight: '600',
  },
  textSelected: {
    color: Colors.white,
  },
});