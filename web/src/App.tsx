import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import { Home } from "./pages/home";
import { GoogleLogin } from "./pages/google-login";
import { ProtectedRoute } from "./components/protected-route";
import { NotFound } from "./pages/not-found";
import { LogsProvider } from "./context/logs-context";

const ProtectedWithLogs = () => (
  <LogsProvider>
    <ProtectedRoute />
  </LogsProvider>
);

export const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedWithLogs />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);
