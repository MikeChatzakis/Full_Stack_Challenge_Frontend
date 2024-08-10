import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from '../../custom/useFetch';
import {useState,useEffect} from 'react';

const Skill = () => {

    const { id } = useParams();
    const history = useHistory();

    const [editMode, setEditMode] = useState(false);

    const [this_skill,setThisSkill] = useState({
        name:'',
        details:''
    })

    const {data, isPending, Error} = useFetch('http://localhost:3002/api/skill/'+id);

    useEffect(() => {
        if (data) {
            setThisSkill(data);
        }
      },[data]);

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

        fetch('http://localhost:3002/api/skill/'+id, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(this_skill),
        })
        .then(res => {
            console.log('Response Content-Type:', res.headers.get('Content-Type'));
            return res.text();
        })
        .then(createdObject => {
            switchEdit(true);
            console.log(createdObject);
            //window.location.reload();
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
            return setEditMode(true);
        }
    };


    return(
        <div>
            {/* watch mode */}
            {!editMode && <div>
                {isPending && <div>Loading...</div>}
                {Error && <div>Error:{Error}</div>}
                {this_skill && (
                    <div className="details-container">
                        <div className="details-header">
                            <h1>{this_skill.name}</h1>
                            <span>Added at: {new Date(this_skill.dateCreated).toLocaleDateString()}</span>
                        </div>
                                                
                        <div className="details-content">
                            <p>{this_skill.details}</p>
                        </div>
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
                        <input type='text' required value={this_skill.name} onChange={(e) => setThisSkill(prevSkill  => ({...prevSkill, name:e.target.value}))} placeholder='Type skill name here...'></input>

                        <label>Skill details:</label>
                        <textarea type='text' cols="50" rows="10" required value={this_skill.details} onChange={(e) => setThisSkill(prevSkill  => ({...prevSkill, details:e.target.value}))} placeholder='Type skill details here...'></textarea>

                        <button>Save Changes</button>
                        <button onClick={switchEdit}>Cancel edit</button>
                        
                    </form>
                </div>
        </div>}
            
        </div>
    )
}

export default Skill;