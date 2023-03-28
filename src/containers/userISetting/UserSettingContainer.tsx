import React, {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import UserSettingView from '../../components/userSetting/UserSettingView';
import UserSettingIcon from './UserSettingIcon';

export default function UserSettingContainer({authProps, onLogOut}:any) {
    const navigate = useNavigate();

    const [toggleProps, setToggleProps] = useState(false);

    const onToggleHandle = useCallback((e:any)=> {
        let checked = e.currentTarget.checked;
        setToggleProps(checked)
    }, [toggleProps])
    
    return (
        <>
            <UserSettingIcon 
                onToggleHandle={onToggleHandle}
                toggleProps={toggleProps}
            />
            <UserSettingView
                authProps={authProps}
                onLogOut={onLogOut}
                toggleProps={toggleProps}
            />
        </>
    )
}