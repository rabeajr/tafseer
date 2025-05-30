import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Book, Moon, Sparkles } from 'lucide-react-native';

type InterpretationCardProps = {
  type: 'islamic' | 'spiritual' | 'scientific';
  title: string;
  content: string;
};

export default function InterpretationCard({ type, title, content }: InterpretationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'islamic':
        return <Moon size={18} color="#8469C9" />;
      case 'spiritual':
        return <Sparkles size={18} color="#8469C9" />;
      case 'scientific':
        return <Book size={18} color="#8469C9" />;
      default:
        return <Moon size={18} color="#8469C9" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {getIcon()}
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandText}>{expanded ? 'Less' : 'More'}</Text>
        </TouchableOpacity>
      </View>
      
      <Text 
        style={styles.content} 
        numberOfLines={expanded ? undefined : 3}
      >
        {content}
      </Text>
    </View>
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
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  expandButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  expandText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#8469C9',
  },
  content: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
});