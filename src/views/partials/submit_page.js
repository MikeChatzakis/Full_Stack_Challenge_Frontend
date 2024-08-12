import {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import React from 'react';



const SubmitPage = ({title, url , data, setData}) => {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const history=useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        console.log("data here:");
        console.log(url);

        fetch(url,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(createdObject => {
            setIsPending(false);
            history.push('/');
        })
        .catch( (err) => {
            setIsPending(false);
            setError(err.message);
            console.log(error);
        })
    }

    return (
        <div className='newSkill_wrapper'>
            <div className="newSkill">
                <h2>Add new {title}</h2>
                <form onSubmit={handleSubmit}>
                    {data && Object.keys(data).map(key => (
                        <div key={key} className='newSkillData'>
                            <label>{title} {key}:</label>
                            {key !== 'details' ? (
                            <input type='text' required value={data[key]} onChange={(e) => setData(prevData => ({...prevData,[key]:e.target.value}))} placeholder={`Type ${key} here...`}></input>
                            ):(
                            <textarea type='text' cols="50" rows="10" required value={data[key]} onChange={(e) => setData(prevData => ({...prevData,[key]:e.target.value}))} placeholder={`Type ${key} here...`}></textarea>
                            )}

                        </div>
                    ))}
                    <button type="submit" disabled={isPending}> {isPending ? 'Submitting...' : 'Submit'} </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>

    )
}

export default SubmitPage;