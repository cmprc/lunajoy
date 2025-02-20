interface Log {
  date: string;
  averageScore: number;
}

type LogsResponse = {
  average: number;
  logs: Log[];
};

export async function getLogs(): Promise<LogsResponse> {
  const response = await fetch("http://localhost:3000/logs", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
