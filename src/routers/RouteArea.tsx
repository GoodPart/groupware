import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Signup from './signUp';
import SignIn from './signIn';
import Users from './Users';
import MyPage from './MyPage';
import RouteChat from './RouteChat';
import ChatPlazaContainer from './RouteChatPlaza'


// import { RootState } from '../modules';
// import { authCheck } from '../modules/auth';
// import { getNotiList } from '../modules/notification';

// import Chat from './'

import Auth from '../hoc/Auth';

function RouteArea () {


    const HomePage:React.FunctionComponent = Auth(Home, null)
    const AboutPage:React.FunctionComponent = Auth(About, null);
    const UsersPage:React.FunctionComponent = Auth(Users, true);
    const LoginPage:React.FunctionComponent = Auth(SignIn, false);
    const ChatPlazaPage:React.FunctionComponent = Auth(ChatPlazaContainer, null);
    const ChatCategoryPage:React.FunctionComponent = Auth(RouteChat, null);
    const MyPage_:React.FunctionComponent = Auth(MyPage, true)

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/signin' element={ <LoginPage />} />
            <Route path='/users' element={ <UsersPage /> } />
            <Route path='/mypage/:user' element={ <MyPage_ /> } />
            <Route path='/chat' element={ <ChatPlazaPage /> } />
            <Route path='/chat/:chatcategory' element={ <ChatCategoryPage /> } />
        </Routes>
    )
}

export default RouteArea