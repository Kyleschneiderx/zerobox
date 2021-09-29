import React, {useState, useEffect} from 'react';
import {Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Login from './components/Login'
import Home from './components/Home'
import AdminLayout from './hoc/AdminLayout';
import SignUp from './components/Signup'
import Dashboard from './components/Dashboard'
import AuthGuard from './hoc/auth';

import { useDispatch, useSelector } from 'react-redux';
import { auth } from './store/actions/user_actions'



const Routes = (props) =>{
    return(
        <BrowserRouter>
                <AdminLayout>
                    <Switch>
                        <Route path='/dashboard' component={AuthGuard(Dashboard, true)}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/' component={Home}/>
                    </Switch>
                </AdminLayout>
        </BrowserRouter>
    )
}


export default Routes;