import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../modules';
import {authCheck} from '../modules/auth';
export default function (SpacificComponent:any, option:any, adminRoute=null) {
    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props:any) {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(()=> {
            dispatch(authCheck()).then((res:any)=> {
                console.log(res.payload)
                const isAuth = res.payload.isAuth;

                if(!isAuth) {
                    // 미 로그인 상태
                    if(option) {
                        navigate('/signin')
                    }
                }else {
                    // 로그인 상태
                    if(adminRoute ) {
                        //로그인 한 유저만 출입
                        // navigate('/')
                    } else {
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
}