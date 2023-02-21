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
        <Link to='/signup'>signup</Link>
      </li>
      <li>
        <Link to='/signin'>signin</Link>
      </li>
      <li>
        <Link to='/users'>users</Link>
      </li>
    </ul>
    )
}

export default Header