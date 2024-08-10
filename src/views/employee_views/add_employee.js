import {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Add_employee = () => {

    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const history=useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const this_employee={name,surname,phone,email};

        setIsPending(true);

        fetch('http://localhost:3002/api/addEmployee',{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(this_employee)
        })
        .then(res => res.json())
        .then(createdObject => {
            setIsPending(false);
            history.push('/');
        })
        .catch( (err) => {
            setError(err.message);
            console.log(error);
        })
    }
    return (
        <div className='newSkill_wrapper'>
            <div className="newSkill">
                <h2>Add new Skill</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Type name here...'></input>

                    <label>Surname:</label>
                    <input type='text' required value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Type surname here...'></input>

                    <label>Phone:</label>
                    <input type='text' required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Type phone number here...'></input>

                    <label>Email:</label>
                    <input type='text' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Type email here...'></input>

                    {!isPending && <button>Add</button>}
                    {isPending && <button>Adding...</button>}
                </form>
            </div>
        </div>
    )

}


export default Add_employee;