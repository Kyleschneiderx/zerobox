import { USER_LOGIN, USER_AUTH, USER_LOGOUT, USER_REGISTER, USER_GMAIL } from "../types";

export default function(state={}, action){
    switch(action.type){
        case USER_LOGIN:
            return {...state, auth: action.payload.auth, userData: action.payload.userData}
        case USER_REGISTER:
                return {...state, auth: action.payload.auth, userData: action.payload.userData}
        case USER_AUTH:
            return {...state,
                 auth: action.payload.auth ? action.payload.auth:false,
                 userData:action.payload.userData ? action.payload.userData:false
                }
        case USER_GMAIL:
            return {...state, auth: action.payload.auth, userData: action.payload.userData}
        case USER_LOGOUT:
            return{...state, auth: action.payload, userData:false}
        default: 
            return state;
    }
}