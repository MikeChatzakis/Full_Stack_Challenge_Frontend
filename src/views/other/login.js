import React from 'react'
import { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    
    const [passwordRegister, setPasswordRegister] = useState('');
  
    const signIn = useSignIn();
    const history= useHistory();
  
    const handleLogIn = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              credentials: 'include'
          });
          if(response.ok){
              const data = await response.json();
              const signInSuccess = signIn({
                  auth:{
                      token:data.token,
                      expiresIn: 3600,
                      type:'Bearer'
                  },
                  userState: {id: data.admin}
              });
  
              if(signInSuccess){
                  console.log('Sign-in successful');
                  history.push('/');
                  window.location.reload();
              }
              else
                  console.log('Sign-in Failed. Try again.');
  
          } else {
              console.error('Login failed:', response.statusText);
          }
          } catch (error) {
              console.error('Error during login:', error);
          }
      };
  
      const handleRegister = async (e) => {
          e.preventDefault();
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admins/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password: passwordRegister}),
              credentials: 'include'
          });
  
          if (response.ok){
            setPasswordRegister('');
            setIsLogin(true);
          }
      }
  return (
    // <div className="auth-wrapper">
    <div className={`auth-container ${isLogin ? 'show-login' : 'show-signup'}`}>
    <div className="auth-form-wrapper">
        <div className="auth-form-container">
            <form className="auth-login-form" onSubmit={handleLogIn}>
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input className='auth-input' type="email" required value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter email here...'/>
                </div>
                <div>
                    <label>Password:</label>
                    <input className='auth-input' type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter email here...'/>
                </div>
                <button className='auth-button' type="submit">Login</button>
                <p className="auth-toggle-text" onClick={() => setIsLogin(false)}>No account? Signup!</p>
            </form>
            <form className="auth-signup-form" onSubmit={handleRegister}>
                <h2>Sign Up</h2>
                <div>
                    <label>Email:</label>
                    <input className='auth-input' type="email" required value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter email here...'/>
                </div>
                <div>
                    <label>Password:</label>
                    <input className='auth-input' type="password" required value={passwordRegister} onChange={(e) => {setPasswordRegister(e.target.value)}} placeholder='Enter email here...'/>
                </div>
                <button className='auth-button' type="submit">Sign Up</button>
                <p className="auth-toggle-text" onClick={() => setIsLogin(true)}>Back to login</p>
            </form>
        </div>
    <div className="auth-cover"/>
    </div>
</div>
  )
}

export default Login;