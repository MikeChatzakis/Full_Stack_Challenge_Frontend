import {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SubmitPage from '../partials/submit_page';


const AddSkill = () => {

    const [newSkill,setNewSkill] = useState({name:'', details:''});

    const history=useHistory();

    const AfterSubmit = (createdSkill) =>{
        history.push('/skill/'+ createdSkill._id);
    }

    return (
        <div className='newSkill_wrapper'>
            <SubmitPage title="Add Skill" url={`${process.env.REACT_APP_SERVER_URL}/api/skills`} data={newSkill} setData={setNewSkill} setResult={AfterSubmit} method='POST'/>
        </div>
    )
}

export default AddSkill;