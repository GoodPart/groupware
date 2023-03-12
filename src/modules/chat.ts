import request from "../utils/axios";

import {delay, put,call, takeEvery, takeLatest} from 'redux-saga/effects'

// endpoint
const GETCHATLISTBYCATEGORY_URL = '/api/chat/getlistbycategory';
const GETCATEGORY_URL = '/api/chat/get/category';



// 액션타입
const CHATLIST = 'chat/CHATLIST' as const;
const GATEGORYLIST = 'chat/GATEGORYLIST' as const;


const LIMITECOUNT = 'chat/LIMITECOUNT' as const;
const VIEWPOST = 'chat/VIEWPOST' as const;


// saga type
const GETLISTLIMITE_ASYNC = 'chat/GETLIST_ASYNC' as const;
const GETLISTLIMITE_ASYNC2 = 'chat/GETLIST_ASYNC2' as const;




type chatAction = (
    | ReturnType <typeof getListByCategory>
    | ReturnType <typeof viewPost>
    | ReturnType <typeof getLimitedData>
    | ReturnType <typeof getLimitedDataThunk>
    // | ReturnType <typeof getListByCategoryLimiteData>
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
    post_list : any,
    meta: {
        nextId : number,
    }
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
    post_list : null,
    meta: {
        nextId : 0,
    }
}


//saga
export const getListLimiteAsync = (categoryName:any, start:number, end : number):any => ({
    type : GETLISTLIMITE_ASYNC,
    payload : categoryName,
    start : start,
    end : end,
    meta : categoryName
})


//제너레이터
function* getListLimiteSaga(action:any):any {
    console.log('generater inbound->', action)
    try{
        let result = yield call(getListByCategory(action.payload));
        // console.log('result ->',result)
        // yield put({
        //     type : CHATLIST,
        //     payload : result.payload // chatList
        // })

        yield put({
            type : LIMITECOUNT,
            data : result.payload,
            start : result.start,
            count : result.end
        })
        // let result2 = yield put(getLimitedData(result.payload, 0, 3))

        
        // let start = yield;
        // let count = yield;
        // yield put(getLimitedData(result.payload.chatprops, start, count));

    }catch(err) {
        return err
    }
}

//chat 사가
export function* chatSaga() {
    yield takeEvery(GETLISTLIMITE_ASYNC, getListLimiteSaga)
    // yield takeEvery(GETLISTLIMITE_ASYNC2, getListLimiteSaga)
    
}

export function getLimitedDataThunk(class_no:any, start:number, count : number):any {
    return async (dispatch:any) => {
        const getList = dispatch(getListByCategory(class_no))

        try {
            return getList.then((res:any)=> {
                const chatData = res.payload.chatprops;
                return dispatch(getLimitedData(chatData, start, count))
            })

        } catch(err) {
            console.log(err)
        }
    }
}
 


// 작업이 필요함.
export function getLimitedData(data:any, start:number = 0, count:number):any {
    const end = start + count;
    let form = {
        data : data.slice(0, end),
        nextId : data.length < end ? null : end
    };
    console.log(start, count, end)
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


//리듀서
function chatReducer(state = initState, action:chatAction):any {
    // console.log(action)

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
                post_list : action.payload.data,
                meta :{
                    nextId :  action.payload.nextId

                }
                
            }
        default : 
            return state
    }
}



export default chatReducer