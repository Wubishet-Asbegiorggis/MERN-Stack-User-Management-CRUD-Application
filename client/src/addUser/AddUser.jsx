import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

const AddUser = () => {
    const initialUser = {
        name: '',
        email: '',
        address: ''
    };
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            // Add console log to debug user data
            console.log("Submitting user data: ", user);

            const response = await axios.post("http://localhost:8000/api/user", user);
            
            // Add console log to debug response data
            console.log("Response data: ", response.data);

            toast.success(response.data.message, { position: "top-right" });
            navigate('/'); // Redirect to user list after successful addition.
        } catch (error) {
            // Improved error handling
            console.error("Error adding user: ", error.response ? error.response.data.message : error.message);
            toast.error("Failed to add user. Please try again.", { position: "top-right" });
        }
    };

    return (
        <div className='addUser'>
            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' onChange={inputHandler} name='name' autoComplete='off' placeholder='Enter your name' required />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' onChange={inputHandler} name='email' autoComplete='off' placeholder='Enter your email' required />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='address'>Address:</label>
                    <input type='text' id='address' onChange={inputHandler} name='address' autoComplete='off' placeholder='Enter your address' required />
                </div>
                <div className='inputGroup'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
