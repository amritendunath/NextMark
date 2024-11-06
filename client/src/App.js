import ListHeader from "./Components/ListHeader";
import { useState, useEffect } from 'react';
import ListItem from "./Components/ListItem";
import Auth from "./Components/Auth";
import { useCookies } from "react-cookie";

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(null);  

  const userEmail = cookies.Email
  const authToken = cookies.AuthToken

  const [tasks, setTask] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      console.log(json)
      setTask(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }
  }, [])

  console.log(tasks)

  //sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
        <>
          <ListHeader listName={"🏝️Holiday Tick List"} getData={getData} />
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>
      }
    </div>
  );
}

export default App;