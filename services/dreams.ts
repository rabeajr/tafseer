import { supabase } from '@/lib/supabase';
import { Dream, Interpretation } from '@/utils/types';

export async function createDream(title: string, content: string, emotions: string[]) {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to create a dream');
  }

  const { data, error } = await supabase
    .from('dreams')
    .insert({
      title,
      content,
      emotions,
      user_id: user.user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDreams() {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to fetch dreams');
  }

  const { data, error } = await supabase
    .from('dreams')
    .select('*')
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getDreamWithInterpretation(dreamId: string) {
  const { data: dream, error: dreamError } = await supabase
    .from('dreams')
    .select('*')
    .eq('id', dreamId)
    .single();

  if (dreamError) throw dreamError;

  const { data: interpretation, error: interpretationError } = await supabase
    .from('interpretations')
    .select('*')
    .eq('dream_id', dreamId)
    .single();

  if (interpretationError && interpretationError.code !== 'PGRST116') {
    throw interpretationError;
  }

  return { dream, interpretation };
}