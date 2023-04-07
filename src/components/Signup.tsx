import React,{ChangeEventHandler, MouseEventHandler} from 'react'
// import styled from 'styled-components'

import Icon from '../modules/icon/Icon'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import * as InputForm from '../components/styledComponents/InputStyled';
import * as ButtonForm from '../components/styledComponents/ButtonStyled'

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

    console.log(userPw === userPwCF)

    return (
        <div style={{padding : "36px 16px", width : "100%"}}>
            <form style={{width : "100%"}}>
                <InputForm.InputFormWrap check={userNo.userNo}>
                    {
                        userNo ? (
                            <input type="text" value={userNo.userNo} readOnly/>
                        ) : 
                        (
                            <></>
                        )
                    }
                    <label>Employee code</label>
                </InputForm.InputFormWrap>
                
                {/* <button type='button' onClick={getuserNo}>사원코드 조회</button> */}
                <br />
                <InputForm.InputFormWrap check={name}>
                    <input id="name" type="text"  onChange={onChangeName}/>
                    <label htmlFor='name'>Name</label>
                </InputForm.InputFormWrap>
                <br />

                <InputForm.InputFormWrap check={userId}>
                    <input id='id' type="text"
                        
                        onChange={onChangeId}
                        onBlur={onIdCheck}
                        />
                    <label htmlFor='id'>Id</label>
                    <label className='duplicate-check'><Icon icon={faCheck} style={idCheck ? {color : "#0F9485" } : {color : "red"} }/></label>
                </InputForm.InputFormWrap>
                <br />

                {/* <button type='button' onClick={onIdCheck}>{idCheck ? "done" : "not"}</button> */}
                <InputForm.InputFormWrap check={userPw}>
                    <input id='password' type="password" onChange={onChangePw}/>
                    <label htmlFor='password'>Password</label>
                </InputForm.InputFormWrap>
                <br />

                <InputForm.InputFormWrap check={userPwCF}>
                    <input id='password-confirm' type="password" onChange={onChangePwCF}/>
                    <label htmlFor='password-confirm'>Password confirm</label>
                </InputForm.InputFormWrap>
                <br />
                <ButtonForm.SubmitBtn disabled={userId && idCheck && userPw.length !== 0 && userPwCF.length !== 0 && userPw == userPwCF   ? false : true}  onClick={submit}>Sign Up</ButtonForm.SubmitBtn>
            </form>
        </div>
    )
}

export default SignUp

