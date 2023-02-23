import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './routers/Home';
import About from './routers/About';
import Signup from './routers/signUp';
import SignIn from './routers/signIn';
import Users from './routers/Users';

// import Auth from './hoc/Auth';


function App() {
  // const SignInPage = Auth(SignIn, null)
  return (
    <BrowserRouter>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>about</Link>
      </li>
      <li>
        <Link to='/signup'>signup</Link>
      </li>
      <li>
        <Link to='/signin'>signin</Link>
      </li>
      <li>
        <Link to='/users'>users</Link>
      </li>
    </ul>
    <hr />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/signin' element={ <SignIn />} />
        <Route path='/users' element={ <Users />} />
        


      </Routes>
    </BrowserRouter>
  );
}

export default App;
