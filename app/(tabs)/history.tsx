import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import Header from '@/components/Header';
import DreamCard from '@/components/DreamCard';
import { mockDreams } from '@/utils/mockData';
import { Dream } from '@/utils/types';

export default function HistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>(mockDreams);

  const markedDates = mockDreams.reduce((acc, dream) => {
    const dateObj = new Date(dream.date);
    const formattedDate = dateObj.toISOString().split('T')[0];
    acc[formattedDate] = { marked: true, dotColor: '#8469C9' };
    return acc;
  }, {} as Record<string, { marked: boolean; dotColor: string }>);

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: '#8469C9',
    };
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredDreams(mockDreams);
      return;
    }
    
    const results = mockDreams.filter(
      dream => 
        dream.title.toLowerCase().includes(query.toLowerCase()) ||
        dream.content.toLowerCase().includes(query.toLowerCase()) ||
        dream.emotions.some(emotion => 
          emotion.toLowerCase().includes(query.toLowerCase())
        )
    );
    
    setFilteredDreams(results);
  };

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    
    const results = mockDreams.filter(dream => {
      const dreamDate = new Date(dream.date);
      const formattedDreamDate = dreamDate.toISOString().split('T')[0];
      return formattedDreamDate === day.dateString;
    });
    
    setFilteredDreams(results.length ? results : mockDreams);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Dream History" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search dreams..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <View>
            {showCalendar ? 
              <Filter size={20} color="#8469C9" /> : 
              <CalendarIcon size={20} color="#8469C9" />
            }
          </View>
        </TouchableOpacity>
      </View>
      
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDateSelect}
            theme={{
              selectedDayBackgroundColor: '#8469C9',
              todayTextColor: '#8469C9',
              arrowColor: '#8469C9',
              dotColor: '#8469C9',
              monthTextColor: '#1F2937',
              textMonthFontFamily: 'Poppins-SemiBold',
              textDayFontFamily: 'Poppins-Regular',
              textDayHeaderFontFamily: 'Poppins-Medium',
            }}
          />
        </View>
      )}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedDate && (
          <View style={styles.filterInfo}>
            <Text style={styles.filterText}>
              Showing dreams for {new Date(selectedDate).toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => {
              setSelectedDate('');
              setFilteredDreams(mockDreams);
            }}>
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {filteredDreams.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No dreams found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or date filter
            </Text>
          </View>
        ) : (
          filteredDreams.map((dream) => (
            <DreamCard
              key={dream.id}
              title={dream.title}
              date={dream.date}
              excerpt={dream.content}
              emotions={dream.emotions}
              onPress={() => router.push(`/dream/${dream.id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 10,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F0FB',
    borderRadius: 8,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F0FB',
    borderRadius: 8,
  },
  filterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#4B5563',
  },
  clearFilterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#8469C9',
  },
  emptyState: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});