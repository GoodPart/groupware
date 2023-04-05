import request from "../utils/axios";

import {delay, put,call, takeEvery, takeLatest} from 'redux-saga/effects'

// endpoint
const GETCHATLISTBYCATEGORY_URL = '/api/chat/getlistbycategory';
const GETCATEGORY_URL = '/api/chat/get/category';

// 신규 post 생성
const CREATE_CHAT_URL = '/api/chat/createchat';



// 액션타입
const NEW_POST = 'chat/NEW_POST' as const;
const UPDATE_POST= 'chat/UPDATE_POST' as const;


const CHATLIST = 'chat/CHATLIST' as const;
const GATEGORYLIST = 'chat/GATEGORYLIST' as const;


const VIEWPOST = 'chat/VIEWPOST' as const;
const VIEWPOST_GET_POST_DATA = 'chat/VIEWPOST_GET_POST_DATA' as const;
const VIEWPOST_GET_COMMENT_DATA = 'chat/VIEWPOST_GET_COMMENT_DATA' as const;
const VIEWPOST_GET_SUCCESS = 'chat/VIEWPOST_GET_SUCCESS' as const;

const RESETLIST = 'chat/RESETLIST' as const;

const GET_LIST_SUCCESS = 'chat/GET_LIST_SUCCESS' as const;

// saga type
const GETLISTLIMITE_ASYNC = 'chat/GETLIST_ASYNC' as const;
const GETLISTLIMITE_ASYNC2 = 'chat/GETLIST_ASYNC2' as const;

const LOADING = 'LOADING' as const;
const SUCCESS = "SUCCESS" as const;



// 상태 여부 액션 타입
const GET_CHATS = 'GET_CHATS' as const;
const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS' as const;
const GET_CHATS_ERROR = 'GET_CHATS_ERROR' as const; 


export function getChats (form:any):any {

    function _getLimitedData(data:any, start:number = 0, count:number):any {
        const end = start + count;
        let form = {
            data : data.slice(start, end),
            nextId : data.length < end ? null : end
        };
        return form
    }

    function historyMerge (reqData:any, storeData:any) {
        const post_no = reqData.reduce((prev:any, next:any) => {
            if(!prev) prev = [];
            prev = prev.concat(next)
            return prev
            
        }, storeData)
    
        return post_no
    }

    return async(dispatch:any, getState:any) => {
        const chats = await request("post", GETCHATLISTBYCATEGORY_URL, {class_no : form.chatName});
        let limitedData = _getLimitedData(chats.chatprops, form.nextId, form.count);
        
        const data = getState().chatReducer;
        dispatch({
            type : GET_CHATS,
            payload : {
                limitedData : limitedData,
                history : data.chats.data,
            },
        })
        try {
            const data = getState().chatReducer;
            const mergeData = historyMerge(data.chats.data, data.chats.history);

            dispatch({
                type : GET_CHATS_SUCCESS,
                mergeData
            })
        } catch(err) {
            dispatch({
                type : GET_CHATS_ERROR, err
            })
        }
        
    }
}


export function updatePost (form:any,):any {
    return async(dispatch:any, getState:any) => {
        dispatch({
            type : RESETLIST,
        })

        await request("post", CREATE_CHAT_URL, form);
        try {
            const data = getState().chatReducer;
            let _form = {
                chatName : Number(form.class_no),
                count : 3,
                nextId : data.meta.nextId,
                history : ''
            }

            dispatch(getChats(_form));

            
        }catch(err) {
            
        }
    }

    
}

type chatAction = (
    | ReturnType <typeof getListByCategory>
    | ReturnType <typeof viewPost>
    | ReturnType <typeof getLimitedData>
    | ReturnType <typeof getLimitedDataThunk>
    | ReturnType <typeof resetDataList>
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
    meta: {
        nextId : number,
    },
    chats : {
        loading : boolean,
        data : any,
        error : any,
        history:any
    },
    post_view : {
        loading : boolean,
        post_data : any,
        comment_data : any,
        err : any
    },
    loading : boolean
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
    meta: {
        nextId : 0,
    },
    chats : {
        loading : false,
        data : null,
        error : null,
        history : {}
    },
    post_view : {
        loading : false,
        post_data : '',
        comment_data : '',
        err : ''
    },
    loading : false,
}


