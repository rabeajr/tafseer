import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Moon, Calendar } from 'lucide-react-native';
import { interpretDream } from '@/services/interpretations';
import { Dream } from '@/utils/types';

type DreamCardProps = {
  dream: Dream;
  onPress: () => void;
  onInterpretationComplete?: () => void;
};

export default function DreamCard({ dream, onPress, onInterpretationComplete }: DreamCardProps) {
  const [isInterpreting, setIsInterpreting] = useState(false);

  const handleInterpretPress = async () => {
    try {
      setIsInterpreting(true);
      await interpretDream(dream);
      onInterpretationComplete?.();
      Alert.alert(
        'Interpretation Complete',
        'Your dream has been interpreted! View it in the Interpretations tab.'
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to interpret dream. Please try again later.'
      );
    } finally {
      setIsInterpreting(false);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {dream.title}
        </Text>
        <View style={styles.dateContainer}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.date}>{dream.date}</Text>
        </View>
      </View>
      
      <Text style={styles.excerpt} numberOfLines={2}>
        {dream.content}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.emotionsContainer}>
          {dream.emotions.slice(0, 2).map((emotion, index) => (
            <View key={index} style={styles.emotionTag}>
              <Text style={styles.emotionText}>{emotion}</Text>
            </View>
          ))}
          {dream.emotions.length > 2 && (
            <View style={styles.emotionTag}>
              <Text style={styles.emotionText}>+{dream.emotions.length - 2}</Text>
            </View>
          )}
        </View>
        
        {!dream.hasInterpretation && (
          <TouchableOpacity 
            style={styles.interpretBtn}
            onPress={handleInterpretPress}
            disabled={isInterpreting}
          >
            <Moon size={14} color="#8469C9" />
            <Text style={styles.interpretText}>
              {isInterpreting ? 'Interpreting...' : 'Interpret'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  excerpt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emotionsContainer: {
    flexDirection: 'row',
  },
  emotionTag: {
    backgroundColor: '#F3F0FB',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
  },
  emotionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#8469C9',
  },
  interpretBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interpretText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#8469C9',
    marginLeft: 4,
  },
});