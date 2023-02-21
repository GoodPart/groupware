import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';



function Header() {
    return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>about</Link>
      </li>
      <li>
        <Link to='/signup'>가입하기</Link>
      </li>
      <li>
        <Link to='/signin'>로그인</Link>
      </li>
      <li>
        <Link to='/users'>users</Link>
      </li>
    </ul>
    )
}

export default Header