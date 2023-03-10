import request from "../utils/axios";

const DELETE_NOTIFICATION_URL = '/api/notification/delete';
const GET_NOTIFICATION_URL = '/api/notification/get/user';
const UPDATE_CHECKED_URL = '/api/notification/update/checked';


// 액션 타입
const DELETE = 'notification/DELETE' as const;
const READ = 'notification/READ' as const;
const NOTI_CHECKED = 'notification/NOTI_CHECKED' as const;
const UPDATE_CHECKED = 'notification/UPDATE_CHECKED' as const;


// 액션 함수 타입
type notificationActionType = (
    | ReturnType <typeof deleteRequest>
    | ReturnType <typeof notiBadgeInfo>
    | ReturnType <typeof updateCheckedRequest>
    | ReturnType <typeof getNotiList>

)

type NotificationType = {
    notiView : boolean,
    not_checked : {
        length : number,
        find : boolean
    },
    noti_length : number,
    noti_list : object

}

const initState : NotificationType = {
    notiView : false,
    not_checked : {
        length : 0,
        find : false
    },
    noti_length : 0,
    noti_list : {}

}


// export function deleteRequest(e:any, rootName:string, reciver_id:string, comment_id : string):any {
//     let form = {
//         receiver_id :  reciver_id, // 받는 사람 (게시글 작성자)
//         _id : comment_id // 보낸 사람 (코멘트 작성자)
//     };
//     const _req = request('post', DELETE_NOTIFICATION_URL, form);

//     return _req.then(res=> {
//         if(res.success) {
//             // e.target.closest(`${rootName}`).remove();
//             return {
//                 type : DELETE,
//                 payload : res
//             }
//         }
//     })
// }

export function deleteRequest(receiver_id:string, comment_id : string):any {
    return async (dispatch:any) => {
        try{
            let form = {
                receiver_id :  receiver_id, // 받는 사람 (게시글 작성자)
                _id : comment_id // noti _id
            };
            await request('post', DELETE_NOTIFICATION_URL, form);
            dispatch(getNotiList(receiver_id))
            .then((res:any)=> {
                dispatch(notiBadgeInfo(res.payload))
            })
            
        } catch(err) {
            console.log('false')
        }
    }
}

export function getNotiList(receiver_id : string):any {
    
    let data = request('post', '/api/notification/get/user', {receiver_id : receiver_id})
    return data.then((res)=> {
            return {
                type : READ,
                payload : res.find
            } 
    })
     

}
// useCallback을 사용하여 넘어온 값을 비동기로 받는 액션 함수.
export function updateCheckedRequest(receiver_id:string, comment_id : string):any {
    //[dispatch]를 받았다. 그외 다른 값도 받을 수 있음.
    return async (dispatch:any, test:any) => {
        try{
            let form = {
                receiver_id :  receiver_id, // 받는 사람 (게시글 작성자)
                _id : comment_id // noti _id
            };
            // 해당 값을 api요청으로 수행하고
            await request('post', UPDATE_CHECKED_URL, form);
            
            //한번더 dispatch를 실행한다.
            dispatch(getNotiList(receiver_id))
            .then((res:any)=> {
                //테스트 결과 이렇게 then안에도dispatch를 진행할 수 있다.
                dispatch(notiBadgeInfo(res.payload))
            })
            
        } catch(err) {
            console.log('false')
        }
    }
}


export function notiBadgeInfo(notiData:any):any {
    // console.log(notiData)
    let count = 0;
    let _loop = Object.values(notiData).map((ele:any, index:number)=> {
        if(!ele.is_checked) {
            count = count+1
            
            return false
        }else {
            return true
        }
    });
    let t = {
        length : count,
        find : _loop.includes(false) ? true : false
    }
    return {
        type: NOTI_CHECKED,
        payload :t
    }
};

function notificationReducer(state:NotificationType = initState, action:notificationActionType):NotificationType {
    switch(action.type) {
        case DELETE : 
            return state
        case NOTI_CHECKED :
            return {
                ...state,
                not_checked : {
                    length : action.payload.length,
                    find : action.payload.find
                }
            }
        case UPDATE_CHECKED : 
            return {
                ...state
            }
        case READ : 
            return {
                ...state,
                noti_list : action.payload
            }

        default : 
                return state
    }
}

export default notificationReducer