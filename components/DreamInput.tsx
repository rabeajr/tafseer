import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Mic, Send } from 'lucide-react-native';
import EmotionTag from './EmotionTag';

const emotions = [
  'Fear', 'Joy', 'Sadness', 'Confusion', 
  'Peace', 'Anxiety', 'Wonder', 'Loneliness',
  'Hope', 'Frustration', 'Love', 'Anger'
];

type DreamInputProps = {
  onSubmit: (dreamText: string, selectedEmotions: string[]) => void;
};

export default function DreamInput({ onSubmit }: DreamInputProps) {
  const [dreamText, setDreamText] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = () => {
    if (dreamText.trim()) {
      onSubmit(dreamText, selectedEmotions);
      setDreamText('');
      setSelectedEmotions([]);
    }
  };

  const toggleRecording = () => {
    // In a real app, this would integrate with speech recognition
    setIsRecording(!isRecording);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe your dream..."
          placeholderTextColor="#9CA3AF"
          multiline
          value={dreamText}
          onChangeText={setDreamText}
        />
      </View>
      
      <View style={styles.emotionsSection}>
        <Text style={styles.emotionsTitle}>How did this dream make you feel?</Text>
        <View style={styles.emotionsContainer}>
          {emotions.map((emotion) => (
            <EmotionTag
              key={emotion}
              label={emotion}
              selected={selectedEmotions.includes(emotion)}
              onPress={() => toggleEmotion(emotion)}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingActive]}
          onPress={toggleRecording}
        >
          <Mic size={20} color={isRecording ? '#FFFFFF' : '#8469C9'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.submitButton, !dreamText.trim() && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!dreamText.trim()}
        >
          <Text style={styles.submitText}>Save Dream</Text>
          <Send size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1F2937',
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
  },
  emotionsSection: {
    marginBottom: 16,
  },
  emotionsTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F0FB',
    borderWidth: 1,
    borderColor: '#E9E1F9',
  },
  recordingActive: {
    backgroundColor: '#8469C9',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8469C9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  submitText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
});