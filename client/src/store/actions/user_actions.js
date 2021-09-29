import axios from 'axios';
import {
    USER_LOGIN,
    USER_AUTH,
    USER_LOGOUT,
    USER_REGISTER,
    USER_ADD_GMAIL
} from '../types'
import qs from 'qs';



/*=============USER=================*/
export function loginUser({email, password}){
    console.log(email, password)
    const request = axios.post('/api/users/login', {email, password})
    .then(response => response.data)

    return{
        type: USER_LOGIN,
        payload:request
    }

}

export function registerUser({email, password}){
    console.log(email, password)
    const request = axios.post('/api/users/register', {email, password})
    .then(response => response.data)

    return{
        type: USER_REGISTER,
        payload:request
    }

}

export function auth(){
    const request = axios.get('/api/users/auth').then(response => response.data);
    return{
        type:USER_AUTH,
        payload:request
    }
}

export function logoutUser(){
    const request = axios.get('/api/users/logout')
        .then(response => {
                return null
            });
    return{
        type: USER_LOGOUT,
        payload:request
    }
}



export function addGmail(code, user){
    console.log(code.code)
    console.log(user)
    const request = axios.post('/api/users/gtoken', {code: code.code, user: user} ).then(response => response.data)

    return{
        type:USER_ADD_GMAIL,
        payload:request
    }

}