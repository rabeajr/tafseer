import { supabase } from '@/lib/supabase';
import { Dream, Interpretation } from '@/utils/types';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_GOOGLE_AI_API_URL;

export async function interpretDream(dream: Dream) {
  try {
    // First, check if interpretation already exists
    const { data: existingInterpretation } = await supabase
      .from('interpretations')
      .select('*')
      .eq('dream_id', dream.id)
      .single();

    if (existingInterpretation) {
      return existingInterpretation;
    }

    // Prepare the prompts for each interpretation type
    const prompts = {
      islamic: `As an expert in Islamic dream interpretation, analyze this dream considering Islamic traditions and teachings. Provide a clear title and detailed interpretation. Dream: ${dream.content}`,
      spiritual: `As a spiritual guide, interpret this dream from a broader spiritual and metaphysical perspective. Consider universal symbols and provide a clear title and detailed interpretation. Dream: ${dream.content}`,
      scientific: `As a psychology expert, analyze this dream from a scientific and psychological perspective. Consider modern dream research and provide a clear title and detailed interpretation. Dream: ${dream.content}`
    };

    // Get interpretations from Google AI
    const interpretations = await Promise.all(
      Object.entries(prompts).map(async ([type, prompt]) => {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            }
          })
        });

        const data = await response.json();
        const interpretation = data.candidates[0].content.parts[0].text;
        
        // Extract title and content from the response
        const lines = interpretation.split('\n');
        const title = lines[0].replace('Title: ', '');
        const content = lines.slice(1).join('\n').trim();

        return {
          type,
          title,
          content
        };
      })
    );

    // Store interpretation in Supabase
    const { data: newInterpretation, error } = await supabase
      .from('interpretations')
      .insert({
        dream_id: dream.id,
        islamic_title: interpretations[0].title,
        islamic_content: interpretations[0].content,
        spiritual_title: interpretations[1].title,
        spiritual_content: interpretations[1].content,
        scientific_title: interpretations[2].title,
        scientific_content: interpretations[2].content
      })
      .select()
      .single();

    if (error) throw error;

    // Update dream to mark it as interpreted
    await supabase
      .from('dreams')
      .update({ has_interpretation: true })
      .eq('id', dream.id);

    return newInterpretation;
  } catch (error) {
    console.error('Error interpreting dream:', error);
    throw error;
  }
}