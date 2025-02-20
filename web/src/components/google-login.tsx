import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import authIllustration from "../assets/auth.svg";

export function GoogleLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/status", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.isLoggedIn) {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatus();
  }, [navigate]);

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
        Log in
      </Button>
    </div>
  );
}
