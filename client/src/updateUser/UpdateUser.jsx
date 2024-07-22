import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import './update.css';

const UpdateUser = () => {
    const initialUser = {
        name: '',
        email: '',
        address: ''
    }
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();
    const { id } = useParams();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
            toast.success(response.data.message, { position: "top-right" });
            navigate('/'); // Redirect to user list after successful update.
        } catch (error) {
            console.log("Error updating user: ", error.message);
        }
    }

    return (
        <div className='addUser'>
            <h3>Update User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' value={user.name} onChange={inputHandler} name='name' autoComplete='off' placeholder='Enter your name' required />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' value={user.email} onChange={inputHandler} name='email' autoComplete='off' placeholder='Enter your email' required />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='address'>Address:</label>
                    <input type='text' id='address' value={user.address} onChange={inputHandler} name='address' autoComplete='off' placeholder='Enter your address' required />
                </div>
                <div className='inputGroup'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser;
