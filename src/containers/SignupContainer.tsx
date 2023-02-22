import React,{ChangeEvent, FormEvent, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { registerRequest,duplicationCheck } from '../modules/register';
import SignUp from "../components/Signup";


function SignupContainer (props:any) {
    const data = useSelector((state:RootState)=> state.register);

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [idCheck, setIdCheck] = useState(data.idCheck);
    const [userPw, setUserPw] = useState('');
    const [userPwCF, setUserPwCF] = useState('');

    // useSelector와 useState를 사용하면 실행 시점에 문제가 있어 store의 값을 정상적으로 useState가 전달받지 못함.
    // useState : 컴포넌트가 렌더링 되기전 실행
    // useSelector : 컴포넌트가 렌더링된 후 실행
    useEffect(()=> {
        setIdCheck(data.idCheck);
    }, [data])

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }
    const onChangeId = (e:ChangeEvent<HTMLInputElement>) => {
        setUserId(e.currentTarget.value);
    }
    const onIdCheck = () => {
        dispatch(duplicationCheck(userId))
        setIdCheck(data.idCheck)
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
        <SignUp
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
         />
    )
}
export default SignupContainer;