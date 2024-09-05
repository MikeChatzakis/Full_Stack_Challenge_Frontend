import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {PlainList} from '../partials/plain_list';
import SubmitPage from '../partials/submit_page';

const AddEmployee = () => {

    //Stores input data before submit
    //const [newEmployee,setNewEmployee]=useState({name:'', surname:'', phone:'', email:''});

    const [newEmployee, setNewEmployee] = useState({
        firstName: '', lastName: '', dateOfBirth: null,
        phone: '', email: '',
        street: '', city: '', state: '', postalCode: '', country: ''
    });
    
    //stores selected Skills data locally before submit
    const[EmployeeSkills,setEmployeeSkills]=useState([]);

    //after employee is created stores the employee object returned data from the backend
    const [createdEmployee,setCreatedEmployee] =useState(null);

    const history=useHistory();

    //when the employee is created trigger another fetch request to make the employee-skill relations in the DB
    useEffect(()=>{
        if(createdEmployee){
            const secondFetchData = {newUserID:createdEmployee._id,EmployeeSkills};
            fetch('http://localhost:3002/api/addManyEmpSkills',{
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    credentials:'include',
                    body: JSON.stringify(secondFetchData)
                })
                .then(res => res.json())
                .then( () => {
                    //  setIsPending(false);
                    history.push('/employee/' + createdEmployee._id);
                })
                .catch((err) =>{
                    //setError(err.message);
                    console.log(err.message);
                })
        }
    },[createdEmployee])

    //-------local methods to handle skills array before submit-------

    //add to local array if not present inside  
    const addtoSkillList = (newSkill) => {
        setEmployeeSkills(prevSkills => [...prevSkills, newSkill]);
    };

    //remove from local array if present inside
    const removefromSkillList = (removedSkill) => {
        setEmployeeSkills(prevSkills => prevSkills.filter(skill => skill !== removedSkill));
    };

    //decide weather to add or remove from local array
    const handleAddSkill = (skill) => {
        if(EmployeeSkills.some(skills => skills._id === skill._id))
            removefromSkillList(skill);
        else{
            addtoSkillList(skill);
        }
    };
    //-----------------------------------------------

    const getGridItemClassName = (id) => {
        return EmployeeSkills.some(skills => skills._id === id) ? 'grid-item selected' : 'grid-item';
    }

    return (
        <div className='newSkill_wrapper'>           

                <SubmitPage title="Add Employee" url="http://localhost:3002/api/addEmployee" data={newEmployee} setData={setNewEmployee} setResult={setCreatedEmployee} method='POST'/>

                <PlainList title="Select Skills" url='http://localhost:3002/api/Skills_list' getGridItemClassName={getGridItemClassName} handleClick={handleAddSkill} showAddButton={true} handleDelete={null}/>

        </div>

    )
}


export default AddEmployee;