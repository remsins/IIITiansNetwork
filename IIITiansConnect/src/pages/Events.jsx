import { useEffect, useState } from "react";
import api from "../api/axios";

function Events() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Events</h2>
      {data.map(e => (
        <div key={e._id}>
          <h4>{e.title}</h4>
          <p>{e.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Events;
