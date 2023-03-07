import request from "../utils/axios";

const DELETE_NOTIFICATION_URL = '/api/notification/delete';
const GET_NOTIFICATION_URL = '/api/notification/get/user';


// 액션 타입
const DELETE = 'notification/DELETE' as const;
const READ = 'notification/READ' as const;
const NOTI_CHECKED = 'notification/NOTI_CHECKED' as const;


// 액션 함수 타입
type notificationActionType = (
    | ReturnType <typeof deleteRequest>
    | ReturnType <typeof notiIsChecked>
)

type NotificationType = {
    notiShow : boolean,
    is_checked : boolean

}

const initState : NotificationType = {
    notiShow : false,
    is_checked : false
}


export function deleteRequest(e:any, rootName:string, reciver_id:string, comment_id : string):any {
    let form = {
        receiver_id :  reciver_id, // 받는 사람 (게시글 작성자)
        _id : comment_id // 보낸 사람 (코멘트 작성자)
    };
    const _req = request('post', DELETE_NOTIFICATION_URL, form);

    return _req.then(res=> {
        if(res.success) {
            e.target.closest(`${rootName}`).remove();
            return {
                type : DELETE,
                payload : res
            }
        }
    })
}


export function notiIsChecked(notiData:any) {
    // let _loop = notiData.map((ele:any, index:number)=> {
    //     if(!ele.is_checked) {
    //         return false
    //     }else {
    //         return true
    //     }
    // });
    // const discriminated = _loop.some((bool:boolean)=> {
    //     return bool == true
    // })

    // return {
    //     type: NOTI_CHECKED,
    //     payload :discriminated
    // }
    return {
        type : NOTI_CHECKED,
        payload : true
    }
};

function notificationReducer(state:NotificationType = initState, action:notificationActionType):NotificationType {
    switch(action.type) {
        case DELETE : 
            return state
        case NOTI_CHECKED :
            return {
                ...state,
                is_checked : action.payload
            }

        default : 
                return state
    }
}

export default notificationReducer