import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Signup from './signUp';
import SignIn from './signIn';
import Users from './Users';

function RouteArea () {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/signin' element={ <SignIn />} />
            <Route path='/users' element={ <Users />} />
        </Routes>
    )
}

export default RouteArea