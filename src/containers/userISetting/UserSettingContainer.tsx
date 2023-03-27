import React, {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import UserSettingView from '../../components/userSetting/UserSettingView';
import UserSettingIcon from './UserSettingIcon';

export default function UserSettingContainer() {
    const navigate = useNavigate();

    const [toggleProps, setToggleProps] = useState(false);

    const onToggleHandle = useCallback((e:any)=> {
        let checked = e.currentTarget.checked;
        console.log(checked)
        setToggleProps(checked)
    }, [toggleProps])
    
    return (
        <>
            <UserSettingIcon 
                onToggleHandle={onToggleHandle}
                toggleProps={toggleProps}
            />
            <UserSettingView />
        </>
    )
}