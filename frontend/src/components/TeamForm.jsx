import { useState } from "react";
import api from "../services/api";

export default function TeamForm({ onSuccess }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("api/teams", { name });
      setName("");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || "Failed");
    }
  };

  return (
    <div>
      <h3>Add Team</h3>
      <input placeholder="Team Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
