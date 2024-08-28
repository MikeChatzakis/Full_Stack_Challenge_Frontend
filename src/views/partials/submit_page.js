import {useState} from 'react';
import React from 'react';



const SubmitPage = ({title, url , data, setData, setResult, method}) => {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        fetch(url,{
            method: method,
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(createdObject => {
            setIsPending(false);
            setResult(createdObject);
        })
        .catch( (err) => {
            setIsPending(false);
            setError(err.message);
            console.log(error);
        })
    }

    const keysToFilterOut = ['_id', '__v', 'createdAt', 'updatedAt'];

    return (
            <div className="newSkill">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    {data && Object.keys(data)
                    .filter(key => !keysToFilterOut.includes(key))  //first we filter out keys we dont want to be displayed
                    .map(key => (                                   //iterate over all keys 
                        <div key={key} className='newSkillData'>
                            <label>{key}:</label>
                            {
                               key === 'details' ? (
                                <textarea type='text' cols="50" rows="10" required value={data[key]} onChange={(e) => setData(prevData => ({...prevData,[key]:e.target.value}))} placeholder={`Type ${key} here...`}></textarea>
                               ) : key === 'dateOfBirth' ? (           
                                <input type='date' required value={data[key] ? new Date(data[key]).toISOString().split('T')[0]:''} onChange={(e) => setData(prevData => ({...prevData,[key]:e.target.value || ''}))}></input>
                            ) : (
                                <input type='text' required value={data[key]} onChange={(e) => setData(prevData => ({...prevData,[key]:e.target.value}))} placeholder={`Type ${key} here...`}></input>
                               )
                            }
                        </div>
                    ))}
                    <button type="submit" disabled={isPending}> {isPending ? 'Submitting...' : 'Submit'} </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
    )
}

export default SubmitPage;