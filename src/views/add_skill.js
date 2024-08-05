import {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Add_skill = () => {

    const [name,setName] = useState('');
    const [details,setDetails] = useState('');

    const [error, setError] = useState(null);

    const [isPending, setIsPending] = useState(false);

    const history=useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const this_skill={name:name,details:details};

        setIsPending(true);

        fetch('http://localhost:3002/api/addSkill',{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(this_skill)
        })
        .then(res => res.json())
        .then(createdObject => {
            setIsPending(false);
            history.push('/');
        })
        .catch( (err) => {
            setError(err.message);
            console.log(error);
        })
    }

    return (
        <div className='newSkill_wrapper'>
            <div className="newSkill">
                <h2>Add new Skill</h2>
                <form onSubmit={handleSubmit}>
                    <label>Skill name:</label>
                    <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Type skill name here...'></input>

                    <label>Skill details:</label>
                    <textarea type='text' cols="50" rows="10" required value={details} onChange={(e) => setDetails(e.target.value)} placeholder='Type skill details here...'></textarea>

                    {!isPending && <button>Add</button>}
                    {isPending && <button>Adding...</button>}
                </form>
            </div>
        </div>
    )
}

export default Add_skill;