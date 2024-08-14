
import { useEffect, useState } from "react";
import SubmitPage from "../partials/submit_page";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditSkill = ({initial_skill_data}) => {
    const { id } = useParams();
    const history=useHistory();

    const [editedSkillData,seteditedSkillData] = useState(null);

    useEffect(()=>{
        if(initial_skill_data){
            seteditedSkillData(initial_skill_data);
        }
    },[initial_skill_data])

    return (

        <SubmitPage title='Edit Skill' url={'http://localhost:3002/api/skill/'+id} data={editedSkillData} setData={seteditedSkillData} method='PATCH'/>

    )

}

export default EditSkill;