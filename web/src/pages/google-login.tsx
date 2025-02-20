import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LogIn } from "lucide-react";
import authIllustration from "../assets/auth.svg";
import { useAuth } from "@/context/AuthContext";

export function GoogleLogin() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <img src={authIllustration} alt="Authentication" width={250} />
      <p className="text-zinc-400 max-w-60 text-center text-sm">
        Log in with your Google account to have access to all features.
      </p>

      <Button
        onClick={() => {
          window.location.href = "http://localhost:3000/auth/google";
        }}
      >
        <LogIn className="size-4" />
        Log in with Google
      </Button>
    </div>
  );
}
