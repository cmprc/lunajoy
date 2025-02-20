import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { BrainCog } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 h-16 border-grid sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-between" to="/home">
        <BrainCog size={24} />
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Hello, {user?.name}
        </span>
        <Button variant={"link"} onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
