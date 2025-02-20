import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import voidIllustration from "../assets/void.svg";

export function EmptyPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={voidIllustration} alt="Empty Page" width={250} />
      <p className="text-zinc-400 max-w-80 text-center leading-snug text-sm">
        It seems you have not created any logs yet.
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Add
        </Button>
      </DialogTrigger>
    </div>
  );
}
