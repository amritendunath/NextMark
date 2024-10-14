import ListHeader from "./Components/ListHeader";
import { useEffect } from 'react';

const App = () => {

  const getData =async()=>{
    const userEmail = "anath@chegg.com"
    try {
      const response = await fetch(`http://localhost:8000/qtodos/${userEmail}`);
      const json = await response.json();
      console.log(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="app">
      <ListHeader listItem={"🏝️Holiday Tick List"}/>
    </div>
  );
}

export default App;
