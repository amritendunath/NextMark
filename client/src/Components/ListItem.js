import { useState } from "react";
import TickIcon from "./TickIcon";  
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";

const ListItem = ({task,getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
      })
      if(response.status === 200){
        console.log('Task deleted')
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar/>
        </div>

        <div className="button-container">
          <button className="edit" onClick={()=>setShowModal(true)}>Edit</button>
          <button className="delete" onClick={deleteData}>Delete</button>
        </div>
        {showModal && <Modal mode={"edit"} setShowModal={setShowModal} task={task} getData={getData}/>}
      </li>
    );
  }
  
  export default ListItem;