import ListHeader from "./Components/ListHeader";
import { useState, useEffect } from 'react';
import ListItem from "./Components/ListItem";

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

  //sort by date
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate))

  return (
    <div className="app">
      <ListHeader listItem={"🏝️Holiday Tick List"}/>
      {sortedTasks?.map((task)=> <ListItem key={task.id} task={task}/>)}
    </div>
  );
}

export default App;