//saga
export const getListLimiteAsync = (payload:any):any => ({
    type : GETLISTLIMITE_ASYNC,
})

export const getListSuccess = (getData:any) => {
    return {
        type :GET_LIST_SUCCESS,
        payload : getData
    }
}

//제너레이터
function* getListLimiteSaga(action:any):any {
    try{
        // const res = yield call(getListByCategory2(action.payload.categoryName));
    }catch(err) {
        return err
    }
}

//chat 사가
export function* chatSaga() {
    yield takeEvery(GETLISTLIMITE_ASYNC, getListLimiteSaga)
    yield takeEvery(GET_LIST_SUCCESS, getListSuccess)
    // yield takeEvery(GETLISTLIMITE_ASYNC2, getListLimiteSaga)
    
}

export function getLimitedDataThunk(class_no:any, start:number, count : number):any {
    return async (dispatch:any) => {
        
        try {
            const getList = dispatch(getListByCategory(class_no))
            return getList.then((res:any)=> {
                const chatData = res.payload.chatprops;
                return dispatch(getLimitedData(chatData, start, count))
            })

        } catch(err) {
            console.log(err)
        }
    }
}

export function resetDataList():any {
    console.log('resetData')
    return {
        type : RESETLIST,
    }
}
 


// 작업이 필요함.
function getLimitedData(data:any, start:number = 0, count:number):any {
    const end = start + count;
    let form = {
        data : data.slice(0, end),
        nextId : data.length < end ? null : end
    };
    return form

}


export function getListByCategory(categoryName : number):any {

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

           
        } catch(err) {
            console.log('false')
        }

    }
}

export function viewPost(post_id: string):any {

    return async (dispatch:any, getState:any) => {

        const data = await request("post", "/api/chat/get/chatlistby_id", {_id : post_id})

        dispatch({
            type : VIEWPOST_GET_POST_DATA,
            payload : data.result
        });
        try {
            const getStore = getState().chatReducer;
            const commentData = await request("post", "/api/chat/get/comment",{_id : post_id});

            dispatch({
                type : VIEWPOST_GET_COMMENT_DATA,
                post_data : getStore.post_view.post_data,
                comment_data : commentData.find[0]
            })

        }catch(err) {

        }

    }

    
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
        case NEW_POST:
            return {
                ...state,
                success : action.payload.success,
                
            }
        case VIEWPOST_GET_POST_DATA : 
            return {
                ...state,
                post_view : {
                    loading : true,
                    post_data : action.payload,
                    comment_data : '',
                    err : false
                }
            }
        case VIEWPOST_GET_COMMENT_DATA :
            return {
                ...state,
                post_view : {
                    loading : false,
                    post_data : action.post_data,
                    comment_data : action.comment_data,
                    err : false
                }
            }
        case VIEWPOST :
            return {
                ...state,
                success : action.payload,
                result : action
            }
        case RESETLIST : 
            return {
                ...state,
                chats : {
                    loading : false,
                    data : null,
                    error : null,
                    history : {}
                },
                meta : {
                    nextId : 0
                }
            }

        case GET_CHATS : 
            return {
                ...state,
                chats : {
                    loading : true,
                    data : action.payload.limitedData.data,
                    error : null,
                    history : action.payload.history
                },
                meta : {
                    nextId : action.payload.limitedData.nextId
                }
            }
        case GET_CHATS_SUCCESS : 
            return {
                ...state,
                chats : {
                    loading : false,
                    data : action.mergeData,
                    error : null,
                    history : action.mergeData
                },
                // meta:{
                //     nextId : action.limitedData.nextId
                // }
            }
        case GET_CHATS_ERROR : 
            return {
                ...state,
                chats : {
                    loading : false,
                    data : null,
                    error : action.err
                }
            }
        case LOADING : 
            return {
                ...state,
                loading : true,
                // post_no : action
            }
        case SUCCESS :
            return {
                ...state,
                loading : false
            }

        default : 
            return state
    }
}



export default chatReducer