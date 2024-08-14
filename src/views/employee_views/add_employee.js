import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {PlainList} from '../partials/plain_list';
import SubmitPage from '../partials/submit_page';

const AddEmployee = () => {

    //Stores input data before submit
    const [newEmployee,setNewEmployee]=useState({name:'', surname:'', phone:'', email:''});
    
    //stores selected Skills data locally before submit
    const[EmployeeSkills,setEmployeeSkills]=useState([]);

    //after employee is created stores the employee object returned data from the backend
    const [createdEmployee,setCreatedEmployee] =useState(null);

    const history=useHistory();

    //when the employee is created trigger another fetch request to make the employee-skill relations in the DB
    useEffect(()=>{
        if(createdEmployee){
            const secondFetchData = {newUserID:createdEmployee._id,EmployeeSkills};
            console.log(secondFetchData);
            
            fetch('http://localhost:3002/api/addManyEmpSkills',{
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(secondFetchData)
                })
                .then(res => res.json())
                .then( () => {
                    //  setIsPending(false);
                    history.push('/');
                })
                .catch((err) =>{
                    //setError(err.message);
                    console.log(err.message);
                })
        }


    },[createdEmployee])

        //-------local array before submit methods-------

    const addtoSkillList = (newSkill) => {
        setEmployeeSkills(prevSkills => [...prevSkills, newSkill]);
    };

    const removefromSkillList = (removedSkill) => {
        setEmployeeSkills(prevSkills => prevSkills.filter(skill => skill !== removedSkill));
    };

    const handleAddSkill = (id) => {
        if(EmployeeSkills.includes(id))
            removefromSkillList(id);
        else{
            addtoSkillList(id);
        }
    };
    //-----------------------------------------------

    const getGridItemClassName = (id) => {
        return EmployeeSkills.includes(id) ? 'grid-item selected' : 'grid-item';
    }

    return (
        <div className='newSkill_wrapper'>
            
            <div>
                <SubmitPage title="Add Employee" url="http://localhost:3002/api/addEmployee" data={newEmployee} setData={setNewEmployee} setResult={setCreatedEmployee} method='POST'/>
            </div>

            <div>
                <PlainList title="Select Skills" url='http://localhost:3002/api/Skills_list' getGridItemClassName={getGridItemClassName} handleClick={handleAddSkill} showAddButton={true} handleDelete={null}/>
            </div>
        </div>

    )
}


export default AddEmployee;