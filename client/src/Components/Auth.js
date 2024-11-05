import { useState } from 'react';

const Auth = () => {
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true);

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  return (
    <div clasName="auth-container">
      <div clasName="auth-container">
        <form>
          <h2>{isLogin ? 'Please LogIn' : 'Please SignUp'}</h2>
          <input type="email" placeholder="email"></input>
          <input type="passsword" placeholder="password"></input>
          {!isLogin && <input type="password" placeholder="confirm password"></input>}
          <input type="submit" className="create"></input>
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