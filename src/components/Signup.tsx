import React,{ChangeEventHandler, MouseEventHandler} from 'react'
import styled from 'styled-components'

import Icon from '../modules/icon/Icon'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

type SignProps = {
    onChangeName : ChangeEventHandler,
    onChangeId: ChangeEventHandler,
    onChangePw: ChangeEventHandler,
    onChangePwCF: ChangeEventHandler,
    submit: MouseEventHandler,
    onIdCheck: ()=> void,
    // getuserNo : ()=> void,
    name:string,
    userId : string,
    userPw : string,
    userPwCF :string,
    idCheck : boolean,
    userNo : {
        id :  number,
        userNo : string
    }
}
function SignUp({
    onChangeName,
    onChangeId,
    onChangePw,
    onChangePwCF,
    submit,
    onIdCheck,
    // getuserNo,
    name,
    userId ,
    userPw ,
    userPwCF,
    idCheck,
    userNo
}:SignProps) {

    console.log(userPwCF)

    return (
        <div>
            <form>
                <InputFormWrap check={userNo.userNo}>
                    {
                        userNo ? (
                            <input type="text" value={userNo.userNo} readOnly/>
                        ) : 
                        (
                            <></>
                        )
                    }
                    <label>Employee code</label>
                </InputFormWrap>
                
                {/* <button type='button' onClick={getuserNo}>사원코드 조회</button> */}
                <br />
                <InputFormWrap check={name}>
                    <input id="name" type="text"  onChange={onChangeName}/>
                    <label htmlFor='name'>Name</label>
                </InputFormWrap>
                <br />

                <InputFormWrap check={userId}>
                    <input id='id' type="text"
                        
                        onChange={onChangeId}
                        onBlur={onIdCheck}
                        />
                    <label htmlFor='id'>Id</label>
                    <label className='duplicate-check'><Icon icon={faCheck} style={idCheck ? {color : "#0F9485" } : {color : "red"} }/></label>
                </InputFormWrap>
                <br />

                {/* <button type='button' onClick={onIdCheck}>{idCheck ? "done" : "not"}</button> */}
                <InputFormWrap check={userPw}>
                    <input id='password' type="text" onChange={onChangePw}/>
                    <label htmlFor='password'>Password</label>
                </InputFormWrap>
                <br />

                <InputFormWrap check={userPwCF}>
                    <input id='password-confirm' type="password" onChange={onChangePwCF}/>
                    <label htmlFor='password-confirm'>Password confirm</label>
                </InputFormWrap>
                <br />
                <button onClick={submit}>회원가입</button>
            </form>
        </div>
    )
}

export default SignUp


const InputFormWrap = styled.div<{check:any}>`
    position: relative;
    width : 130px;

    input {
        width: 100%;
        padding: 12px 4px 8px 12px;
        border-radius: 4px;
        border-color: #eee;
        color : #48484A;
        font-size : 12px;
        border-width: 1px;
        border-style: solid;

    }
    input:focus + label {
        top : 0;
        left : 8px;
        transform : scale(.7);
        color : #0F9485;
    }
    input + label {
        cursor: text;
        position: absolute;
        top: ${props => props.check.length > 0 ? "0": "12px"};
        left : ${props => props.check.length > 0 ? "8px": "12px"}; 
        color : ${props=> props.check.length > 0 ? "#0F9485" : "#969696" };
        text-align: left;
        font-weight : bold;
        font-size : 12px;
        transform: scale(${props=> props.check.length > 0 ? .7 : 1 }); 
        transition: scale .6s cubic-bezier(0.075, 0.82, 0.165, 1), top .6s cubic-bezier(0.075, 0.82, 0.165, 1) ;
    };
    input:read-only + label {
        left: 0px;
    }

    label.duplicate-check {
        position: absolute;
        top : 50%;
        right : -12px;
        transform: translateY(-50%);
    }
    //focus
    
/* 
    //not placeholder-shown
    input + label {
        top : 0;
        left : 8px;
        transform : scale(.7);
        color : #0F9485;
    } */
`