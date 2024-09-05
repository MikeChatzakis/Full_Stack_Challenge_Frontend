
import{ ReactComponent as Logo} from '../logo.svg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const Home = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const [passwordRegister, setPasswordRegister] = useState('');



  const history = useHistory();
  const signIn = useSignIn();
  const signOut = useSignOut();


  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
        console.log('email:'+email+' password:'+password);
        const response = await fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        if(response.ok){
            const data = await response.json();
            console.log(`this is the token: ${data.token}`);
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
        const response = await fetch('http://localhost:3002/api/signup', {
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

    return(
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

export default Home;