import React from 'react';

import styled from 'styled-components'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown as solidfaCaretDown } from "@fortawesome/free-solid-svg-icons";

const IconWrap = styled.div<{checked:boolean}>`
    input {
        display: none;
    }
    input + label svg{
        transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1) .1s;
    }
    input:checked + label svg{
        transform: rotate(180deg)
    }
`

export default function UserSettingIcon({onToggleHandle, toggleProps}:any) {
    
    return (
        <IconWrap 
            checked={toggleProps}
        >
            <input id="setting" type="checkbox" onChange={(e)=> onToggleHandle(e)} checked={toggleProps}/>
            <label htmlFor="setting">
                <FontAwesomeIcon
                    icon={solidfaCaretDown}
                    style={{color: "#666"}} 
                />
            </label>
        </IconWrap>
    )
}