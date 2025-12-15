import { useEffect, useState } from "react";
import api from "../api/axios";

function Clubs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/clubs")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Clubs</h2>
      {data.map(c => (
        <div key={c._id}>
          <h4>{c.name}</h4>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Clubs;
