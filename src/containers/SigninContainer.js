import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { signInAction, duplicationCheck } from '../modules/sign';
import SignIn from "../components/SignIn";


function SigninContainer () {

    const data = useSelector((RootState)=> RootState.sign);
    const dispatch = useDispatch();

    // console.log(data.idCheck);

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [idCheck, setIdCheck] = useState(data.idCheck);
    const [userPw, setUserPw] = useState('');
    const [userPwCF, setUserPwCF] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeId = (e) => {
        setUserId(e.target.value);
    }
    const onIdCheck = (e) => {
        dispatch(duplicationCheck({userId : userId}))
        .then(res=> {
            setIdCheck(res.payload.success)
            alert(res.payload.message)
        })

    }
    const onChangePw = (e) => {
        setUserPw(e.target.value);
    }
    const onChangePwCF = (e) => {
        setUserPwCF(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        if(userPw !== userPwCF) {
            return alert('입력한 비밀번호가 다르다.')
        }

        if(idCheck) {
            let infos = {
                name,
                userId,
                userPw,
                userPwCF
            }
    
            dispatch(signInAction(infos));
        }else {
            alert(`아이디 중복 체크를 확인하세요.`)
        }

        
    }

    

    return (
        <SignIn
            onChangeName={onChangeName}
            onChangeId={onChangeId}
            onChangePw={onChangePw}
            onChangePwCF={onChangePwCF}
            submit={submit}
            onIdCheck={onIdCheck}
            useStateData={
                {name, userId, userPw, userPwCF, idCheck}
            }
            // userName={userName}
            // userId={userId}
            // userPw={userPw}
            // userPwCF={userPwCF}

         />
    )
}
export default SigninContainer;