import { faPenToSquare, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.log('Error fetching data', error.message);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      toast.error('Error deleting user', { position: 'top-right' });
    }
  }

  return (
    <div className='userTable'>
      <header className="header">
        <h1>MERN Stack User Management App</h1>
        <h5 className="author" style={{ fontSize: '10px', color: 'blue' }}>@ Wubishet Asbe</h5>

      </header>

      <Link to='/add' type="button" className="btn btn-primary addUserBtn">
        <FontAwesomeIcon icon={faUserPlus} /> Add User
      </Link>

      {
        users.length === 0 ? (
          <div className='noData'>
            <h3>No data to display.</h3>
            <p>Please, <b>Add new users</b>.</p>
          </div>
        ) : (
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Address</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className='actionButtons'>
                    <Link to={`/update/${user._id}`} type='button' className='btn btn-primary'>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button onClick={() => deleteUser(user._id)} type='button' className='btn btn-danger'>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
};

export default User;
