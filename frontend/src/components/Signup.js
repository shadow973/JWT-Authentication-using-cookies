import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import axios from 'axios'

export default function Signup() {

  const [signUser, setSignUser] = useState({
    email: '',
    password: '',
    confPassword: ''
  })
  const navigate = useNavigate()

  const Signup = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:5000/signup', signUser)
      
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MDBContainer className='w-50 p-4' >
      <form onSubmit={Signup}>
        <MDBInput value={signUser.email} onChange={e => setSignUser({ ...signUser, email: e.target.value })} className='mb-4' type='email' id='form1Example1' label='Email address' />
        <MDBInput value={signUser.password} onChange={e => setSignUser({ ...signUser, password: e.target.value })} className='mb-4' type='password' id='form1Example2' label='Password' />
        <MDBInput value={signUser.confPassword} onChange={e => setSignUser({ ...signUser, confPassword: e.target.value })} className='mb-4' type='password' label='Confirm Password' />
        <MDBBtn type='submit' block>
          Sign in
        </MDBBtn>
        <Link to='/login'>
          <div className='text-center mt-4 text-primary text-decoration-underline'>You already acount?</div>
        </Link>
      </form>
    </MDBContainer>
  );
}