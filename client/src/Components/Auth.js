import { useState } from 'react';
import {useCookies} from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  console.log(cookies)
  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }
  console.log(email, password, confirmPassword);
  const handleSubmit = async (e, endPoint) => {
    e.preventDefault()

    const data = {email,password}

    if (!isLogin && password !== confirmPassword) {
      setError('Password does not match')
      return
    }
    //fetch API for SignUp And Login
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endPoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    //setCookie used in response of SighUo
    const json = await response.json()
    if(response.status === 200) {
      console.log('Success')
      setCookie('Email', json.email)
      setCookie('AuthToken', json.token)
      window.location.reload()
    }
    else {
      setError('Something went wrong')
    }
  }

  return (
    <div clasName="auth-container">
      <div clasName="auth-container">
        <form>
          <h2>{isLogin ? 'Please LogIn' : 'Please SignUp'}</h2>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
          <input type="passsword" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
          {!isLogin && <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}></input>
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