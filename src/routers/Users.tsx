import React,{useEffect, useState} from 'react'
import axios from "axios";





function Signup() {
    useEffect(()=> {
        console.log("useEffect!")
        const getUsers = axios.get("http://localhost:9999/users")
        
        getUsers.then((res)=> {
            console.log(res)
            setUsers(res.data.result)
        })
    },[])

    const [users, setUsers] = useState('');

    return (
        <>
        <h2>AllUsers = { users.length}</h2>
        
        <ul>
            {
                Object.values(users).map((ele:any, index:number)=> {
                    console.log(ele, index)
                    const stify=(element:any)=> {
                        return JSON.stringify(element)
                    }
                    
                    return( <li key={index}>{stify(ele.name)}</li>)
                })
            }
        </ul>
        
        </>
    )
}

export default Signup;