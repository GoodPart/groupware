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
    notiView : boolean,
    not_checked : {
        length : number,
        find : boolean
    },
    noti_length : number,

}

const initState : NotificationType = {
    notiView : false,
    not_checked : {
        length : 0,
        find : false
    },
    noti_length : 0,

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


export function notiIsChecked(notiData:any):any {
    console.log(notiData.length)
    let count = 0;
    let _loop = Object.values(notiData).map((ele:any, index:number)=> {
        // console.log(index)
        if(!ele.is_checked) {
            return false
        }else {
            count = count+1
            return true
        }
    });
    let t = {
        length : count,
        find : _loop.includes(true) ? true : false
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

        default : 
                return state
    }
}

export default notificationReducer