import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';

export const SigninPage = () => {

  const { signin } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: 'matisuez@gmail.com',
    password: '1234',
    rememberme: false,
  });

  useEffect(() => {
    const remembermeEmail = localStorage.getItem('email');
    if(remembermeEmail) {
      setForm( (form) => ({
        ...form,
        email: remembermeEmail,
        rememberme: true,
      }));
    }
  }, []);
  

  const inputHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    
    if( form.rememberme ) {
      localStorage.setItem('email', form.email);
    } else {
      localStorage.removeItem('email');
    }
    
    const  { email, password } = form;
    const ok = await signin(email, password); 

    if( !ok ) {
      Swal.fire('Error', 'Check email and password', 'error');
    }

  }

  const allOk = () => {
    return (form.email.length > 0 && form.password.length > 0) ? true : false;
  }

  return (
    <form 
      onSubmit={ onSubmit }
      className="login100-form validate-form flex-sb flex-w">
      <span className="login100-form-title mb-3">
        Chat - Sign in
      </span>
      
      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="email" 
          name="email" 
          placeholder="Email"
          value={ form.email }
          onChange={ inputHandleChange } />
        <span className="focus-input100"></span>
      </div>
      
      
      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="password" 
          name="password" 
          placeholder="Password"
          value={ form.password } 
          onChange={ inputHandleChange }/>
        <span className="focus-input100"></span>
      </div>
      
      <div className="row mb-3">
        <div 
          onClick={ () => toggleCheck() }
          className="col">
          <input 
            className="input-checkbox100" 
            id="ckb1" 
            type="checkbox" 
            name="rememberme" 
            checked={ form.rememberme } 
            readOnly/>
          <label className="label-checkbox100">
            Remember
          </label>
        </div>

        <div className="col text-right">
          <Link to="/auth/signup" className="txt1">
            New account?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button 
          type="submit"
          disabled={ !allOk() }
          className="login100-form-btn">
          Sign in
        </button>
      </div>
    </form>
  )
}
