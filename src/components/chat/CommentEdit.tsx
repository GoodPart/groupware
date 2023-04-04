import { ChangeEvent, ChangeEventHandler } from "react"
import styled from "styled-components";


const SubmitStyle = styled.input<{textLength:any}>`
    width: 130px;
    padding: 8px 0;
    pointer-events: ${props => props.textLength <1 ? "none" : "auto"};
    background-color: ${props=> props.textLength < 1 ? "#ccc" : "#0F9485"};
    color : #E5E7EB;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
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
        <div style={{backgroundColor:"#fff", borderRadius:"6px", padding:"16px"}}>

            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <textarea 
                name=""
                id=""
                placeholder={auth ? "코멘트 입력" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
                value={textValue}
                onChange={onChange}
                onKeyDown={handleSetTab}
                style={{resize : 'none', width : 'auto', height : '16px', backgroundColor:"transparent", borderTop : "none", borderLeft : "none", borderRight : "none", borderBottom:"1px solid #ccc",outline:"none", borderRadius:"0", padding:"16px"}}
                    ></textarea>
                <div style={{display :"flex", justifyContent:"end", width : "100%", marginTop : "16px"}}>
                    <SubmitStyle 
                        type="button"
                        onClick={onSubmit}
                        textLength={textValue.length}
                        disabled={auth ? false : true}
                        value='Create comment'  />
                </div>
            </div>
        </div>
    )
}

export default CommentEdit