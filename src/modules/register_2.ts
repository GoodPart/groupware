import request from '../utils/axios';
import {createReducer, ActionType,createAction, createAsyncAction} from 'typesafe-actions'

const SIGNUP_DUP_CHECK_URL = '/signup/checkid';


const ID_CHECK = 'register/ID_CHECK';


export const duplicationCheck = createAction(ID_CHECK, (id:object)=> {
    const data = request("post", SIGNUP_DUP_CHECK_URL, id)
    console.log(data)

    return data
});

const actions = {duplicationCheck};

type RegisterAction = ActionType<typeof actions>;
type RegisterState = {
    idCheck : boolean,
    userId : string
}

const initState:RegisterState = {
    idCheck : false,
    userId : ''
}

// const register = createReducer<RegisterState, RegisterAction>(initState, {
//     [ID_CHECK] : (state, {payload}) => ({
//         ...state,
//         [payload] : 
//     })
// })