import React, { createContext, useContext, useEffect, useState } from "react";
import { getLogs } from "@/http/get-logs";
import { useWebSocket } from "@/hooks/use-websocket";
import { Loader } from "@/components/loader";

interface Log {
  date: string;
  averageScore: number;
}

interface LogsContextType {
  logs: Log[];
  average: number;
  total: number;
  isConnected: boolean;
  refreshLogs: () => Promise<void>;
}

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [average, setAverage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const { data: dailyLogs, isConnected } = useWebSocket(
    "ws://localhost:3000/ws/logs"
  );

  const refreshLogs = async () => {
    try {
      const result = await getLogs();

      setLogs(result.logs);
      setAverage(result.average);
      setTotal(result.total);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    refreshLogs();

    if (isConnected && dailyLogs) {
      setLogs(dailyLogs.logs);
      setAverage(dailyLogs.average);
      setTotal(dailyLogs.total);
    }
  }, [isConnected, dailyLogs]);

  if (loading) return <Loader />;

  return (
    <LogsContext.Provider
      value={{ logs, average, total, isConnected, refreshLogs }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => {
  const context = useContext(LogsContext);
  if (!context) throw new Error("useLogs must be used within a LogsProvider");
  return context;
};
