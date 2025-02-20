interface createDailyLogProps {
  mood: number;
  anxietyLevel: number;
  sleepHours: number;
  physicalActivity: number;
  socialInteractions: number;
  stressLevel: number;
  symptom: string;
}

export function calculateMentalHealthScore({
  mood,
  anxietyLevel,
  sleepHours,
  physicalActivity,
  socialInteractions,
  stressLevel,
}: Omit<createDailyLogProps, "symptom">): number {
  const moodScore = mood / 10;
  const sleepScore = sleepHours / 24;
  const physicalActivityScore = physicalActivity / 10;
  const socialInteractionsScore = socialInteractions / 10;

  const anxietyScore = 1 - anxietyLevel / 10;
  const stressScore = 1 - stressLevel / 10;

  const weightedScore =
    moodScore * 0.2 +
    sleepScore * 0.2 +
    physicalActivityScore * 0.2 +
    socialInteractionsScore * 0.15 +
    anxietyScore * 0.15 +
    stressScore * 0.1;

  return Math.round(weightedScore * 100);
}
