import {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SubmitPage from '../partials/submit_page';


const Add_skill = () => {

    const [newSkill,setNewSkill] = useState({name:'', details:''});

    const [error, setError] = useState(null);

    const [isPending, setIsPending] = useState(false);

    const history=useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        fetch('http://localhost:3002/api/addSkill',{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newSkill)
        })
        .then(res => res.json())
        .then(createdObject => {
            setIsPending(false);
            //history.push('/');
        })
        .catch( (err) => {
            setError(err.message);
            console.log(error);
        })
    }

    return (
         <SubmitPage title="Skill" url="http://localhost:3002/api/addSkill" data={newSkill} setData={setNewSkill} />
    )
}

export default Add_skill;