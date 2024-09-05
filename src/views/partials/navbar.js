import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';







const Navbar = () => {

    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const history = useHistory();

    const handleLogOut = () => {
        signOut();
        window.location.reload();
        history.push('/');
    }

    return (  
        <nav className="navbar">
            <div className="navbar-title">Dashboard</div>
            <ul className="menu">
                <li className="menu-item"> 
                    <Link to="/">Home</Link>
                </li>
                <li className="menu-item dropdown">
                <span className='dropdown-toggle'>Skills</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/add-skill">Add Skill</Link></li>
                        <li><Link to="/skills_list">List Skills</Link></li>
                    </ul>
                </li>

                <li className="menu-item dropdown">
                <span className='dropdown-toggle'>Employees</span>
                    <ul className="dropdown-menu">
                        <li><Link to="/add-employee">Add Employee</Link></li>
                        <li><Link to="/employee_list">List Employees</Link></li>
                    </ul>
                </li>
                <li className="menu-item"> 
                    <Link to="/downloads">Downloads</Link>
                </li>
                {isAuthenticated && 
                <li className="menu-item green-item">
                    <span onClick={handleLogOut}>Logout</span>
                </li>}



            </ul>
        </nav>
    );
}
 
export default Navbar;