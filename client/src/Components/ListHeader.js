const ListHeader = ({listItem}) => {

    const signout = () => {
        console.log("signout");
    }
    return (
      <div className="list-header">
        <h1>{listItem}</h1>
        <div className="button-container">
            <button className="create">ADD NEW</button>
            <button className="signout" onClick={signout}>SIGN OUT</button>
        </div>
      </div>
    );
  }
  
  export default ListHeader;
  