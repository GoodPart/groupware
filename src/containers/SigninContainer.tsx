import React,{ChangeEvent, FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { registerRequest,duplicationCheck } from '../modules/register';
import SignIn from "../components/SignIn";


function SigninContainer (props:any) {

    console.log('props',props)
    // const navigate = useNavigate();
    const navigate = useNavigate();

    const data = useSelector((state:RootState)=> state.register);
    const dispatch = useDispatch();

    // console.log('data->',data)

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [idCheck, setIdCheck] = useState(false);
    const [userPw, setUserPw] = useState('');
    const [userPwCF, setUserPwCF] = useState('');

    const onChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }
    const onChangeId = (e:ChangeEvent<HTMLInputElement>) => {
        setUserId(e.currentTarget.value);
    }
    const onIdCheck = () => {
        dispatch(duplicationCheck(userId))
         .then((res:any)=> {
            console.log(res)

            if(res.payload.success) {
                setIdCheck(data.success)
                alert(`${res.payload.message}`)
                
            }else {
                setIdCheck(data.success)
                alert(`${res.payload.message}`)

            }

         })
    }
    const onChangePw = (e:ChangeEvent<HTMLInputElement>) => {
        setUserPw(e.currentTarget.value);
    }
    const onChangePwCF = (e:ChangeEvent<HTMLInputElement>) => {
        setUserPwCF(e.currentTarget.value);
    }

    const submit = (e:FormEvent) => {
        e.preventDefault();

        if(userPw !== userPwCF) {
            return alert('입력한 비밀번호가 다르다.')
        }

        if(idCheck) {
            let infos = {
                name : name,
                userId : userId,
                userPw : userPw,
                userPwCF: userPwCF
            }
    
            dispatch(registerRequest(infos));

            setName('');
            setIdCheck(false);
            setUserId('');
            setUserPw('');
            setUserPwCF('');

            navigate("/users")

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
            name={name}
            userId={userId}
            userPw={userPw}
            userPwCF={userPwCF}
            idCheck={idCheck}
            // useStateData={
            //     {name, userId, userPw, userPwCF, idCheck}
            // }
            // userName={userName}
            // userId={userId}
            // userPw={userPw}
            // userPwCF={userPwCF}

         />
    )
}
export default SigninContainer;