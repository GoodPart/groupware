import request from "../utils/axios";
//end point

const GET_FAVORIT_BY_POST_ID_URL = "/api/favorit/get/favoritbypostid";
const GET_FAVORIT_BY_USER_ID_URL = "/api/favorit/get/favoritbyuserid";
const CREATE_FAVORIT_URL = "/api/favorit/create/favorit";
const DELETE_FAVORIT_URL = "/api/favorit/delete/favorit";


//액션타입
const GET_FAVORIT_BY_POST_ID = "favorit/GET_FAVORIT_BY_POST_ID";
const GET_FAVORIT_BY_USER_ID = "favorit/GET_FAVORIT_BY_USER_ID";

const CREATE_FAVORIT = "favorit/CREATE_FAVORIT";
const DELETE_FAVORIT = "favorit/DELETE_FAVORIT";

type FavoritAction = (
    | ReturnType <typeof getDataByPostId >
    | ReturnType <typeof getDataByUserId>
    | ReturnType <typeof pushFavorit>
    | ReturnType <typeof popFavorit>
)


//액션 함수
export  function getDataByPostId (postId:string):any {
    let form = {
        post_id : postId,
    }

    const data = request("post", GET_FAVORIT_BY_POST_ID_URL, form);
    return {
        type : GET_FAVORIT_BY_POST_ID,
        payload : data
    }
};
export function getDataByUserId (userId:string) {
    let form = {
        user_id : userId,
    }
    const data = request("post", GET_FAVORIT_BY_USER_ID_URL, form);
    return {
        type : GET_FAVORIT_BY_USER_ID,
        payload : data
    }
};

export function pushFavorit (postId:string, userId:string) {
    let form = {
        post_id : postId,
        user_id : userId
    }
    const data = request("post", CREATE_FAVORIT_URL, form);
    return {
        type : CREATE_FAVORIT,
        payload : data
    }
}
export function popFavorit (postId:string, userId:string) {
    let form = {
        post_id : postId,
        user_id : userId
    }
    const data = request("post", DELETE_FAVORIT_URL, form);
    return {
        type : DELETE_FAVORIT,
        payload : data
    }
}



//초기 값
// type FavoritState = {

// } 

const initState = {
    loading: false,
    error : null,
    data : ''
}


//reducer

function favoritRecuder(state = initState, action:any):any {
    switch(action.type) {
        case GET_FAVORIT_BY_POST_ID :
            return {
                ...state,
                loading : false,
                data : action.payload
            }
        case GET_FAVORIT_BY_USER_ID :
            return {
                result : action.payload
            }
        case CREATE_FAVORIT :
            return {
                result : action.payload
            }
        case DELETE_FAVORIT :
            return {
                result : action.payload
            }

        default: return state
    }
}


export default favoritRecuder;