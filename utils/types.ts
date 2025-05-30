export type Dream = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  emotions: string[];
  created_at: string;
  has_interpretation: boolean;
};

export type Interpretation = {
  id: string;
  dream_id: string;
  islamic_title: string;
  islamic_content: string;
  spiritual_title: string;
  spiritual_content: string;
  scientific_title: string;
  scientific_content: string;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  preferences: {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
    primaryInterpretation: 'islamic' | 'spiritual' | 'scientific';
  };
};