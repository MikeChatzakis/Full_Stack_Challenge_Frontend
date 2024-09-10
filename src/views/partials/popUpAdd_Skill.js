import React from 'react';
import SubmitPage from './submit_page';
import { useState } from 'react';


const PopUpAddSkill = ({ isPopupOpen, setIsPopupOpen, setSubmitedSkillData}) => {

    const [newSkill,setNewSkill] = useState({name:'', details:''});

    const AfterSubmit = (data) => {
        setSubmitedSkillData(data);
        setIsPopupOpen(false);
        setNewSkill({name:'',details:''});
    }

    if (!isPopupOpen) return null;
  
    return (
        <div className="popup-overlay" >
            <div className="popup-content">
                <div className='newSkill_wrapper'>
                    <SubmitPage title="Add Skill" url={`${process.env.REACT_APP_SERVER_URL}/api/skills`} data={newSkill} setData={setNewSkill} setResult={AfterSubmit} method='POST'/>
                </div>
                <button onClick={() => setIsPopupOpen(false)}>Close</button>
            </div>
        </div>
    );
    
  };
  
  export default PopUpAddSkill;