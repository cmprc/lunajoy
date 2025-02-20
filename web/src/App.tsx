import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebSocketProvider } from "./context/WebSocketContext";
import axios from "axios";
import { GoogleLogin } from "./components/google-login";
import { Home } from "./components/home";

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Router>
      <WebSocketProvider>
        <Routes>
          <Route path="/" element={<GoogleLogin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </WebSocketProvider>
    </Router>
  );
}
