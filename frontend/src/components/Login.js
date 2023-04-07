import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default function Login() {

  const [signUser, setSignUser] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const Login = async (e) => {
    e.preventDefault();
    try {
    const res = await  axios.post('http://localhost:5000/login', signUser)
    cookies.set('TOKEN', res.data.token, {pasth: '/'} )
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MDBContainer className='w-50 p-4' >
      <form onSubmit={Login}>
        <MDBInput value={signUser.email} onChange={e => setSignUser({ ...signUser, email: e.target.value })} className='mb-4' type='email' id='form1Example1' label='Email address' />
        <MDBInput value={signUser.password} onChange={e => setSignUser({ ...signUser, password: e.target.value })} className='mb-4' type='password' id='form1Example2' label='Password' />
        <MDBRow className='mb-4'>
          <MDBCol className='d-flex justify-content-center'>
            <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
          </MDBCol>
          <MDBCol>
            <a href='#!'>Forgot password?</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type='submit' block>
          Sign in
        </MDBBtn>
        <div className='mx-4 mt-4 d-flex justify-content-evenly'>
          Not a member?
          <Link to='/signup'>
            <div className='text-primary'>Register</div>
          </Link>
        </div>
      </form>
    </MDBContainer>
  );
}