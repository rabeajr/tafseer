import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Globe, Moon, Sun, User, Info, ChevronRight, LogOut } from 'lucide-react-native';
import Header from '@/components/Header';
import { signOut } from '@/services/auth';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [primaryInterpretation, setPrimaryInterpretation] = useState<'islamic' | 'spiritual' | 'scientific'>('islamic');

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Settings" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>S</Text>
          </View>
          <View>
            <Text style={styles.userName}>Sarah Ahmed</Text>
            <Text style={styles.userEmail}>sarah.ahmed@example.com</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color="#8469C9" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Dream journal reminders</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#C7B8E7' }}
              thumbColor={notificationsEnabled ? '#8469C9' : '#F3F4F6'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              {darkMode ? (
                <Moon size={20} color="#8469C9" />
              ) : (
                <Sun size={20} color="#8469C9" />
              )}
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Change app appearance</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#C7B8E7' }}
              thumbColor={darkMode ? '#8469C9' : '#F3F4F6'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Globe size={20} color="#8469C9" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingDescription}>{language === 'en' ? 'English' : 'Arabic'}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interpretation Preferences</Text>
          
          <TouchableOpacity 
            style={[styles.interpretationOption, primaryInterpretation === 'islamic' && styles.selectedInterpretation]}
            onPress={() => setPrimaryInterpretation('islamic')}
          >
            <Text style={[styles.interpretationTitle, primaryInterpretation === 'islamic' && styles.selectedInterpretationText]}>
              Islamic
            </Text>
            <Text style={[styles.interpretationDescription, primaryInterpretation === 'islamic' && styles.selectedInterpretationText]}>
              Based on Islamic traditions and teachings
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.interpretationOption, primaryInterpretation === 'spiritual' && styles.selectedInterpretation]}
            onPress={() => setPrimaryInterpretation('spiritual')}
          >
            <Text style={[styles.interpretationTitle, primaryInterpretation === 'spiritual' && styles.selectedInterpretationText]}>
              Spiritual
            </Text>
            <Text style={[styles.interpretationDescription, primaryInterpretation === 'spiritual' && styles.selectedInterpretationText]}>
              Broader spiritual and metaphysical perspectives
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.interpretationOption, primaryInterpretation === 'scientific' && styles.selectedInterpretation]}
            onPress={() => setPrimaryInterpretation('scientific')}
          >
            <Text style={[styles.interpretationTitle, primaryInterpretation === 'scientific' && styles.selectedInterpretationText]}>
              Scientific
            </Text>
            <Text style={[styles.interpretationDescription, primaryInterpretation === 'scientific' && styles.selectedInterpretationText]}>
              Psychological and neurological insights
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Info size={20} color="#8469C9" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>About Dream Insights</Text>
              <Text style={styles.settingDescription}>Version 1.0.0</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color="#8469C9" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <View style={[styles.settingIconContainer, styles.logoutIcon]}>
              <LogOut size={20} color="#EF4444" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.logoutText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8469C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  userEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  interpretationOption: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  selectedInterpretation: {
    borderLeftColor: '#8469C9',
    backgroundColor: '#F3F0FB',
  },
  interpretationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  interpretationDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedInterpretationText: {
    color: '#8469C9',
  },
  logoutButton: {
    marginTop: 24,
  },
  logoutIcon: {
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
});