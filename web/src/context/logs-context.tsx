import React, { createContext, useContext, useEffect, useState } from "react";
import { getLogs } from "@/http/get-logs";
import { useWebSocket } from "@/hooks/use-websocket";

interface Log {
  date: string;
  averageScore: number;
}

interface LogsContextType {
  logs: Log[];
  result: number;
  isConnected: boolean;
  refreshLogs: () => Promise<void>;
}

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [result, setResult] = useState<number>(0);

  const { data: dailyLogs, isConnected } = useWebSocket(
    "ws://localhost:3000/ws/logs"
  );

  const refreshLogs = async () => {
    try {
      const result = await getLogs();
      setLogs(result.logs);
      setResult(result.average);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    if (isConnected && dailyLogs) {
      setLogs(dailyLogs.logs);
      setResult(dailyLogs.average);
    }
  }, [isConnected, dailyLogs]);

  useEffect(() => {
    refreshLogs();
  }, []);

  return (
    <LogsContext.Provider value={{ logs, result, isConnected, refreshLogs }}>
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => {
  const context = useContext(LogsContext);
  if (!context) throw new Error("useLogs must be used within a LogsProvider");
  return context;
};
