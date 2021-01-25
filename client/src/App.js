import "./App.css";
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [things, setThings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThings();
  }, []);

  const getThings = async () => {
    try {
      let res = await axios.get(`/api/things`);
      setThings(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Error occured");
      setLoading(false);
    }
  };
  const renderThings = ()=>{
    return things.map((thing)=>{
      return(
        <div>
          <h3>{thing.name}</h3>
          <p>{thing.likes}</p>
        </div>
      )
    })
  }
  if (loading) return <p>loading</p>;
  if (error) return <p>error occurred</p>;
  return <div className="App">{renderThings()}</div>;
}

export default App;
