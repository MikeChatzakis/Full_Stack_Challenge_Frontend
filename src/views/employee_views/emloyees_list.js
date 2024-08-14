import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../../custom/useFetch';
import {useState, useEffect, useCallback, useMemo} from 'react';
import{ ReactComponent as SearchIcon} from '../../css/search.svg';

const EmployeesList = () => {

    // const [EmployeesData, setEmployeesData] = useState();

    const {data: EmployeesData, isPending, error: Error} = useFetch('http://localhost:3002/api/Employees_list');

    const [sortedEmployeesData, setSortedEmployeesData] = useState([]);

    const [isSortedSurAsc, setIsSortedSurAsc] = useState(false);
    const [isSortedSurDe, setIsSortedSurDe] = useState(false);
    const [isSortedHireAsc, setIsSortedHireAsc] = useState(false);
    const [isSortedHireDe, setIsSortedHireDe] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    //4 sorting methods, and also sets the corresponding flag so that the buttons cant be pressed twice
    const orderSurnameAscending= () => {
        setIsSortedSurAsc(true);
        setIsSortedSurDe(false);
        setIsSortedHireAsc(false);
        setIsSortedHireDe(false);
    }
    const orderSurnameDescending= () => {
        setIsSortedSurAsc(false);
        setIsSortedSurDe(true);
        setIsSortedHireAsc(false);
        setIsSortedHireDe(false);
    }

    const orderHireAscending= () => {
        setIsSortedSurAsc(false);
        setIsSortedSurDe(false);
        setIsSortedHireAsc(true);
        setIsSortedHireDe(false);
    }

    const orderHireDescending= () => {
        setIsSortedSurAsc(false);
        setIsSortedSurDe(false);
        setIsSortedHireAsc(false);
        setIsSortedHireDe(true);
    }

    //search results - filter original results from backend -- useMemo given by AI to remove warning
    const filteredData = useMemo(() => (
        EmployeesData ? EmployeesData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.surname.toLowerCase().includes(searchQuery.toLowerCase())
        ) : []
    ), [EmployeesData, searchQuery]);

    //sorted results - sort among filtered results from the search query -- useCallback given by AI to remove warning

    const sortData = useCallback((data) => {
        const sortedList = [...data];
        if (isSortedSurAsc) {
            sortedList.sort((a, b) => a.surname.localeCompare(b.surname));
        } else if (isSortedSurDe) {
            sortedList.sort((a, b) => b.surname.localeCompare(a.surname));
        } else if (isSortedHireAsc) {
            sortedList.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        } else if (isSortedHireDe) {
            sortedList.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
        return sortedList;
    }, [isSortedSurAsc, isSortedSurDe, isSortedHireAsc, isSortedHireDe]);

    //update rendered data on every render search or sort or anything
    useEffect(() => {
        setSortedEmployeesData(sortData(filteredData));
    }, [filteredData, sortData]);

    return (
        <div className="container">
            <h1 className="title">All Employess</h1>
            <ul className="menu">
                <li className="menu-item"> <span className='dropdown-toggle-2'>Order by:</span> </li>
                <li className="menu-item dropdown">
                    <span className='dropdown-toggle'>Surname</span>
                    <ul className="dropdown-menu">
                        <li> <button onClick= {orderSurnameAscending} disabled={isSortedSurAsc}>Ascending</button> </li>
                        <li> <button onClick= {orderSurnameDescending} disabled={isSortedSurDe}>Descending</button> </li>
                    </ul>
                </li>

                <li className="menu-item dropdown">
                    <span className='dropdown-toggle'>Hire Date</span>
                    <ul className="dropdown-menu">
                        <li> <button onClick= {orderHireAscending} disabled={isSortedHireAsc}>Ascending</button> </li>
                        <li> <button onClick= {orderHireDescending} disabled={isSortedHireDe}>Descending</button> </li>
                    </ul>
                </li>
                <li className="menu-item">
                    <div className="search-container">
                        <div className="search-icon">
                            <SearchIcon width={30} height={30}/>
                        </div>
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
                        </div>
                    </div>
                </li>
            </ul>
           
           
            {isPending && <h2>Loading Employess...</h2>}
            {Error && <h2>Error:{Error}</h2>}
            <div className="grid">
                {sortedEmployeesData && sortedEmployeesData.map((employee) => (
                    <div key={employee._id} className="grid-item">
                    <Link to={`/employee/${employee._id}`}>
                        <h2>{employee.name} {employee.surname}</h2>
                        <p>Click for Details!</p>
                    </Link>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default EmployeesList;