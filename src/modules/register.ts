import request from '../utils/axios';

const SIGNUP_URL = '/signup'as const;
const SIGNUP_DUP_CHECK_URL = '/signup/checkid'as const;

// 액션 타입 
const SIGNIN = 'sign/SIGNIN' as const;
const IDCHECK = 'sign/IDCHECK' as const;

type registerAction = (
| ReturnType <typeof duplicationCheck>
| ReturnType <typeof registerRequest>
)


type RegisterState = {
    success : boolean,
    message : string,
    name : string,
    userId : string,
    userPw : string,
    userPwCF : string
}
//초기상태
const initState:RegisterState  = {
    success : false,
    message : '',
    name : '',
    userId : '',
    userPw : '',
    userPwCF : ''
    
}


// type SignState = {
//     name : string,
//     userId : string,
//     userPw : string,
//     userPwCF : string
// }
// const signInitState:SignState = {
//     name : '',
//     userId : '',
//     userPw : '',
//     userPwCF : ''
// }

// 액션 생성 함수
// export async function signInAction(info:string) {
//     const data = await request("post", SIGNUP_URL, info).then(res=> {
//         return res.payload
//     })

//     // console.log(data)
//     return {
//         type : SIGNIN,
//         payload : data
//     }
// }

export function registerRequest(form:object):any {
    console.log(form)
    const data = request("post", SIGNUP_URL, form);

    return {
        type :SIGNIN,
        payload : data
    }
}

// id 중복 확인 방법
// request후 받은 payload를 then으로 promise 제거 후, api server에서 받은 값을 alert에 노출
export function  duplicationCheck (id:string):any {
    const data = request("post", SIGNUP_DUP_CHECK_URL, {userId : id})
 
    return {
        type : IDCHECK,
        payload : data
    }
}


//리듀서 작성
function register(state:RegisterState = initState, action:registerAction):RegisterState {
    switch (action.type) {
        case SIGNIN :
            return {
                ...state,
                name : action.payload.name,
                userId : action.payload.userId, 
                userPw : action.payload.userPw, 
                userPwCF : action.payload.userPwCF 
            }
        case IDCHECK : 
            return {
                ...state,
               success : action.payload.success,
               message : action.payload.message
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