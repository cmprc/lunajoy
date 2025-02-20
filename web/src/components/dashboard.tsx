import {
  Brain,
  BrainCogIcon,
  Calendar,
  Logs,
  LogsIcon,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DialogTrigger } from "./ui/dialog";
import { ChartComponent } from "./chart";

export function Dashboard({ logs, average }: any) {
  return (
    <div className="flex flex-col gap-4 mt-4 mb-8">
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 text-sm">
          Here you can see a summary of your mental health over the last 7 days.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logs</CardTitle>
            <LogsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{"21"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BrainCogIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(average / 10).toFixed(1) || 0} / 10
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Mental Health Trends</CardTitle>
              <CardDescription>Last 7 Days</CardDescription>
            </div>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4" />
                Add
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent>
          <ChartComponent logs={logs} />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Average mental health score of {average / 10} out of 10 this week{" "}
            <Brain className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing daily scores for the last 7 days
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
