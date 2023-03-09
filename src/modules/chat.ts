import request from "../utils/axios";

// endpoint
const GETCHATLISTBYCATEGORY_URL = '/api/chat/getlistbycategory';
const GETCATEGORY_URL = '/api/chat/get/category';

// 액션타입
const CHATLIST = 'chat/CHATLIST' as const;
const GATEGORYLIST = 'chat/GATEGORYLIST' as const;

const VIEWPOST = 'chat/VIEWPOST' as const;


type chatAction = (
    | ReturnType <typeof getListByCategory>
    | ReturnType <typeof viewPost>
)


type ChatState = {
    success : boolean,
    post_no: string,
    post_title: string,
    post_desc: string,
    post_comment_count: number,
    post_comment_code: number,
    post_create_data: string,
    post_edite_date: string,
    favorit_count: number,
    class_no: number,
}

const initState:ChatState = {
    success : false,
    post_no: '',
    post_title: '',
    post_desc: '',
    post_comment_count: 0,
    post_comment_code: 0,
    post_create_data: '',
    post_edite_date: '',
    favorit_count: 0,
    class_no: 0,
}


export function getListByCategory(categoryName : number):any {

    // console.log(categoryName)
    const data = request("post", GETCHATLISTBYCATEGORY_URL, {class_no : categoryName});

    return data.then(res=> {
        return {
            type : CHATLIST,
            payload : res 
        }
    })
};

export function viewPost(post_id: string):any {
    const data = request("post", "/api/chat/get/chatlistby_id", {_id : post_id})

    return data.then(res=> {
        return {
            type : VIEWPOST,
            payload : res.result
        }
    })
}



function chatReducer(state = initState, action:chatAction):any {
    switch(action.type) {
        case CHATLIST:
            return {
                ...state,
                success :action.payload.success,
                result : action.payload
            }
        case VIEWPOST :
            return {
                ...state,
                success : action.payload.success,
                result : action.payload
            }

        default : 
            return state
    }
}

export default chatReducer