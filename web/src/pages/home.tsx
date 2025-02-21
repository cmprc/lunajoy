import { EmptyPage } from "../components/empty-page";
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";
import { CreateLog } from "@/components/create-log";
import { useLogs } from "@/context/logs-context";

export const Home = () => {
  const { logs, average, total, refreshLogs } = useLogs();
  if (!logs) return null;

  return (
    <div className="dark">
      <Header />

      <div className="px-4 max-w-screen-lg mx-auto">
        {logs.length === 0 ? (
          <EmptyPage />
        ) : (
          <Dashboard
            logs={logs}
            average={average}
            total={total}
            isConnected={true}
          />
        )}

        <CreateLog refreshLogs={refreshLogs} />
      </div>
    </div>
  );
};
