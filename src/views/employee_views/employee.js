import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from '../../custom/useFetch';
import {useState, useEffect} from 'react';
import PlainList from '../partials/plain_list';

const Employee = () => {

    const { id } = useParams();
    const history = useHistory();

    const [this_employee,setThisEmployee]=useState(null);

    const [employeeSkills,setEmployeeSkills] = useState(null);

    const [editMode, setEditMode] = useState(false);



    //get employee data
    const {data , isPending, error} = useFetch('http://localhost:3002/api/employee/'+id);

    //get skill data
    const {data: dataSkill, isPending:isPendingSkill, error:ErrorSkill} = useFetch('http://localhost:3002/api/SingleEmployeeAllSkills/'+id);

    useEffect(() => {
        if (data) {
            setThisEmployee(data);
        }
        
      },[data]);

    useEffect(() =>{
        if(dataSkill){
            setEmployeeSkills(dataSkill);           
        }
    },[dataSkill]);

    const handleDelete= () => {
        fetch('http://localhost:3002/api/employee/'+id, {
            method: 'DELETE'
            })
            .then(() => {
                history.push('/');
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3002/api/employee/'+id, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(this_employee),
        })
        .then(res => {
            console.log('Response Content-Type:', res.headers.get('Content-Type'));
            return res.text();
        })
        .then(createdObject => {
            setEditMode(false);
        })
        .catch( (err) => {
            //setError(err.message);
            console.log(err);
        })
    }

    
    const switchEdit= () => {
        if(editMode){
            return setEditMode(false);
        }else{
            return setEditMode(true);
        }
    };


    return (
        <div className="">
            {/* watch mode */}
            {!editMode && <div>
                {isPending && <h1 className="details-container">Loading...</h1>}
                {error && <h1 className="details-container">Error:{error}</h1>}
                {this_employee && (
                    <div>
                        <div className="details-container">                            
                            <div className="details-header">
                                <h1>{this_employee.name} {this_employee.surname}</h1>
                            </div>
                                                
                            <div className="details-content">
                                <h2>Personal Info:</h2>
                                <p><b>email:</b>{this_employee.email}</p>
                                <p><b>phone number:</b>{this_employee.phone}</p>
                            </div>
                            <button onClick={handleDelete}> Delete </button>
                            <button onClick={switchEdit}> Edit mode </button>
                        </div>
                        <div>
                            <PlainList title="Aqcuired Skills" url={'http://localhost:3002/api/SingleEmployeeAllSkills/'+id} getGridItemClassName={()=>{return 'grid-item'}} handleClick={()=>{}} showAddButton={false}/>

                        </div>
                    </div> 
                )}
            </div>}

            {/* edit mode */}
            {editMode && <div>

            <div className='newSkill_wrapper'>
            <div className="newSkill">
                <h2>Edit Employee Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type='text' required value={this_employee.name} onChange={(e) => setThisEmployee(prevEmployee  => ({...prevEmployee, name:e.target.value}))} placeholder='Type name here...'></input>

                    <label>Surname:</label>
                    <input type='text' required value={this_employee.surname} onChange={(e) => setThisEmployee(prevEmployee  => ({...prevEmployee, surname:e.target.value}))} placeholder='Type surname here...'></input>

                    <label>Phone:</label>
                    <input type='text' required value={this_employee.phone} onChange={(e) => setThisEmployee(prevEmployee  => ({...prevEmployee, phone:e.target.value}))} placeholder='Type phone number here...'></input>

                    <label>Email:</label>
                    <input type='text' required value={this_employee.email} onChange={(e) => setThisEmployee(prevEmployee  => ({...prevEmployee, email:e.target.value}))} placeholder='Type email here...'></input>

                    {!isPending && <button>Save Changes</button>}
                    {isPending && <button>Saving...</button>}
                </form>
            </div>
        </div>
                
                
            </div>}
        </div>
    )

}


export default Employee;