import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return (  
//         <nav className="navbar">
//             <h1>Dashboard</h1>
//             <div className="links">
//                 <Link to="/"> Home </Link>
//                 <Link to="/employee_list"> List Employees </Link>
//                 <Link to="/skills_list"> List Skills </Link>
//                 <Link to="/add-skill"> Add Skill </Link>
//             </div>
//         </nav>
//     );
// }

const Navbar = () => {
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



            </ul>
        </nav>
    );
}
 
export default Navbar;