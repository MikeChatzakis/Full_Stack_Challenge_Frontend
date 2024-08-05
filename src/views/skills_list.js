import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../custom/useFetch';

const Skills_list = () => {

    const {data: SkillsData, isPending, Error} = useFetch('http://localhost:3002/api/Skills_list');
    
    return(
        
        <div className='list_wrapper'>
             <div className="myList">
                <h1>All Skills</h1>
                {isPending && <h1>Loading Skills...</h1>}
                {Error && <h1>Error:{Error}</h1>}
                <ul className="grid">
                    {SkillsData && SkillsData.map((skill) => (
                        <li key={skill._id}>
                            <Link to={`/skill/${skill._id}`}>
                                <h2>{skill.name}</h2>
                                <p>Click for Details!</p>
                                {/* <p>{skill.details}</p> */}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default Skills_list;