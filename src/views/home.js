import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Home_bear from '../css/bear_home_screen.webp';


const Home = () => {

    const isAuthenticated=useIsAuthenticated();

    return(
        <div className='home-container'>
            
            
            <div className='home-bear-container'>
                <img className='home-bear' src={Home_bear} alt="Here is a bear"></img>
            </div>

            <div className='home-text'>
                
                <h1>Welcome to my app!</h1> 
                {!isAuthenticated && 
                    <h2><br/>You are not logged in :( <br/> <Link to="/Login">Click here</Link> to login! </h2>
                }
            </div>
            
            
        </div>
    )
}

export default Home;