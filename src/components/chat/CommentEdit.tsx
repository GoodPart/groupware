import { ChangeEvent, ChangeEventHandler } from "react"
import styled from "styled-components";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";




const TextArea = styled.textarea`
    position: relative;
    resize : none;
    width : auto;
    height : 16px; 
    background-color:transparent;
    text-decoration: none;
    border-top : none;
    border-left : none;
    border-right : none;
    border-bottom: 1px solid;
    border-color: #ddd;
    outline:none;
    padding:12px 44px 12px 12px;
    transition: border-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    &::placeholder {
       color : #ccc 
    }
    &:focus {
        border-color: #888;
    }


`
const SubmitStyle = styled.input<{textLength:any}>`
    position: absolute;
    top : 50%;
    right : 12px;
    transform: translateY(-50%);
    width: 20px;
    padding: 2px ;
    pointer-events: ${props => props.textLength <1 ? "none" : "auto"};
    background-color: ${props=> props.textLength < 1 ? "#ccc" : "#0F9485"};
    color : #E5E7EB;
    border: none;
    border-radius: 24px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: ${props => props.textLength < 1 ? "" : "4px 4px 10px -5px rgba(0,0,0,1)"};
    transition: background-color .6s cubic-bezier(0.075, 0.82, 0.165, 1);
`

type EventType = {
    onChange:any,
    handleSetTab:any,
    textValue:any,
    onSubmit:any,
    auth:boolean
}


function CommentEdit({onChange, handleSetTab, textValue,onSubmit, auth}:EventType) {
    return (
        <div style={{backgroundColor:"#fff"}}>

            <div style={{position: "relative",display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <TextArea 
                name=""
                id=""
                placeholder={auth ? "Comment area" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
                value={textValue}
                onChange={onChange}
                onKeyDown={handleSetTab}
                style={{}}
                    ></TextArea>
                <SubmitStyle 
                    type="button"
                    onClick={onSubmit}
                    textLength={textValue.length}
                    disabled={auth ? false : true}
                    value='>'  />
            </div>
        </div>
    )
}

export default CommentEdit