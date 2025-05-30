import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Moon, Calendar, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DreamCard from '@/components/DreamCard';
import { mockDreams } from '@/utils/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const recentDreams = mockDreams.slice(0, 3);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Sarah</Text>
          </View>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => router.push('/history')}
          >
            <Search size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Unlock the wisdom in your dreams</Text>
            <Text style={styles.heroSubtitle}>
              Record and interpret your dreams from Islamic, spiritual, and scientific perspectives
            </Text>
            <TouchableOpacity 
              style={styles.journalButton}
              onPress={() => router.push('/journal')}
            >
              <Text style={styles.journalButtonText}>Journal a Dream</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Moon size={24} color="#8469C9" />
            <Text style={styles.statValue}>{mockDreams.length}</Text>
            <Text style={styles.statLabel}>Dreams</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#8469C9" />
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Days Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Moon size={24} color="#8469C9" />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Interpreted</Text>
          </View>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Dreams</Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentDreams.map((dream) => (
            <DreamCard
              key={dream.id}
              title={dream.title}
              date={dream.date}
              excerpt={dream.content}
              emotions={dream.emotions}
              onPress={() => router.push(`/dream/${dream.id}`)}
            />
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  heroImage: {
    width: '100%',
    height: 150,
  },
  heroContent: {
    padding: 16,
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 20,
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
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  recentSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#8469C9',
  },
});