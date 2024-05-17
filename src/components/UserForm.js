import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../features/users/userSlice';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ userToEdit, setUserToEdit }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
      zipcode: ''
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'zipcode') {
      setUser({ ...user, address: { ...user.address, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser(user));
    }
    setUser({
      name: '',
      email: '',
      phone: '',
      address: {
        city: '',
        zipcode: ''
      }
    });
    setUserToEdit(null); // Reset the user to edit
  };

  return (
    <Form onSubmit={handleSubmit} className='w-50 shadow-sm p-5'>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" value={user.phone} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="city" value={user.address.city} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="zipcode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" name="zipcode" value={user.address.zipcode} onChange={handleChange} />
      </Form.Group>
      <Button className='mt-2' variant="primary" type="submit">
        {userToEdit ? 'Update' : 'Add'} User
      </Button>
    </Form>
  );
};

export default UserForm;
