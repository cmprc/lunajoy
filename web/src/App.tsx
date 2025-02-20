import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Home } from "./pages/home";
import { GoogleLogin } from "./pages/google-login";
import { ProtectedRoute } from "./components/protected-route";
import { NotFound } from "./pages/not-found";

export const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </AuthProvider>
);
