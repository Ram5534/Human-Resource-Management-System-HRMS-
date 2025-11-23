import { useState, useEffect } from "react";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.get("api/employees").then(res => setEmployees(res.data));
  }, [refresh]);

  return (
    <div className="container" >
      <h2 className="page-title">Employees</h2>
      <EmployeeForm onSuccess={() => setRefresh(!refresh)} />
      <ul className="item-card">
        {employees.map(emp => <li key={emp.id} className="item-title">Name:{emp.name} - Role:{emp.role}</li>)}
      </ul>
    </div>
  );
}
