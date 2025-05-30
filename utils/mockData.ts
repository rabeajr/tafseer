import { Dream, Interpretation } from './types';

export const mockDreams: Dream[] = [
  {
    id: '1',
    title: 'Flying over the desert',
    content: 'I was flying over a vast desert landscape. The sand dunes were golden and seemed to stretch endlessly. I felt free and at peace, like I could go anywhere. The sky was a brilliant blue and I could feel the warmth of the sun.',
    date: 'May 15, 2025',
    emotions: ['Joy', 'Peace', 'Wonder'],
    hasInterpretation: true,
  },
  {
    id: '2',
    title: 'Lost in a maze',
    content: 'I found myself in a complex maze with high walls. No matter which way I turned, I couldn\'t find the exit. The walls seemed to shift and change. I felt increasingly anxious as time went on, until I woke up.',
    date: 'May 13, 2025',
    emotions: ['Anxiety', 'Confusion', 'Fear'],
    hasInterpretation: true,
  },
  {
    id: '3',
    title: 'Meeting a wise elder',
    content: 'I met an elderly person who spoke to me with great wisdom. They told me things about my life that seemed profound, though I can\'t remember the exact words now. They had kind eyes and wore traditional clothing.',
    date: 'May 10, 2025',
    emotions: ['Peace', 'Wonder', 'Hope'],
    hasInterpretation: false,
  },
  {
    id: '4',
    title: 'Water flowing uphill',
    content: 'I saw a stream of water flowing uphill, defying gravity. People around me didn\'t seem to notice this strange phenomenon. I tried to show others but they couldn\'t see what I was pointing at.',
    date: 'May 7, 2025',
    emotions: ['Confusion', 'Wonder'],
    hasInterpretation: false,
  },
  {
    id: '5',
    title: 'Ancient city in the clouds',
    content: 'I discovered a beautiful ancient city floating among the clouds. The architecture was a blend of Islamic and Byzantine styles. I walked through empty streets feeling both awe and a strange sadness.',
    date: 'May 3, 2025',
    emotions: ['Wonder', 'Sadness', 'Loneliness'],
    hasInterpretation: true,
  },
];

export const mockInterpretations: Record<string, Interpretation> = {
  '1': {
    id: 'i1',
    dreamId: '1',
    islamic: {
      title: 'Islamic Perspective',
      content: 'Flying in dreams often symbolizes spiritual elevation and freedom from worldly constraints. In Islamic dream interpretation, it can represent your spiritual journey and closeness to Allah. The peaceful feeling suggests you are on a positive path in your faith and spiritual growth.'
    },
    spiritual: {
      title: 'Spiritual Meaning',
      content: 'From a spiritual perspective, flying represents freedom from limitations and transcendence. The desert landscape symbolizes simplicity and clarity of thought. This dream suggests you may be entering a period of personal freedom and spiritual clarity.'
    },
    scientific: {
      title: 'Psychological Analysis',
      content: 'Psychologically, flying dreams often reflect a desire for freedom or escape from current pressures. The positive emotions you experienced indicate a healthy state of mind and possibly a recent release from stress. The desert may represent an open mental space where you can process thoughts clearly.'
    },
    date: 'May 15, 2025',
  },
  '2': {
    id: 'i2',
    dreamId: '2',
    islamic: {
      title: 'Islamic Perspective',
      content: 'Being lost in a maze can symbolize confusion in your faith journey or moral dilemmas you\'re facing. In Islamic tradition, such dreams might be encouraging you to seek guidance through prayer and reflection. The changing walls could represent the challenges of maintaining steadfastness in faith.'
    },
    spiritual: {
      title: 'Spiritual Meaning',
      content: 'Spiritually, mazes represent the journey of self-discovery and the challenges we face in understanding our true purpose. The shifting walls suggest you may be experiencing uncertainty about your path or direction in life. This dream invites introspection and patience.'
    },
    scientific: {
      title: 'Psychological Analysis',
      content: 'From a psychological perspective, maze dreams often reflect feelings of being trapped in a complicated situation in waking life. The anxiety you felt suggests you may be experiencing stress about making the right decisions. Consider what areas of your life feel confusing or overwhelming right now.'
    },
    date: 'May 13, 2025',
  },
  '5': {
    id: 'i5',
    dreamId: '5',
    islamic: {
      title: 'Islamic Perspective',
      content: 'In Islamic dream interpretation, cities in the clouds may represent aspirations toward paradise (Jannah). The blend of Islamic architecture suggests a connection to your cultural or religious heritage. The emptiness and mixed emotions could indicate a yearning for spiritual community or connection.'
    },
    spiritual: {
      title: 'Spiritual Meaning',
      content: 'Cities in the clouds symbolize ideals and aspirations beyond ordinary reality. The ancient architecture represents timeless wisdom and traditions. Your feelings of awe mixed with sadness might reflect an understanding of the beauty of spiritual traditions alongside awareness of their declining influence in modern life.'
    },
    scientific: {
      title: 'Psychological Analysis',
      content: 'Psychologically, this dream suggests a fascination with heritage and history, perhaps indicating you\'re reflecting on your cultural identity. The empty streets and feelings of loneliness might represent a sense of disconnection from your roots or community. The beauty you observed shows appreciation for cultural aesthetics.'
    },
    date: 'May 3, 2025',
  },
};