import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500">
        Oops! The page you're looking for does not exist.
      </p>

      <Button asChild>
        <Link to="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
