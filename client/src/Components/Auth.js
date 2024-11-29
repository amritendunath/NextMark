import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from "../utils/helper";

const Auth = ({getData}) => {
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  
  const navigate = useNavigate();

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }
  console.log(email, password, confirmPassword);
  
  const handleSubmit = async (e, endPoint) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    try {
      const response = await axiosInstance.post(`${endPoint}`, {
        email, 
        password
      })
      console.log('response', response)
      if (response.data && response.data.accessToken) {
        console.log('response.data found',response.data)
        console.log('response.data.token found',response.data.accessToken)
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
        getData()
      }
    } 
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }
  return (
    <div clasName="auth-container">
      <div clasName="auth-container">
        <form>
          <h2>{isLogin ? 'Please LogIn' : 'Please SignUp'}</h2>
          <input 
          type="email" 
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)}></input>
          <input type="passsword" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
          {!isLogin && <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'create-account')}></input>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(true)}
            style={{ backgroundColor: isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
          >
            Login
          </button>

          <button onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;