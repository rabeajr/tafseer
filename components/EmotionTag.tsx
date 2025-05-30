import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type EmotionTagProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function EmotionTag({ label, selected = false, onPress }: EmotionTagProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F3F0FB',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selected: {
    backgroundColor: '#E9E1F9',
    borderColor: '#8469C9',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedLabel: {
    color: '#8469C9',
    fontFamily: 'Poppins-Medium',
  },
});