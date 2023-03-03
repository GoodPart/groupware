import React,{ChangeEvent, FormEvent, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { registerRequest,duplicationCheck } from '../modules/register';
import SignUp from "../components/Signup";

import request from '../utils/axios';


function SignupContainer (props:any) {
    const data = useSelector((state:RootState)=> state.register);

    // console.log(data.empNo)
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [idCheck, setIdCheck] = useState(data.idCheck);
    const [userPw, setUserPw] = useState('');
    const [userPwCF, setUserPwCF] = useState('');
    const [userNo, setUserNo] = useState({
        id : 0,
        userNo : '',
        category : ''
    });

    // useSelector와 useState를 사용하면 실행 시점에 문제가 있어 store의 값을 정상적으로 useState가 전달받지 못함.
    // useState : 컴포넌트가 렌더링 되기전 실행
    // useSelector : 컴포넌트가 렌더링된 후 실행
    useEffect(()=> {
        request("post",'/api/dbid/getdbid', {category : 'empNo'})
        .then(res=> {
            console.log(res)
            setUserNo({
                id : res.result.newId,
                userNo : res.result.mkdId,
                category : 'empNo'
            });
        })

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
    
    const updateDbId = ()=> {
        request("post", '/api/dbid/updatedbid', userNo)
        .then(res=> {
            console.log(res.result)
        })
    }
   
    

    // const getuserNo = () => {
        // dispatch(insertEmployeeId('empNo'))
    //     setUserNo(data.empNo)
    //     console.log(userNo)
    // }

    const submit = (e:FormEvent) => {
        e.preventDefault();

        if(userPw !== userPwCF) {
            return alert('입력한 비밀번호가 다르다.')
        }

        if(idCheck) {
            let infos = {
                userNo : userNo.userNo,
                name : name,
                userId : userId,
                userPw : userPw,
                userPwCF: userPwCF
            }
    
            dispatch(registerRequest(infos));
            updateDbId();

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
            // getuserNo={getuserNo}
            name={name}
            userId={userId}
            userPw={userPw}
            userPwCF={userPwCF}
            idCheck={idCheck}
            userNo={userNo}
         />
    )
}
export default SignupContainer;