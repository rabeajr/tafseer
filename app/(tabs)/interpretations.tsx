import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Moon, Book, Brain } from 'lucide-react-native';
import Header from '@/components/Header';
import InterpretationCard from '@/components/InterpretationCard';
import { mockDreams, mockInterpretations } from '@/utils/mockData';

export default function InterpretationsScreen() {
  const router = useRouter();
  const [selectedDreamId, setSelectedDreamId] = useState<string | null>(null);
  
  // Get dreams that have interpretations
  const dreamsWithInterpretations = mockDreams.filter(dream => dream.hasInterpretation);
  
  // If no dream is selected, default to the first one
  const currentDreamId = selectedDreamId || (dreamsWithInterpretations.length > 0 ? dreamsWithInterpretations[0].id : null);
  
  // Get the current dream and its interpretation
  const currentDream = currentDreamId ? mockDreams.find(d => d.id === currentDreamId) : null;
  const currentInterpretation = currentDreamId ? mockInterpretations[currentDreamId] : null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Dream Interpretations" />
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dreamSelector}
        contentContainerStyle={styles.dreamSelectorContent}
      >
        {dreamsWithInterpretations.map((dream) => (
          <TouchableOpacity
            key={dream.id}
            style={[
              styles.dreamItem,
              currentDreamId === dream.id && styles.selectedDreamItem
            ]}
            onPress={() => setSelectedDreamId(dream.id)}
          >
            <Text 
              style={[
                styles.dreamItemTitle,
                currentDreamId === dream.id && styles.selectedDreamItemTitle
              ]}
              numberOfLines={1}
            >
              {dream.title}
            </Text>
            <Text 
              style={[
                styles.dreamItemDate,
                currentDreamId === dream.id && styles.selectedDreamItemDate
              ]}
            >
              {dream.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {currentDream && currentInterpretation ? (
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={styles.contentPadding}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dreamSummary}>
            <Text style={styles.dreamTitle}>{currentDream.title}</Text>
            <Text style={styles.dreamDate}>{currentDream.date}</Text>
            <Text style={styles.dreamContent}>{currentDream.content}</Text>
            <View style={styles.emotionTags}>
              {currentDream.emotions.map((emotion, index) => (
                <View key={index} style={styles.emotionTag}>
                  <Text style={styles.emotionText}>{emotion}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.interpretationsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interpretations</Text>
              <Text style={styles.interpretationDate}>
                Interpreted on {currentInterpretation.date}
              </Text>
            </View>
            
            <InterpretationCard
              type="islamic"
              title={currentInterpretation.islamic.title}
              content={currentInterpretation.islamic.content}
            />
            
            <InterpretationCard
              type="spiritual"
              title={currentInterpretation.spiritual.title}
              content={currentInterpretation.spiritual.content}
            />
            
            <InterpretationCard
              type="scientific"
              title={currentInterpretation.scientific.title}
              content={currentInterpretation.scientific.content}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Moon size={48} color="#8469C9" style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateTitle}>No interpretations yet</Text>
          <Text style={styles.emptyStateText}>
            Record a dream and request an interpretation to see the analysis here
          </Text>
          <TouchableOpacity 
            style={styles.journalButton}
            onPress={() => router.push('/journal')}
          >
            <Text style={styles.journalButtonText}>Journal a Dream</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  dreamSelector: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dreamSelectorContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dreamItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
    minWidth: 120,
  },
  selectedDreamItem: {
    backgroundColor: '#8469C9',
  },
  dreamItemTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  selectedDreamItemTitle: {
    color: '#FFFFFF',
  },
  dreamItemDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedDreamItemDate: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contentContainer: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
    paddingBottom: 32,
  },
  dreamSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  dreamTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  dreamDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  dreamContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  emotionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionTag: {
    backgroundColor: '#F3F0FB',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8469C9',
  },
  interpretationsContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  interpretationDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 280,
  },
  journalButton: {
    backgroundColor: '#8469C9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  journalButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});