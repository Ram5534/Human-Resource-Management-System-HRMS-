import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
       {token && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/employees" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />
        <Route path="/employees" element={token ? <Employees /> : <Navigate to="/login" />} />
        <Route path="/teams" element={token ? <Teams /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
