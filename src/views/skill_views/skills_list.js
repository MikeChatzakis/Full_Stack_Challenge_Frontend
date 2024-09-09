import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../../custom/useFetch';

const SkillsList = () => {

    const {data, isPending, error} = useFetch(`${process.env.REACT_APP_SERVER_URL}/api/Skills_list`);
    
    return(
        <div className="container">
            <h1 className="title">All Skills</h1>
            {isPending && <h2>Loading Skills...</h2>}
            {error && <h2>Error:{error}</h2>}
            <div className="grid">
                {data && data.map((skill) => (
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



export default SkillsList;