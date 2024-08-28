import PopUpAddSkill from '../partials/popUpAdd_Skill';
import useFetch from '../../custom/useFetch';
import { useState,useEffect } from 'react';

const PlainList = ({title, url, getGridItemClassName, handleClick, showAddButton, handleDelete}) => {

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

    const handleDeleteClick = (e,skill) => {
        e.stopPropagation();
        handleDelete(skill._id);
        setData(prevData => prevData.filter(item => item !== skill));
    }
    
    useEffect(()=>{
        if(submitedSkillData){
            setData(prevData => [...prevData, submitedSkillData]); 
            handleClick(submitedSkillData);
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
                    <div key={skill._id} className={getGridItemClassName(skill._id)} onClick={ () => handleClick(skill)}>
                        <h2>{skill.name}</h2>
                        {/* delete option when hover*/}
                        {handleDelete && <div className='delete-overlay' onClick={(e) => handleDeleteClick(e,skill)}>
                            <button>X</button>
                        </div>}
                    </div>
                ))}

                {/* popup to add a skill */}
                {showAddButton && <div className='grid-item-no-effects' onClick={() => setIsPopupOpen(true)}> <h1>+</h1> </div>}
                <PopUpAddSkill isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setSubmitedSkillData={setSubmitedSkillData}/>
                
            </div>
        </div>
    )
}

const PlainListData = ({title, data, setData, error, isPending, getGridItemClassName, handleClick,handleDelete}) => {
  
    const handleDeleteClick = (e,skill) => {
        e.stopPropagation();
        handleDelete(skill._id);
        const newdata = data.filter(item => item !== skill);
        setData(newdata);
        // setData(prevData => prevData.filter(item => item !== skill));
    }

    return(
        <div className="container">
            <h2 className="title">{title}</h2>
            {isPending && <h2>Loading Skills...</h2>}
            {error && <h2>{error}</h2>}
            <div className="grid smaller">
                {data && data.map((skill) => (
                    <div key={skill._id} className={getGridItemClassName(skill._id)} onClick={ () => handleClick(skill)}>
                        <h2>{skill.name}</h2>
                        {skill.dateAdded && <span>Aquired on {new Date(skill.dateAdded).toLocaleDateString('el-GR')}</span>}
                        {/* delete option when hover*/}
                        {handleDelete && <div className='delete-overlay' onClick={(e) => handleDeleteClick(e,skill)}>
                            <button>X</button>
                        </div>}
                    </div>
                ))}
                {/* Popup add button would go here if we want it */}
            </div>
        </div>
    )
}

export {PlainList,PlainListData};