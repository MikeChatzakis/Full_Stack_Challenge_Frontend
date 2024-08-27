import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from '../../custom/useFetch';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { PlainListData } from '../partials/plain_list';
import SubmitPage from '../partials/submit_page';

const Employee = () => {
    const { id } = useParams();
    const history = useHistory();

    const [this_employee, setThisEmployee] = useState(null);
    const [employeeSkills, setEmployeeSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const { data, isPending, error } = useFetch('http://localhost:3002/api/employee/' + id);
    const { data: thisEmpSkillData, isPending: isPendingSkill, error: errorSkill } = useFetch('http://localhost:3002/api/SingleEmployeeAllSkills/' + id);
    const { data: allSkillData } = useFetch('http://localhost:3002/api/Skills_list');

    useEffect(() => {
        if (data) setThisEmployee(data);
    }, [data]);

    useEffect(() => {
        if (thisEmpSkillData) setEmployeeSkills(thisEmpSkillData);
    }, [thisEmpSkillData]);

    const unobtainedSkills = useMemo(() => {
        if (employeeSkills && allSkillData) {
            return allSkillData.filter(skill => !employeeSkills.some(obtainedSkill => obtainedSkill._id === skill._id));
        }
        return [];
    }, [employeeSkills, allSkillData]);

    const handleDelete = useCallback(() => {
        fetch('http://localhost:3002/api/employee/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        });
    }, [id, history]);

    const handleDeleteRelation = useCallback((skill_id) => {
        const delete_url = 'http://localhost:3002/api/EmployeeSkillDelete?emp_key=' + id + '&skill_key=' + skill_id;
        fetch(delete_url, {
            method: 'DELETE'
        }).then(() => {
            // Optionally, you can refresh the employee skills here if needed
        });
    }, [id]);

    const switchEdit = useCallback(() => {
        setEditMode(prevEditMode => !prevEditMode);
    }, []);

    const getGridItemClassName = useCallback((id) => {
        return selectedSkills.some(skill => skill._id === id) ? 'grid-item selected' : 'grid-item';
    }, [selectedSkills]);

    const getfunnytext = useMemo(() => {
        return unobtainedSkills.length === 0 ? 'You are very very skilled! No more skills to get!' : null;
    }, [unobtainedSkills]);

    //----------handle adding to pre-add array----------
    const addtoSelectedSkills = useCallback((newSkill) => {
        setSelectedSkills(prevSkills => [...prevSkills, newSkill]);
    }, []);

    const removeFromSelectedSkills = useCallback((removedSkill) => {
        setSelectedSkills(prevSkills => prevSkills.filter(skill => skill !== removedSkill));
    }, []);

    const handleAddSkill = useCallback((skill) => {
        if (selectedSkills.some(selectedSkill => selectedSkill._id === skill._id)) {
            removeFromSelectedSkills(skill);
        } else {
            addtoSelectedSkills(skill);
        }
    }, [selectedSkills, removeFromSelectedSkills, addtoSelectedSkills]);

    //-----------------------------------------------
    //----------------save employee skills-----------
    const saveEmpSkills = useCallback((emp) => {
        const secondFetchData = { newUserID: emp._id, EmployeeSkills: selectedSkills };
        fetch('http://localhost:3002/api/addManyEmpSkills', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(secondFetchData)
        }).then(res => res.json())
            .then(() => {
                const SelectedSkillsWithDateAdded = selectedSkills.map(skill => ({ ...skill, dateAdded: new Date() }));
                setEmployeeSkills(prevSkills => [...prevSkills, ...SelectedSkillsWithDateAdded]);
                setSelectedSkills([]);
                switchEdit();
            }).catch(err => {
                console.log(err.message);
            });
    }, [selectedSkills, switchEdit]);

    const keysToFilterOut = ['_id', '__v', 'createdAt', 'updatedAt', 'firstName', 'lastName'];

    return (
        <div>
            {/* VIEW MODE */}
            {!editMode && (
                <div>
                    {isPending && <h1 className="details-container">Loading...</h1>}
                    {error && <h1 className="details-container">Error: {error}</h1>}
                    {this_employee && (
                        <div>
                            <div className="details-container">
                                <div className="details-header">
                                    <h1>{this_employee.firstName} {this_employee.lastName}</h1>
                                    <span>Last Update: {new Date(this_employee.updatedAt).toLocaleDateString('el-GR')}</span>
                                </div>
                                <div className="details-content">
                                    <h2>Personal Info:</h2>
                                    {Object.keys(this_employee)
                                        .filter(key => !keysToFilterOut.includes(key))
                                        .map(key => (
                                            <p key={key}>
                                                <b>{key}: </b>
                                                {['dateOfBirth'].includes(key) ? new Date(this_employee[key]).toLocaleDateString('el-GR') : this_employee[key]}
                                            </p>
                                        ))}
                                </div>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={switchEdit}>Edit mode</button>
                            </div>

                            <div>
                                <PlainListData
                                    title="Acquired Skills"
                                    data={employeeSkills}
                                    setData={setEmployeeSkills}
                                    isPending={isPendingSkill}
                                    error={errorSkill}
                                    getGridItemClassName={() => 'grid-item'}
                                    handleClick={() => {}}
                                    handleDelete={handleDeleteRelation}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* EDIT MODE */}
            {editMode && (
                <div>
                    <div className='newSkill_wrapper'>
                        <div>
                            <SubmitPage
                                title='Edit Employee'
                                url={'http://localhost:3002/api/employee/' + id}
                                data={this_employee}
                                setData={setThisEmployee}
                                setResult={saveEmpSkills}
                                method='PATCH'
                            />
                        </div>

                        <div>
                            <PlainListData
                                title="Select Skills"
                                data={unobtainedSkills}
                                setData={()=>{}}
                                isPending={null}
                                error={getfunnytext}
                                getGridItemClassName={getGridItemClassName}
                                handleClick={handleAddSkill}
                                handleDelete={null}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Employee;