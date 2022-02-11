import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { SignupPage } from '../pages/SignupPage';
import { SigninPage } from '../pages/SigninPage';

import '../css/signin-signup.css';

export const AuthRouter = () => {
  return (
    <div className="limiter">
        <div className="container-login100">
            <div className="wrap-login100 p-t-50 p-b-90">
                <Switch>
                    <Route exact path="/auth/signup" component={ SignupPage }/>
                    <Route exact path="/auth/signin" component={ SigninPage }/>
                    <Redirect to="/auth/signin" />
                </Switch>
            </div>
        </div>
    </div>
  )
}
