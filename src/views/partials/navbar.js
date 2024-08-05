import { Link } from 'react-router-dom';

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Dashboard</h1>
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/create"> List Employees </Link>
                <Link to="/skills_list"> List Skills </Link>
                <Link to="/add-skill"> Add Skill </Link>
            </div>
        </nav>
    );
}
 
export default Navbar;