import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/userSlice';
import { Table, Button } from 'react-bootstrap';
import UserForm from './UserForm';

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  let content;

  if (userStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (userStatus === 'succeeded') {
    content = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City with Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{`${user.address.city}, ${user.address.zipcode}`}</td>
              <td>
                <Button className='me-2' variant="warning" onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else if (userStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      {content}
      <UserForm userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
    </div>
  );
};

export default UserTable;
