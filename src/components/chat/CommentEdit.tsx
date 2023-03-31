import { ChangeEvent, ChangeEventHandler } from "react"

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
                placeholder={auth ? "텍스트를 입력하세요" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
                value={textValue}
                onChange={onChange}
                onKeyDown={handleSetTab}
                style={{resize : 'none', width : 'auto', height : '16px', backgroundColor:"transparent", borderTop : "none", borderLeft : "none", borderRight : "none", borderBottom:"1px solid red",outline:"none", borderRadius:"10px", padding:"16px"}}
                    ></textarea>
                <div style={{display :"flex", justifyContent:"end", width : "100%", marginTop : "16px"}}>
                    <input 
                        type="button"
                        onClick={onSubmit}
                        disabled={auth ? false : true}
                        style={{backgroundColor:"#0F9485", color : "#E5E7EB", border : "none", width : "130px", padding : "8px 0", borderRadius : "4px", fontWeight:"bold", cursor:"pointer"}}
                        value='Create comment'  />
                </div>
            </div>
        </div>
    )
}

export default CommentEdit