import ListHeader from "./Components/ListHeader";
import { useState, useEffect } from 'react';

const App = () => {
  const userEmail = "anath@gmail.com"
  const [tasks, setTask] = useState(null);

  const getData =async()=>{
    try {
      const response = await fetch(`http://localhost:8000/qtodos/${userEmail}`);
      const json = await response.json();
      console.log(json)
      setTask(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  console.log(tasks)

  return (
    <div className="app">
      <ListHeader listItem={"🏝️Holiday Tick List"}/>
    </div>
  );
}

export default App;
