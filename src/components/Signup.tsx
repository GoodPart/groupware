import React,{ChangeEventHandler, MouseEventHandler} from 'react'

type SignProps = {
    onChangeName : ChangeEventHandler,
    onChangeId: ChangeEventHandler,
    onChangePw: ChangeEventHandler,
    onChangePwCF: ChangeEventHandler,
    submit: MouseEventHandler,
    onIdCheck: ()=> void,
    name:string,
    userId : string,
    userPw : string,
    userPwCF :string,
    idCheck : boolean,
}


function SignUp({
    onChangeName,
    onChangeId,
    onChangePw,
    onChangePwCF,
    submit,
    onIdCheck,
    name,
    userId ,
    userPw ,
    userPwCF,
    idCheck 
}:SignProps) {

    return (
        <div>
            <form>
                <label>Name</label>
                <input type="text" value={name} onChange={onChangeName}/><br />
                <label style={idCheck ? {color : 'green'} : {color : 'red'}}>Id</label>
                <input type="text"
                       value={userId}
                       onChange={onChangeId}
                       style={idCheck ? {backgroundColor : 'green'} : {backgroundColor : 'red'}}
                       />
                <button type='button' onClick={onIdCheck}>ID 중복체크</button>
                <br />
                <label>pw</label>
                <input type="text" value={userPw} onChange={onChangePw}/><br />
                <label>pw cf</label>
                <input type="text" value={userPwCF} onChange={onChangePwCF}/>
                <br />
                <button onClick={submit}>회원가입</button>
            </form>
        </div>
    )
}

export default SignUp