import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Web storage adapter using localStorage
const WebStorageAdapter = {
  getItem: (key: string) => {
    try {
      return Promise.resolve(localStorage.getItem(key));
    } catch (error) {
      console.error('WebStorageAdapter getItem error:', error);
      return Promise.reject(error);
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      return Promise.resolve(undefined);
    } catch (error) {
      console.error('WebStorageAdapter setItem error:', error);
      return Promise.reject(error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve(undefined);
    } catch (error) {
      console.error('WebStorageAdapter removeItem error:', error);
      return Promise.reject(error);
    }
  },
};

// SecureStore adapter for native platforms
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Use platform-specific storage adapter
const storageAdapter = Platform.OS === 'web' ? WebStorageAdapter : ExpoSecureStoreAdapter;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: {
    schema: 'public',
  },
});

// Test the connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase Auth Event:', event);
});