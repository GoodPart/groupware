import React, {  ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components'

import { Link } from 'react-router-dom';

import * as InputForm from '../components/styledComponents/InputStyled';
import * as ButtonForm from '../components/styledComponents/ButtonStyled'
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
                <InputForm.InputFormWrap check={form.userId}>
                    <input type="text" id='userId' name='userId' 
                    onChange={onChange} 
                    value={form.userId}
                    />
                    <label htmlFor='userId'>ID</label>
                </InputForm.InputFormWrap>
                <br />

                <InputForm.InputFormWrap check={form.userPw}>
                    <input type="password" id='userPw' name='userPw' 
                        onChange={onChange}
                        value={form.userPw}
                    />
                    <label htmlFor='userPw'>Password</label>
                </InputForm.InputFormWrap>
                <br />
                <ButtonForm.SubmitBtn type='button' onClick={onSubmit}>Sign In</ButtonForm.SubmitBtn>
            </form>
            <br />
            <div>Don't have an account? <Link style={{color : "#0F9485", textDecoration : "none", fontWeight : "bold"}} to={'/signup'}>Sign Up</Link></div>
        </div>
    )
}

export default Signin

