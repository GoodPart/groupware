import {request} from '../utils/axios';

const SIGNUP_URL = '/signup';
const SIGNUP_DUP_CHECK_URL = '/signup/checkid';

// 액션 타입 
const SIGNIN = 'sign/SIGNIN' as const;
const IDCHECK = 'sign/IDCHECK' as const;




// 액션 생성 함수
export function signInAction(info:any) {
    const data = request("post", SIGNUP_URL, info)

    // console.log(data)
    return {
        type : SIGNIN,
        payload : data
    }
}

// id 중복 확인 방법
// request후 받은 payload를 then으로 promise 제거 후, api server에서 받은 값을 alert에 노출
export function duplicationCheck(id:any) {
    const data = request("post", SIGNUP_DUP_CHECK_URL, id)
    data.then(res=> {})    
    return {
        type : IDCHECK,
        payload : data
    }
}


//초기상태
const initState  = {
    idCheck : false,
}



//리듀서 작성
function sign(state = initState, action:any) {
    switch (action.type) {
        case SIGNIN :
            return {
                loginSuccess : action.payload
            }
        case IDCHECK : 
            return {
                ...state,
                idCheck : action.payload
                
                
            }
        default : 
        return state
    }
}

export default sign;