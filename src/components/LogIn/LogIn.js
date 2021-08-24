import React, {useState} from 'react';

import {ajaxWrapper} from '../../helpers/ajax-wrapper';

import ModalWindow from '../ModalWindow/ModalWindow';

import './LogIn.scss'

const initialFormState = {
  email: {value: '', valid: false},
  password: {value: '', valid: false},
}

const LogIn = ({open, setOpen, setActive, setIsLogin}) => {
  const [error, setError] = useState('')


  const sendingData = () => {
    const url = 'http://localhost:5000/api/auth/login'
    return ajaxWrapper({
      method: 'POST',
      url: url,
      data: {
        email: form.email.value,
        password: form.password.value,
      }
    }).then(response => {
      localStorage.setItem('token', JSON.stringify(response?.data.token));
      setOpen(false);
      setActive(false);
      setIsLogin(true)
    }).catch((err) => setError(err?.response.data.message))
  }

  const [form, setForm] = useState(initialFormState)

  const clickLogin = (e, trigger) => {

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPass = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g

    const checkEmail = (v) => regEmail.test(v)

    const checkPassword = (v) => regPass.test(v)

    const validation = (t, value) => {
      switch (t) {
        case 'password':
          return checkPassword(value)
        case 'email':
          return checkEmail(value)
      }
    }
    setForm((prevState) => (
      {...prevState, [trigger]: {value: e.target.value, valid: validation(trigger, e.target.value)}}
    ))
  }

  return (
    <div className={open ? "login-modal login-active" : "login-modal"} onClick={() => {
      setOpen(false)
    }}>
      <div className='login-modal-content' onClick={e => {
        e.stopPropagation()
      }}>
        <h3>Log in to your account</h3>
        <form action="">
          <div className='label'>Email</div>
          <input placeholder='Your email' type="email" value={form.email.value} onChange={(e) => {
            clickLogin(e, 'email')
          }}/>

          <div className='label'>Password</div>
          <input
            placeholder='Enter your password'
            type="password"
            value={form.password.value}
            onChange={(e) => {
              clickLogin(e, 'password')
            }}
          />
        </form>
        <button onClick={sendingData}>
          Log in
        </button>
        <div style={{marginTop: '20px'}}>
          <span style={{color: 'red'}}>{error}</span>
        </div>
        <div className="sing-form-login">No account?<br/>
          <span onClick={() => {
            setOpen(false)
          }}>Create one</span></div>
      </div>
    </div>
  )
}

export default LogIn;
