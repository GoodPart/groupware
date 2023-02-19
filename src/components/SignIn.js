import React,{useState} from 'react'

function SignIn({
    onChangeName,
    onChangeId,
    onChangePw,
    onChangePwCF,
    submit,
    onIdCheck,
    useStateData,
}) {

    return (
        <div>
            <form>
                <label>Name</label>
                <input type="text" value={useStateData.name} onChange={onChangeName}/><br />
                <label style={useStateData.idCheck ? {color : 'green'} : {color : 'red'}}>Id</label>
                <input type="text"
                       value={useStateData.userId}
                       onChange={onChangeId}
                       style={useStateData.idCheck ? {backgroundColor : 'green'} : {backgroundColor : 'red'}}
                       />
                <button type='button' onClick={onIdCheck}>ID 중복체크</button>
                <br />
                <label>pw</label>
                <input type="text" value={useStateData.userPw} onChange={onChangePw}/><br />
                <label>pw cf</label>
                <input type="text" value={useStateData.userPwCF} onChange={onChangePwCF}/>
                <br />
                <button onClick={submit}>회원가입</button>
            </form>
        </div>
    )
}

export default SignIn