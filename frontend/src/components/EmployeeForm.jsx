import { useState } from "react";
import api from "../services/api";

export default function EmployeeForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("api/employees", { name, role, salary: parseFloat(salary) });
      setName(""); setRole(""); setSalary("");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || "Failed");
    }
  };

  return (
    <div>
      <h3>Add Employee</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
      <input placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
      <button onClick={handleSubmit} className="btn">Add</button>
    </div>
  );
}
