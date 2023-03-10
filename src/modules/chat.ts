import request from "../utils/axios";

// endpoint
const GETCHATLISTBYCATEGORY_URL = '/api/chat/getlistbycategory';
const GETCATEGORY_URL = '/api/chat/get/category';

// 액션타입
const CHATLIST = 'chat/CHATLIST' as const;
const GATEGORYLIST = 'chat/GATEGORYLIST' as const;

const LIMITECOUNT = 'chat/LIMITECOUNT' as const;

const VIEWPOST = 'chat/VIEWPOST' as const;


type chatAction = (
    | ReturnType <typeof getListByCategory>
    | ReturnType <typeof viewPost>
    | ReturnType <typeof getListByCategoryLimiteData>
    | ReturnType <typeof getLimitedData>
)


type ChatState = {
    post_limite : number,
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
    post_limite:0,
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


export function getLimitedData(data:any, start:number, count:number):any {
    const end = start + count;
    let form = {
        data : data.slice(start, end),
        nextId : data.length < end ? null : end
    };
    console.log(form)
    return {
        type : LIMITECOUNT,
        payload : form
    }
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

export function getListByCategoryLimiteData(categoryName : number, nextId:any, count:number):any {
    return async (dispatch:any) => {
        try {

            await request("post", GETCHATLISTBYCATEGORY_URL, {class_no : categoryName})
            .then(res=> {
                dispatch(getLimitedData(res.chatprops, nextId, count))
            })
            // dispatch(getListByCategory(categoryName))
            // .then((res:any)=> {
            //     const chats = res.payload.chatprops;
               
            //     dispatch(getLimitedData(chats, nextId, count))

            // })

           
        } catch(err) {
            console.log('false')
        }

    }
}

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
        case LIMITECOUNT : 
            return {
                ...state,
                success : true,
                result : action.payload
            }
        default : 
            return state
    }
}

export default chatReducer