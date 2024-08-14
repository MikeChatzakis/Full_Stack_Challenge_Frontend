import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from '../../custom/useFetch';
import {useState, useEffect} from 'react';
import {PlainListData} from '../partials/plain_list';
import SubmitPage from '../partials/submit_page';


const Employee = () => {

    const { id } = useParams();
    const history = useHistory();

    const [this_employee,setThisEmployee]=useState(null);

    const [employeeSkills,setEmployeeSkills] = useState([]);
    const [unobtainedSkills,setUnobtainedSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [editMode, setEditMode] = useState(false);

    //get employee data
    const {data , isPending, error} = useFetch('http://localhost:3002/api/employee/'+id);

    //get Employee Skills Data
    const {data:thisEmpSkillData} = useFetch('http://localhost:3002/api/SingleEmployeeAllSkills/'+id);

    //get all possible skills
    const {data:allSkillData} = useFetch('http://localhost:3002/api/Skills_list');

    useEffect(() => {
        if (data)
            setThisEmployee(data);
      },[data]);

    useEffect(() =>{
        if(thisEmpSkillData){
            setEmployeeSkills(thisEmpSkillData);           
        }
    },[thisEmpSkillData]);

    //sets unobtained skills = all skills - employeeSkills.
    useEffect(()=>{
        if(employeeSkills && allSkillData){
            setUnobtainedSkills(allSkillData.filter(skill => !employeeSkills.some(obtainedSkill => obtainedSkill._id === skill._id)))
        }
    },[employeeSkills,allSkillData])

    //triggers when you delete an employee. Backend aslo deletes all relations with skills 
    const handleDelete= () => {
        fetch('http://localhost:3002/api/employee/'+id, {
            method: 'DELETE'
            })
            .then(() => {
                history.push('/');
            })
    };

    //removes a skill from an Employee
    const handleDeleteRelation = (skill_id) =>{
        const delete_url='http://localhost:3002/api/EmployeeSkillDelete?emp_key='+id+'&skill_key='+skill_id;
        fetch(delete_url, { 
            method: 'DELETE'
            })
            .then(() => {
                
            })
            console.log("Deleting something!");
    }
    
    const switchEdit= () => {
        if(editMode){
            return setEditMode(false);
        }else{
            return setEditMode(true);
        }
    };
    //For edit:

    //different css for
    const getGridItemClassName = (id) => {
        if (selectedSkills)
            return selectedSkills.some(skills => skills._id === id) ? 'grid-item selected' : 'grid-item';
        else
            return 'grid-item';
    }


    //-------local array before submit methods-------

    const addtoSelectedSkills = (newSkill) => {
        setSelectedSkills(prevSkills => [...prevSkills, newSkill]);
    };

    const removeFromSelectedSkills = (removedSkill) => {
        setSelectedSkills(prevSkills => prevSkills.filter(skill => skill !== removedSkill));
    };

    const handleAddSkill = (skill) => {
        if(selectedSkills.some(skills => skills._id === skill._id))
            removeFromSelectedSkills(skill);
        else{
            addtoSelectedSkills(skill);
        }
    };
    //-----------------------------------------------
    //----------------save employee skills-----------
    const saveEmpSkills =(emp) => {

        const secondFetchData = {newUserID:emp._id,EmployeeSkills:selectedSkills};
            fetch('http://localhost:3002/api/addManyEmpSkills',{
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(secondFetchData)
                })
                .then(res => res.json())
                .then( () => {
                    console.log("BEFORE:");
                    console.log(employeeSkills);
                    console.log(selectedSkills);
                    setEmployeeSkills(employeeSkills => [...employeeSkills, ...selectedSkills]);
                    console.log("AFTER:");
                    console.log(employeeSkills);
                    setSelectedSkills([]);
                    switchEdit();
                    //history.push('/');
                })
                .catch((err) =>{
                    //setError(err.message);
                    console.log(err.message);
                })
    }
    //-----------------------------------------------


    return (
        <div>
            <button
            onClick={()=>{
                console.log("Selected Skills:");
                console.log(selectedSkills);
                console.log("All skills:");
                console.log(allSkillData);
                console.log("Obtained Skills:");
                console.log(employeeSkills);
                console.log("Unobtained Skills:");
                console.log(unobtainedSkills);
            }}>
                Show things
            </button>
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

                            <PlainListData title="Aqcuired Skills"
                            data={employeeSkills}
                            setData={setEmployeeSkills}
                            getGridItemClassName={()=>'grid-item'}
                            handleClick={()=>{}}
                            showAddButton={false}
                            handleDelete={handleDeleteRelation}/>
                        </div>
                    </div> 
                )}
            </div>}

            {/* edit mode */}
            {editMode && <div>

            <div className='newSkill_wrapper'>
                <div>
                    <SubmitPage title='Edit Employee' url={'http://localhost:3002/api/employee/'+id} data={this_employee} setData={setThisEmployee} setResult={saveEmpSkills} method='PATCH'/>
                </div>

                <div>
                    <PlainListData title="Select Skills"
                    data={unobtainedSkills}
                    setData={setUnobtainedSkills}
                    getGridItemClassName={getGridItemClassName}
                    handleClick={handleAddSkill}
                    showAddButton={false}
                    handleDelete={null}/>
                </div>
            </div>
                
                
            </div>}
        </div>
    )

}


export default Employee;