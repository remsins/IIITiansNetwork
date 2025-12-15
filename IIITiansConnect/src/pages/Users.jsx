import { useEffect, useState } from "react";
import api from "../api/axios";

function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {data.map(u => (
        <div key={u._id}>
          <p>{u.name} — {u.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
