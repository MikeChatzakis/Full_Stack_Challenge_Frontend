import PopUpAddSkill from '../partials/popUpAdd_Skill';
import useFetch from '../../custom/useFetch';
import { useState,useEffect } from 'react';

const PlainList = ({title, url, getGridItemClassName,handleClick, showAddButton}) => {

    const {data: initialData, isPending, error} = useFetch(url);
    const [data, setData] = useState(initialData);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const [submitedSkillData,setSubmitedSkillData] = useState(null);

    //set view data to initial data. We need this in order 
    //to have the ability to dynamically update the view data when a skill is added
    useEffect(()=>{
        if(initialData)
            setData(initialData);
    },[initialData])

    //Update Data to see the new skill and also select it.
    //We could also perform a new fetch request to get the full data again,
    //but I think this approach is cleaner and better since we skip the fetch request

    useEffect(()=>{
        if(submitedSkillData){
            setData(prevData => [...prevData, submitedSkillData]); 
            handleClick(submitedSkillData._id);
            setSubmitedSkillData(null);
        }
    },[submitedSkillData])


    return(
        <div className="container">
            <h2 className="title">{title}</h2>
            {isPending && <h2>Loading Skills...</h2>}
            {error && <h2>Error:{error}</h2>}
            <div className="grid smaller">
                {data && data.map((skill) => (
                    <div key={skill._id} className={getGridItemClassName(skill._id)} onClick={ () => handleClick(skill._id)}>
                        <h2>{skill.name}</h2>
                    </div>
                ))}

                {showAddButton && <div className='grid-item-no-effects' onClick={() => setIsPopupOpen(true)}> <h1>+</h1> </div>}
                <PopUpAddSkill isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setSubmitedSkillData={setSubmitedSkillData}/>
                
            </div>
        </div>
    )
}

export default PlainList;