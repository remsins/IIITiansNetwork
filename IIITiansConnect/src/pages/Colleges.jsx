import { useEffect, useState } from "react";
import api from "../api/axios";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await api.get("/colleges");
        setColleges(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) return <p>Loading colleges...</p>;

  return (
    <div>
      <h1>IIITs</h1>
      <ul>
        {colleges.map((college) => (
          <li key={college._id}>
            <h3>{college.name}</h3>
            <p>{college.description}</p>
            <a href={college.website} target="_blank">Visit Website</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Colleges;
