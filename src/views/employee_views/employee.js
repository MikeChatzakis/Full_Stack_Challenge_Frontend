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
    const {data:thisEmpSkillData, isPending:isPendingSkill, error:errorSkill} = useFetch('http://localhost:3002/api/SingleEmployeeAllSkills/'+id);

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

    const getfunnytext = () => {
        if(unobtainedSkills.length === 0)
            return 'You are very very skilled! No more skills to get!';
        else
            return null;
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
            fetch('http://localhost:3002/api/addManyEmpSkills',{ //selected skills are created in the backend, date added atached in the backend
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(secondFetchData)
                })
                .then(res => res.json())
                .then( () => {
                    //after skill relations are added to the backend we handle the view for the frontend since we want avoid another fetch request
                    //1.add the date that the backend would automatically atach so when the view switches to view mode we keep seeing the date.
                    const SelectedSkillsWithDateAdded = selectedSkills.map(skill => ({ ...skill, dateAdded: new Date() }));
                    //2.set Employee's skills to also include the skills selected in edit mode
                    setEmployeeSkills(employeeSkills => [...employeeSkills, ...SelectedSkillsWithDateAdded]);
                    //3.reset selected skills array since all the selected skills are now part of the employee Skills
                    setSelectedSkills([]);
                    //4.switch to view mode
                    switchEdit();
                })
                .catch((err) =>{
                    //setError(err.message);
                    console.log(err.message);
                })
    }
    //-----------------------------------------------

    const keysToFilterOut = ['_id', '__v', 'createdAt', 'updatedAt','firstName','lastName'];
    return (
        <div>
            {/* watch mode */}
            {!editMode && <div>
                {isPending && <h1 className="details-container">Loading...</h1>}
                {error && <h1 className="details-container">Error:{error}</h1>}
                {this_employee && (
                    <div>
                        <div className="details-container">
                            <div className="details-header">
                                <h1>{this_employee.firstName} {this_employee.lastName}</h1>
                                <span>Last Update: {new Date(this_employee.updatedAt).toLocaleDateString('el-GR')}</span>
                            </div>
                            <div className="details-content">
                                <h2>Personal Info:</h2>
                                {Object.keys(this_employee) // get employee keys
                                .filter((key => !keysToFilterOut.includes(key))) // filter unwanted keys 
                                .map((key) => ( //iterate over all keys
                                    <p key={key}><b>{key}: </b>
                                    {['dateOfBirth'].includes(key)? new Date(this_employee[key]).toLocaleDateString('el-GR') :this_employee[key]}
                                    </p>
                                ))}
                            </div>
                            <button onClick={handleDelete}> Delete </button>
                            <button onClick={switchEdit}> Edit mode </button>
                        </div>
                        
                        <div>
                            <PlainListData title="Aqcuired Skills" data={employeeSkills} setData={setEmployeeSkills} isPending={isPendingSkill} error={errorSkill} getGridItemClassName={()=>'grid-item'} handleClick={()=>{}} handleDelete={handleDeleteRelation}/>
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
                    <PlainListData title="Select Skills" data={unobtainedSkills} setData={setUnobtainedSkills} isPending={null} error={getfunnytext()} getGridItemClassName={getGridItemClassName} handleClick={handleAddSkill} handleDelete={null}/>
                </div>
            </div>
                
                
            </div>}
        </div>
    )

}


export default Employee;