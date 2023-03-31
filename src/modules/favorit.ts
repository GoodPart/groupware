import request from "../utils/axios";
//end point

const GET_FAVORIT_BY_POST_ID_URL = "/api/favorit/get/favoritbypostid";
const GET_FAVORIT_BY_USER_ID_URL = "/api/favorit/get/favoritbyuserid";
const INCREASE_FAVORIT_URL = "/api/favorit/create/favorit";
const DECREASE_VAORIT_URL = "/api/favorit/delete/favorit";
const GET_FAVORIT_AUTH_URL = "/api/favorit/get/favoritauth";


//액션타입
const GET_FAVORIT_BY_POST_ID = "favorit/GET_FAVORIT_BY_POST_ID";
const GET_FAVORIT_BY_USER_ID = "favorit/GET_FAVORIT_BY_USER_ID";

const INCREASE_FAVORIT = "favorit/INCREASE_FAVORIT";
const DECREASE_VAORIT = "favorit/DECREASE_VAORIT";

const INCREASE_FAVORIT_FAIL = "favorit/INCREASE_FAVORIT_FAIL";

const GET_FAVORIT_AUTH = "favorit/GET_FAVORIT_AUTH";



//Thunk 액션 타입
const SUCCESS = "favorit/SUCCESS";

type FavoritAction = (
    | ReturnType <typeof getDataByPostId >
    | ReturnType <typeof getDataByUserId>
    | ReturnType <typeof inCreaseFavorit>
    | ReturnType <typeof deCreaseFavorit>
    | ReturnType <typeof checkAuth>
)


// thunk 함수
export function updateFavCountOfChat(post_id:string, user_id : string, type:string):any {
    return async (dispatch:any, getState:any) => {
        

        if(type === 'increase') {
            await dispatch(inCreaseFavorit(post_id, user_id))
            console.log('increase')

        }else {
            await dispatch(deCreaseFavorit(post_id, user_id))
            console.log('decrease')
        }
        // favoerit db 푸시
        try {

            


        } catch(err) {

        }
    }
}

export function requestFavorit(_object:any):any {
    console.log(_object)
    
    function mergeData (reqData:any, storeData:any) {

        console.log(reqData, storeData)
        const post_no = [reqData].reduce((prev:any, next:any) => {
            
            if(!prev) prev = [];
            prev = prev.concat(next)
            return prev
            
        }, storeData)
    
        return post_no
    }

    return async (dispatch:any, getState:any) => {
        // const fav_store = getState().favoritRecuder;
        // const reqFavCount = await request("post", GET_FAVORIT_BY_POST_ID_URL, {post_id : post_id});
        
        // dispatch({
        //     type : GET_FAVORIT_BY_POST_ID,
        //     data : {
        //         post_id : post_id,
        //         favorit_count : reqFavCount.find,
        //     },
        //     history : fav_store.data
        // })
        // try {
        //     const fav_store = getState().favoritRecuder;
        //     const _mergeData = mergeData(fav_store.data, fav_store.history)

        //     dispatch({
        //         type : SUCCESS,
        //         _mergeData
        //     })

        // }catch(err) {
        //     console.log(err)
        // }
    }
}

export function checkAuth (post_id:string, user_id:string):any {
        let form ={
            post_id : post_id,
            user_id : user_id
        }
        const data = request("post", GET_FAVORIT_AUTH_URL, form);
        return {
            type : GET_FAVORIT_AUTH,
            payload : data
        }
    


}

//액션 함수
export  async function getDataByPostId (postId:string) {
    let form = {
        post_id : postId,
    }

    const data = await request("post", GET_FAVORIT_BY_POST_ID_URL, form);
    return {
        type : GET_FAVORIT_BY_POST_ID,
        payload : {
            post_id : postId,
            count : data.find
        }
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

export function inCreaseFavorit (post_id:string, user_id:string):any {
    console.log('redux ---->',post_id, user_id)
    if(post_id === undefined || user_id === undefined) {
        alert("안돼 돌아가")
        return {
            type : INCREASE_FAVORIT_FAIL,
        }
    }else {
        let form = {
            post_id : post_id,
            user_id : user_id
        }
        const data = request("post", INCREASE_FAVORIT_URL, form);
        return {
            type : INCREASE_FAVORIT,
            payload : data
        }
    }
    
}
export function deCreaseFavorit (post_id:string, user_id:string) {
    let form = {
        post_id : post_id,
        user_id : user_id
    }
    const data = request("post", DECREASE_VAORIT_URL, form);
    return {
        type : DECREASE_VAORIT,
        payload : data
    }
}



//초기 값
// type FavoritState = {

// } 

const initState = {
    loading: false,
    error : null,
    data : [],
    history : []
}


//reducer

function favoritRecuder(state = initState, action:any):any {
    switch(action.type) {
        case GET_FAVORIT_BY_POST_ID :
            return {
                ...state,
                loading : false,
                data : action.payload,
                history : action.history
            }
        case SUCCESS : 
            return {
                ...state,
                loading : false,
                data : action._mergeData,
                history : action._mergeData
            }
        case GET_FAVORIT_BY_USER_ID :
            return {
                result : action.payload
            }
        case INCREASE_FAVORIT :
            return {
                result : action.payload
            }
        case DECREASE_VAORIT :
            return {
                result : action.payload
            }
        case INCREASE_FAVORIT_FAIL : 
            return state
            

        default: return state
    }
}


export default favoritRecuder;