import {useState} from 'react'

const Modal = () =>{
  const mode = 'create'
  const editMode = mode === 'edit' ? true : false;
  const [data, setData]=useState({
    user_email : "",
    title: "",
    progress: "",
    date: editMode ? "" : new Date()  
  })



  const handleChange = (e) => {
    // const {name, value} = e.target;
    setData(data => ({
      //destructure data and update the value of the key which is name
      ...data, // Using Spread Operator so that all exisiting properties if Data are retained
      [e.target.name]: e.target.value
      // [name]:value
    }))
    console.log(data)
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name ="title"
            value={data.title}
            onChange={handleChange}
          />
          <br/>
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default Modal;
