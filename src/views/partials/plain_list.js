
const PlainList = ({title,data,isPending,ErrorHere,getGridItemClassName,handleClick}) => {
    

    
    return(
        <div className="container">
            <h2 className="title">{title}</h2>
            {isPending && <h2>Loading Skills...</h2>}
            {ErrorHere && <h2>Error:{ErrorHere}</h2>}
            <div className="grid smaller">
                {data && data.map((skill) => (
                    <div key={skill._id} className={getGridItemClassName(skill._id)} onClick={ () => handleClick(skill._id)}>
                        <h2>{skill.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlainList;