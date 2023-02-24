import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Signup from './signUp';
import SignIn from './signIn';
import Users from './Users';
import MyPage from './MyPage';

import Auth from '../hoc/Auth';

function RouteArea () {
    const UsersPage:React.FunctionComponent = Auth(Users, true);
    const LoginPage:React.FunctionComponent = Auth(SignIn, false);
    const _MyPage:React.FunctionComponent = Auth(MyPage, true)
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/signin' element={ <LoginPage />} />
            <Route path='/users' element={ <UsersPage /> } />
            <Route path='/mypage/:user' element={ <_MyPage /> } />
        </Routes>
    )
}

export default RouteArea