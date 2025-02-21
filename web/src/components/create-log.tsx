import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLog } from "@/http/create-log";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const createLogSchema = z.object({
  symptom: z.string().min(1, "Fill out the Symptoms"),
  mood: z.number().min(1).max(10),
  anxietyLevel: z.number().min(1).max(10),
  sleepHours: z.number().min(1).max(10),
  physicalActivity: z.number().min(1).max(10),
  socialInteractions: z.number().min(1).max(10),
  stressLevel: z.number().min(1).max(10),
});

type CreateLogProps = z.infer<typeof createLogSchema>;

export const CreateLog = ({ refreshLogs }: { refreshLogs: () => void }) => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateLogProps>({
    resolver: zodResolver(createLogSchema),
    defaultValues: {
      symptom: "",
      mood: 5,
      anxietyLevel: 5,
      sleepHours: 5,
      physicalActivity: 5,
      socialInteractions: 5,
      stressLevel: 5,
    },
  });

  async function handleCreateLog(data: CreateLogProps) {
    const response = await createLog(data);
    if (response.status !== 200) return;

    toast({
      description: "Log created successfully.",
    });

    await refreshLogs();

    reset();
    dialogCloseRef.current?.click();
  }

  async function handleCloseDialog() {
    reset();
  }

  return (
    <DialogContent
      className="dark max-w-4xl overflow-auto max-h-4/5"
      onCloseAutoFocus={handleCloseDialog}
    >
      <DialogHeader>
        <DialogTitle>Create a log</DialogTitle>
        <DialogDescription>
          Make sure to fill out all the fields on how you feel today.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form onSubmit={handleSubmit(handleCreateLog)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Label htmlFor="title">Symptom</Label>
            <div className="flex flex-col gap-1">
              <Input
                id="title"
                placeholder="Headache"
                {...register("symptom")}
              />
              {errors.symptom && (
                <span className="text-red-700 text-xs">
                  {errors.symptom.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <Label htmlFor="mood">Mood</Label>
              <Slider
                defaultValue={[6]}
                max={10}
                step={1}
                onValueChange={(value) => setValue("mood", value[0])}
              />
            </div>
            <div className="flex flex-col gap-6">
              <Label htmlFor="anxietyLevel">Anxiety</Label>
              <Slider
                defaultValue={[4]}
                max={10}
                step={1}
                onValueChange={(value) => setValue("anxietyLevel", value[0])}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <Label htmlFor="sleepHours">Sleep Hours</Label>
              <Slider
                defaultValue={[8]}
                max={10}
                step={1}
                onValueChange={(value) => setValue("sleepHours", value[0])}
              />
            </div>
            <div className="flex flex-col gap-6">
              <Label htmlFor="physicalActivity">Physical Activity</Label>
              <Slider
                defaultValue={[6]}
                max={10}
                step={1}
                onValueChange={(value) =>
                  setValue("physicalActivity", value[0])
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <Label htmlFor="socialInteractions">Social Interactions</Label>
              <Slider
                defaultValue={[2]}
                max={10}
                step={1}
                onValueChange={(value) =>
                  setValue("socialInteractions", value[0])
                }
              />
            </div>
            <div className="flex flex-col gap-6">
              <Label htmlFor="stressLevel">Stress</Label>
              <Slider
                defaultValue={[2]}
                max={10}
                step={1}
                onValueChange={(value) => setValue("stressLevel", value[0])}
              />
            </div>
          </div>
        </div>
        <Separator className="mt-8 mb-6" />
        <DialogFooter className="flex items-center justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              ref={dialogCloseRef}
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
