import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import request from '../utils/axios';
// import { RootState } from '../modules';
import {authCheck} from '../modules/auth';
import { notiBadgeInfo,deleteRequest, updateCheckedRequest, getNotiList } from '../modules/notification';
export default function (SpacificComponent:any, option:any, adminRoute=null) {
    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props:any) {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(()=> {
            dispatch(authCheck()).then((res:any)=> {
                const isAuth = res.payload.isAuth;

                if(!isAuth) {
                    // 미 로그인 상태
                    if(option) {
                        navigate('/signin')
                    }
                }else {
                    console.log('로그인 상태')

                    // noti table에 로그인 유저 이름으로 조회
                    dispatch(getNotiList(res.payload.userId))
                    .then((res:any) => {
                        // badge state 업데이트
                        dispatch(notiBadgeInfo(res.payload))
                    })

                    
                    // 로그인 상태
                    if(adminRoute ) {
                        // navigate('/')
                    } else {
                        //로그인 한 유저만 출입

                        if(option === false) {
                            navigate('/')
                        }
                        
                    }

                    
                }
            })
        },[])
        return (
            <SpacificComponent />
        )
    }
    return AuthenticationCheck
};