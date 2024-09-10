import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from '../../custom/useFetch';
import {useState,useEffect} from 'react';
import SubmitPage from '../partials/submit_page';

const Skill = () => {

    const { id } = useParams();
    const history = useHistory();

    const [editMode, setEditMode] = useState(false);

    const [this_skill,setThisSkill] = useState({
        name:'',
        details:''
    })

    const {data, isPending, Error} = useFetch(`${process.env.REACT_APP_SERVER_URL}/api/skills/`+id);

    useEffect(() => {
        if (data) {
            setThisSkill(data);
        }
      },[data]);

    const handleDelete= () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/skills/`+id, {
        method: 'DELETE',
        credentials:'include'
        })
        .then(() => {
            history.push('/skills_list');
        })

    };

    const switchEdit= () => {
        return setEditMode(!editMode)
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
                            <span>Added at: {new Date(this_skill.createdAt).toLocaleDateString('el-GR')}</span>
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
                <SubmitPage title='Edit Skill' url={`${process.env.REACT_APP_SERVER_URL}/api/skills/`+id} method='PATCH' data={this_skill} setData={setThisSkill} setResult={switchEdit}/>
        </div>}
            
        </div>
    )
}

export default Skill;