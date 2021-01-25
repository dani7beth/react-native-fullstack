// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';

// const Hello = () => {
//   return (
//     <div>
//       <div className="Hello">
//         <img width="200px" alt="icon" src={icon} />
//       </div>
//       <h1>electron-react-boilerplate</h1>
//       <div className="Hello">
//         <a
//           href="https://electron-react-boilerplate.js.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               📚
//             </span>
//             Read our docs
//           </button>
//         </a>
//         <a
//           href="https://github.com/sponsors/electron-react-boilerplate"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               🙏
//             </span>
//             Donate
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" component={Hello} />
//       </Switch>
//     </Router>
//   );
// }
import React, { useEffect, useState } from "react";
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
      let res = await axios.get(`http:/localhost:3001/api/things`);
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
