import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';

export const SignupPage = () => {

  const { signup } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: 'Matias',
    email: 'matisuez@gmail.com',
    password: '1234',
  });

  const inputHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    
    const  { email, password, name } = form;
    const msg = await signup(name, email, password); 

    if( msg !== true ) {
      Swal.fire('Error', msg, 'error');
    }

  }

  const allOk = () => {
    return (
      form.name.length > 0 && 
      form.password.length > 0 &&
      form.email.length > 0) ? 
        true 
        : 
        false;
  }

  return (
    <form 
      onSubmit={ onSubmit }
      className="login100-form validate-form flex-sb flex-w">
      <span className="login100-form-title mb-3">
        Chat - Sign up
      </span>

      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="text" 
          name="name" 
          placeholder="Nombre" 
          value={ form.name }
          onChange={ inputHandleChange } />
        <span className="focus-input100"></span>
      </div>

      
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
          onChange={ inputHandleChange } />
        <span className="focus-input100"></span>
      </div>
      
      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/signin" className="txt1">
            Do you have an account?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button 
          type="submit"
          disabled={ !allOk() }
          className="login100-form-btn">
          Create account
        </button>
      </div>
    </form>
  )
}
