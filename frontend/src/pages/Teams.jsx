import { useState, useEffect } from "react";
import api from "../services/api";
import TeamForm from "../components/TeamForm";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.get("api/teams").then(res => setTeams(res.data));
  }, [refresh]);

  return (
    <div className="container">
      <h2 className="page-title">Teams</h2>
      <TeamForm onSuccess={() => setRefresh(!refresh)} />
      <ul className="item-card">
        {teams.map(team => (
          <li className="item-title" key={team.id}>{team.name} - Members: {team.Employees?.length || 0}</li>
        ))}
      </ul>
    </div>
  );
}
