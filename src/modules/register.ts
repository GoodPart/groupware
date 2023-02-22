import request from '../utils/axios';

const SIGNUP_URL = '/signup'as const;
const SIGNIN_URL = '/api/users/login' as const;
const SIGNUP_DUP_CHECK_URL = '/signup/checkid'as const;

// 액션 타입 
const SIGNUP = 'sign/SIGNUP' as const;
const SIGNIN = 'sign/SIGNIN' as const;
const IDCHECK = 'sign/IDCHECK' as const;
// const

type registerAction = (
| ReturnType <typeof duplicationCheck>
| ReturnType <typeof registerRequest>
)


type RegisterState = {
    idCheck : boolean,
    message : string,
    name : string,
    userId : string,
    userPw : string,
    userPwCF : string,
    token : string,
}
//초기상태
const initState:RegisterState  = {
    idCheck : false,
    message : '',
    name : '',
    userId : '',
    userPw : '',
    userPwCF : '',
    token : ''
    
}


export function registerRequest(form:object):any {
    // console.log(form)
    const data = request("post", SIGNUP_URL, form);

    return {
        type :SIGNUP,
        payload : data
    }
}

// id 중복 확인 방법
// request후 받은 payload를 then으로 promise 제거 후, api server에서 받은 값을 alert에 노출
export function  duplicationCheck (id:string):any {
    const data = request("post", SIGNUP_DUP_CHECK_URL, {userId : id})


    return data.then((res)=> {
        // const success = res.success;
        
        return {
            type : IDCHECK,
            payload : res
        }
    })
    
    // console.log('axios ->',data)
    // return {
    //     type : IDCHECK,
    //     payload : data
    // }
}

export function registerREquestLogin(form:object):any {
    const data = request("post", SIGNIN_URL, form);
    // console.log(data)
    return {
        type : SIGNIN,
        payload : data
    }
}


//리듀서 작성
function register(state:RegisterState = initState, action:registerAction):RegisterState {
    switch (action.type) {
        case SIGNUP :
            return {
                ...state,
                idCheck : action.payload.success
                // name : action.payload.name,
                // userId : action.payload.userId, 
                // userPw : action.payload.userPw, 
                // userPwCF : action.payload.userPwCF 
            }
        case IDCHECK : 

            console.log(action)
            return {
                ...state,
               idCheck : action.payload.success,
               message : action.payload.message
            }
        case SIGNIN : 
            return {
                ...state,
                userId : action.payload.userId,
                userPw : action.payload.userPw,
                token : action.payload.token
            }
        default : 
        return state
    }
}

// function register(state:registerState = initState, action:registerAction) {
  
    // switch(action.then)
    // action.then(res=> {
    //     switch(res.type) {
    //         case IDCHECK :
    //             return {
    //                 ...state,
    //                 idCheck: res.payload
    //             }
    //     }


    // })

    // Promise 
// }

export default register;