interface createLogProps {
  symptom: string;
  mood: number;
  anxietyLevel: number;
  sleepHours: number;
  physicalActivity: number;
  socialInteractions: number;
  stressLevel: number;
}

export async function createLog({
  symptom,
  mood,
  anxietyLevel,
  sleepHours,
  physicalActivity,
  socialInteractions,
  stressLevel,
}: createLogProps) {
  const response = await fetch(`http://localhost:3000/log`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symptom,
      mood,
      anxietyLevel,
      sleepHours,
      physicalActivity,
      socialInteractions,
      stressLevel,
    }),
  });

  return response;
}
