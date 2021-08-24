import React, {useState} from 'react';

import {ajaxWrapper} from '../../helpers/ajax-wrapper';

import LogIn from '../LogIn/LogIn';

import './ModalWindow.scss'

const initialFormState = {
  text: {value: '', valid: false},
  email: {value: '', valid: false},
  password: {value: '', valid: false},
}

const ModalWindow = ({active, setActive, isLogin, setIsLogin}) => {

  const sendingData = () => {
    const url = 'http://localhost:5000/api/auth/register'
    return ajaxWrapper({
      method: 'POST',
      url: url,
      data: {
        email: form.email.value,
        password: form.password.value,
      }
    }).then(response => {
      console.log('====>response<====', response)
    })
  }

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialFormState)

  const handleChange = (e, trigger) => {

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPass = /[a-zA-Z0-9]{8}/;

    const checkTxt = (v) => v.length > 2
    const checkEmail = (v) => regEmail.test(v)

    const checkPassword = (v) => regPass.test(v)

    const validation = (t, value) => {
      switch (t) {
        case 'password':
          return checkTxt(value)
        case 'email' :
          return checkEmail(value)
        case 'text' :
          return checkTxt(value)
      }
    }
    setForm((prevState) => (
      {...prevState, [trigger]: {value: e.target.value, valid: validation(trigger, e.target.value)}}
    ))
  }

  console.log('====>form<====', form)

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => {
      setActive(false)
    }}>
      <div className='modal-content' onClick={e => {
        e.stopPropagation()
      }}>
        <h3>Create an account</h3>
        <form action="">
          <div className='label'>Name</div>
          <input
            placeholder='Your name'
            value={form.text.value} type="text"
            onChange={(e) => {
              handleChange(e, 'text')
            }}/>
          <div className='label'>Email</div>
          <input
            placeholder='Your email'
            value={form.email.value}
            type="email"
            onChange={(e) => {
              handleChange(e, 'email')
            }}/>
          <div className='label'>Password</div>
          <input
            placeholder='Enter your password'
            value={form.password.value}
            type="password"
            onChange={(e) => {
              handleChange(e, 'password')
            }}/>
        </form>
        <button disabled={!form.text.valid && form.email.valid && form.password.valid}
                onClick={sendingData}>
          Register
        </button>
        <div className="sing-form">Do you already have an account?<br/>
          <span onClick={() => {
            setOpen(true)
          }}>Sing in
          </span>
        </div>
      </div>

      {open && (
        <LogIn open={open} setOpen={setOpen} setActive={setActive} setIsLogin={setIsLogin}/>
      )}


    </div>
  );
};

export default ModalWindow;
