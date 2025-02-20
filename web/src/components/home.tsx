import { useEffect, useState } from "react";
import { EmptyPage } from "./empty-page";
import { Dashboard } from "./dashboard";
import { DailyLogForm } from "./daily-log-form";
import { getLogs } from "@/http/get-logs";
import { Header } from "./header";

interface Log {
  date: string;
  averageScore: number;
}

export const Home = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      const result = await getLogs();
      setLogs(result.logs);
      setResult(result.average);
    };
    fetchLogs();
  }, []);

  if (!logs) return null;

  return (
    <div className="h-screen dark">
      <Header />

      <div className="p-4 max-w-screen-lg mx-auto">
        {logs.length === 0 ? (
          <EmptyPage />
        ) : (
          <Dashboard logs={logs} average={result} />
        )}
        <DailyLogForm />
      </div>
    </div>
  );
};
