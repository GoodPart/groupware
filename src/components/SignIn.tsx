import React, {  ChangeEventHandler, FormEventHandler } from 'react';

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
        <div>
            <form action="submit" onSubmit={onSubmit}>
                <label htmlFor='userId'>ID</label>
                <input type="text" id='userId' name='userId' placeholder='ID' 
                onChange={onChange} 
                value={form.userId}
                />
                <br />
                <label htmlFor='userPw'>PW</label>
                <input type="password" id='userPw' name='userPw' placeholder='PW'
                onChange={onChange}
                value={form.userPw}
                />
                <br />
                <button type='button' onClick={onSubmit}>로그인</button>
            </form>
        </div>
    )
}

export default Signin