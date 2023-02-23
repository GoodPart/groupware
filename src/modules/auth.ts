import request from '../utils/axios';
import axios from 'axios';

const AUTH_URL ='/users/auth';

const AUTHCHECK = '/auth/AUTHCHECK' as const;

type authAction = (
    | ReturnType <typeof authCheck>
);

type AuthState = {
    isAuth : boolean,
    _id : string,
    name : string,
    userId : string
}

const initState:AuthState =  {
   isAuth : false,
   _id : '',
    name : '',
    userId : ''
}

export function authCheck ():any {
    // const cookieSet = getCookie;
    const data = request('get',AUTH_URL, {})

    return data.then(res=> {
        // console.log(res)
        return {
            type : AUTHCHECK,
            payload : res
        }
    })
}

function authCheckReducer(state:AuthState = initState, action:authAction) {
    switch(action.type) {
        case AUTHCHECK:
            return {
                ...state,
                x_auth : action.payload,
                isAuth : action.payload.isAuth,
                _id : action.payload._id,
                name : action.payload.name,
                userId : action.payload.userId
            }
        default : 
        return state
    }
}

export default authCheckReducer