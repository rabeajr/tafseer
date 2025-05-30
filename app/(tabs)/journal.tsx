import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import DreamInput from '@/components/DreamInput';
import { createDream } from '@/services/dreams';

export default function JournalScreen() {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (dreamText: string, selectedEmotions: string[]) => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please add a title for your dream');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createDream(title, dreamText, selectedEmotions);
      Alert.alert(
        'Dream Saved',
        'Your dream has been saved successfully',
        [{ text: 'OK', onPress: () => {
          resetForm();
          router.push('/history');
        }}]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to save your dream. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Journal Your Dream" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.label}>Dream Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Give your dream a title..."
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <Text style={styles.label}>Dream Description</Text>
        <Text style={styles.tip}>
          Try to record your dream as soon as you wake up. Include as many details as you can remember: people, places, feelings, and any symbols that stood out.
        </Text>
        
        <DreamInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why journal your dreams?</Text>
          <Text style={styles.infoText}>
            Dream journaling helps you notice patterns in your dreams and gain insights into your subconscious mind. Regular journaling has been linked to improved self-awareness, creativity, and problem-solving abilities.
          </Text>
          <Text style={styles.infoText}>
            In Islamic tradition, dreams are considered a form of divine communication. The Prophet Muhammad (PBUH) said: "A good dream is from Allah, and a bad dream is from Satan."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  titleInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  tip: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  infoSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F3F0FB',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8469C9',
  },
  infoTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 20,
  },
});