import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from '../custom/useFetch';
import {useState} from 'react';

const Skill = () => {

    const { id } = useParams();
    const history = useHistory();

    const [editMode, setEditMode] = useState(false);

    const [new_name,setNewName] = useState('');
    const [new_details,setNewDetails] = useState('');

    const {data: this_skill, isPending, Error} = useFetch('http://localhost:3002/api/skill/'+id);
    

    const handleDelete= () => {
        fetch('http://localhost:3002/api/skill/'+id, { 
        method: 'DELETE'
        })
        .then(() => {
            history.push('/');
        })

    };

    const handleSubmit= (e) => {
        e.preventDefault();
        
        const edited_skill={name:new_name,details:new_details};

        fetch('http://localhost:3002/api/skill/'+id, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(edited_skill),
        })
        .then(res => {
            console.log('Response Content-Type:', res.headers.get('Content-Type'));
            return res.text();
        })
        .then(createdObject => {
            //console.log(createdObject);
            //history.push('/');
            window.location.reload();
            //switchEdit();
        })
        .catch( (err) => {
            //setError(err.message);
            console.log(err);
        })

    };

    const switchEdit= () => {
        if(editMode){
            return setEditMode(false);
        }else{
            setNewName(this_skill.name);
            setNewDetails(this_skill.details);
            return setEditMode(true);
        }
    };


    return(
        <div>
            {/* watch mode */}
            {!editMode && <div className="skill_details_wrapper">
            {isPending && <div>Loading...</div>}
            {Error && <div>Error:{Error}</div>}
            {this_skill && (
                <div>
                    <h2>{this_skill.name}</h2>
                    <span>Added at: {new Date(this_skill.dateCreated).toLocaleDateString()}</span>
                    <span>Details:</span>
                    <div className="skill_details">{this_skill.details}</div>
                    <button onClick={handleDelete}> Delete </button>
                    <button onClick={switchEdit}> Edit mode </button>
                </div>
            )}
            
            </div>}
            {/* edit mode */}
            {editMode && 
            <div className='newSkill_wrapper'>
                <div className="newSkill">
                    <h2>Edit Skill</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Skill name:</label>
                        <input type='text' required value={new_name} onChange={(e) => setNewName(e.target.value)} placeholder='Type skill name here...'></input>

                        <label>Skill details:</label>
                        <textarea type='text' cols="50" rows="10" required value={new_details} onChange={(e) => setNewDetails(e.target.value)} placeholder='Type skill details here...'></textarea>

                        <button>Save Changes</button>
                        <button onClick={switchEdit}>Cancer edit</button>
                        
                    </form>
                </div>
            </div>}
            
        </div>
    )
}

export default Skill;