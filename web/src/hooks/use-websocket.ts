import { useEffect, useState } from "react";

interface DailyLogsResponse {
  logs: Log[];
  average: number;
}

interface Log {
  date: string;
  averageScore: number;
}

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<DailyLogsResponse | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, isConnected };
};
