export type Emotion = "happy" | "sad" | "surprised" | "laughing" | "love" | "cool";

export interface EmotionConfig {
  id: Emotion;
  label: string;
  description: string;
}

export const EMOTIONS: EmotionConfig[] = [
  { id: "happy", label: "Happy", description: "😊" },
  { id: "sad", label: "Sad", description: "😢" },
  { id: "surprised", label: "Surprised", description: "😲" },
  { id: "laughing", label: "Laughing", description: "😂" },
  { id: "love", label: "Love", description: "💕" },
  { id: "cool", label: "Cool", description: "😎" },
];

export function getEmotionLabel(emotion: Emotion): string {
  return EMOTIONS.find(e => e.id === emotion)?.label || emotion;
}
