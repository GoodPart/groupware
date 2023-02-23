import React,{ChangeEventHandler, MouseEventHandler} from 'react'

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

    return (
        <div>
            <form>
                <label >사원코드</label>
                <input type="text" value={userNo.userNo} readOnly/>
                {/* <button type='button' onClick={getuserNo}>사원코드 조회</button> */}
                <br />
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