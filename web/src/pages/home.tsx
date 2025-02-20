import { useEffect, useState } from "react";
import { EmptyPage } from "../components/empty-page";
import { getLogs } from "@/http/get-logs";
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";
import { CreateLog } from "@/components/create-log";

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
    <div className="dark">
      <Header />

      <div className="px-4 max-w-screen-lg mx-auto">
        {logs.length === 0 ? (
          <EmptyPage />
        ) : (
          <Dashboard logs={logs} average={result} />
        )}

        <CreateLog />
      </div>
    </div>
  );
};
