import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../../custom/useFetch';

const Skills_list = () => {

    const {data: SkillsData,isPending: isPending, error: Error} = useFetch('http://localhost:3002/api/Skills_list');
    
    return(

        <div className="container">
            <h1 className="title">All Skills</h1>
            {isPending && <h2>Loading Skills...</h2>}
            {Error && <h2>Error:{Error}</h2>}
            <div className="grid">
                {SkillsData && SkillsData.map((skill) => (
                    <div key={skill._id} className="grid-item">
                    <Link to={`/skill/${skill._id}`}>
                        <h2>{skill.name}</h2>
                        <p>Click for Details!</p>
                    </Link>
                    </div>
                ))}

            </div>
        </div>
    )
}



export default Skills_list;