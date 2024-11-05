import { useState } from 'react';

const Auth = () => {
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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
    else {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endPoint}`, {
          mehtod: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.status === 200) {
          console.log('Success')
        }
        else {
          setError('Something went wrong')
        }

      } catch (error) {
        console.log(error)
      }
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