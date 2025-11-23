import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null; // hide navbar if not logged in

  return (
    <nav className="nav">
      <h2 className="nav-logo">HRMS</h2>
      <div className="nav-left">
        

        <Link className="nav-link" to="/employees">
          Employees
        </Link>

        <Link className="nav-link" to="/teams">
          Teams
        </Link>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
