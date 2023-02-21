import React,{ChangeEvent, FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {registerREquestLogin} from '../modules/register';


import Signin from '../components/Signin';

type formType = {
    name : string,
    value : string
}

function SigninContainer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        userId : '',
        userPw : ''
    })

    // const {name, value}:any = form;

    const onChange = (e:ChangeEvent<HTMLInputElement>):any => {
        const {name, value} = e.target; 
        setForm({
            ...form,
            [name] : value    
        })

        console.log(form)
    };

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(registerREquestLogin(form))
        .then((res:any)=> {
            console.log(res)

            const login = res.payload.loginSuccess;
            const message = res.payload.message;

            if(login) {
                navigate('/');
            }else {
                alert(message)
            }
        })

        //초기화
        setForm({
            userId : '',
            userPw : ''
        })
    }

    return (
        <Signin 
            onChange={onChange}
            onSubmit={onSubmit}
            form={form}
        />
    )
}
export default SigninContainer