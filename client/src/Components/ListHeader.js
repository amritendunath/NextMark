import { useState } from "react";
import Modal from "./Modal";
const ListHeader = ({listName}) => {

  const [showModal, setShowModal] = useState(null);
    const signout = () => {
        console.log("signout");
    }
    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create" onClick={()=>setShowModal(true)}>ADD NEW</button>
            <button className="signout" onClick={signout}>SIGN OUT</button>
        </div>
        {showModal && <Modal mode={"create"} setShowModal={setShowModal}/>}
      </div>
    );
  }
  
  export default ListHeader;
  