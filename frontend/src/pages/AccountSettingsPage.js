limport React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { Button, Form } from 'react-bootstrap';

const AccountSettingsPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails());
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(updateUserProfile({ firstName, lastName, email, password }));
  };

  return (
    <div>
      <h1>Account Settings</h1>
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AccountSettingsPage;
