import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Header() {
  const handleLogout = () => {
    window.location.href = "http://localhost:3000/auth/logout";
  };

  return (
    <header className="flex items-center justify-between p-5 border-grid sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-between gap-2" to="/home">
        <h1 className="text-md font-bold">Luna Joy</h1>
      </Link>

      <div className="flex items-center">
        <Button variant={"outline"} size={"sm"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
