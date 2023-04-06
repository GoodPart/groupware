import React, {  ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'
import Icon from '../modules/icon/Icon'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

type SigninProps = {
    onChange : ChangeEventHandler,
    onSubmit : FormEventHandler,
    form : {
        userId : string,
        userPw : string
    }
}


function Signin({
    onChange,
    onSubmit,
    form
}:SigninProps) {
    return(
        <div style={{padding : "36px 16px", width : "100%"}}>
            <form action="submit" onSubmit={onSubmit}>
                <InputFormWrap check={form.userId}>
                    <input type="text" id='userId' name='userId' 
                    onChange={onChange} 
                    value={form.userId}
                    />
                    <label htmlFor='userId'>ID</label>
                </InputFormWrap>
                <br />

                <InputFormWrap check={form.userPw}>
                    <input type="password" id='userPw' name='userPw' 
                        onChange={onChange}
                        value={form.userPw}
                    />
                    <label htmlFor='userPw'>Password</label>
                </InputFormWrap>
                <br />
                <SubmitBtn type='button' onClick={onSubmit}>로그인</SubmitBtn>
            </form>
        </div>
    )
}

export default Signin
const InputFormWrap = styled.div<{check:any}>`
    position: relative;
    width : 100%;

    input {
        width: calc(100% - 20px);
        padding: 24px 4px 16px 16px;
        border-radius: 4px;
        border-color: #eee;
        color : #48484A;
        font-size : 16px;
        border-width: 1px;
        border-style: solid;
    }
    input:focus {
        outline: 1px solid #0F9485;
    }
    input:focus + label {
        top : 4px;
        left : 16px;
        font-size : 10px;
        /* transform : scale(.7); */
        color : #0F9485;
    }
    input + label {
        cursor: text;
        position: absolute;
        display: inline-flex;
        top: ${props => props.check.length > 0 ? "4px": "16px"};
        left : ${props => props.check.length > 0 ? "16px": "16px"}; 
        color : ${props=> props.check.length > 0 ? "#0F9485" : "#969696" };
        text-align: left;
        font-weight : bold;
        font-size : ${props=> props.check.length > 0 ? "10px" : "16px" };
        transition: scale .6s cubic-bezier(0.075, 0.82, 0.165, 1), top .6s cubic-bezier(0.075, 0.82, 0.165, 1) ;
    };
    input:read-only + label {
        /* left: 0px; */
    }

    label.duplicate-check {
        position: absolute;
        top : 50%;
        right : 12px;
        transform: translateY(-50%);
    }
`

const SubmitBtn = styled.button`
    cursor: pointer;
    width: 100%;
    padding : 16px;
    background-color: #0F9485;
    border : none;
    border-radius: 4px;
    color : #fff;
    font-size : 20px;
    font-weight: bold;


    &:disabled {
        cursor: not-allowed;
        background-color: gray
    }
`