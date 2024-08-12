import {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../../custom/useFetch';
import Add_skill from '../skill_views/add_skill';
import PlainList from '../partials/plain_list';
import SubmitPage from '../partials/submit_page';

const Add_employee = () => {

    const {data: SkillsData, isPending: isPendingSkills, error: ErrorSkills} = useFetch('http://localhost:3002/api/Skills_list');



    const [newEmployee,setNewEmployee]=useState({name:'', surname:'', phone:'', email:''});

    const[EmployeeSkills,setEmployeeSkills]=useState([]);

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const history=useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        fetch('http://localhost:3002/api/addEmployee',{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newEmployee)
        })
        .then(res => res.json())
        .then(createdObject => {
            const {_id: newUserID } = createdObject;
            const EmployeeSkillsObject = {newUserID,EmployeeSkills};

            fetch('http://localhost:3002/api/addManyEmpSkills',{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(EmployeeSkillsObject)
            })
            .then( () => {
                // setIsPending(false);
                history.push('/');
            })
            .catch((err) =>{
                setError(err.message);
                console.log(error);
            })




            // setIsPending(false);
            // history.push('/');
        })
        .catch( (err) => {
            setError(err.message);
            console.log(error);
        })
    }

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

    const getGridItemClassName = (id) => {
        return EmployeeSkills.includes(id) ? 'grid-item selected' : 'grid-item';
    }

    return (
        <div className='newSkill_wrapper'>
            {/* <div className="newSkill">
                <h2>Add new Employee</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type='text' required value={newEmployee.name} onChange={(e) => setNewEmployee(prevNewEmployee=>({...prevNewEmployee,name:e.target.value}))} placeholder='Type name here...'></input>

                    <label>Surname:</label>
                    <input type='text' required value={newEmployee.surname} onChange={(e) => setNewEmployee(prevNewEmployee=>({...prevNewEmployee,surname:e.target.value}))} placeholder='Type surname here...'></input>

                    <label>Phone:</label>
                    <input type='text' required value={newEmployee.phone} onChange={(e) => setNewEmployee(prevNewEmployee=>({...prevNewEmployee,phone:e.target.value}))} placeholder='Type phone number here...'></input>

                    <label>Email:</label>
                    <input type='text' required value={newEmployee.email} onChange={(e) => setNewEmployee(prevNewEmployee=>({...prevNewEmployee,email:e.target.value}))} placeholder='Type email here...'></input>

                    {!isPending && <button>Add</button>}
                    {isPending && <button>Adding...</button>}
                </form>
            </div> */}

            <div>
                <SubmitPage title="Skill" url="http://localhost:3002/api/addSkill" data={newEmployee} setData={setNewEmployee} />
            </div>

            <div>
                <PlainList title="Select Skills" data={SkillsData} isPending={isPendingSkills} Error={ErrorSkills} getGridItemClassName={getGridItemClassName} handleClick={handleAddSkill}/>
            </div>


            {/* <div>
                <Add_skill></Add_skill>
            </div> */}
        </div>

    )
}


export default Add_employee;