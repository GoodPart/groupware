import {request} from '../utils/axios';

const SIGNUP_URL = '/signup';

// 액션 타입 
const SIGNIN = 'sign/SIGNIN' as const;


// 액션 생성 함수
export function signInAction(info:any) {
    const data = request("post", SIGNUP_URL, info)

    return {
        type : SIGNIN,
        payload : data
    }
}


//초기상태
const initState  = {
    name : "",
    userId : "",
    userPw: "",
}



//리듀서 작성
function sign(state = initState, action:any) {
    switch (action.type) {
        case SIGNIN :
            return {
                loginSuccess : action.payload
            }
        default : 
        return state
    }
}

export default sign;