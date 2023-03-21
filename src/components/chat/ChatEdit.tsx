
type EventType = {
    onChange:any,
    onChangeValueTitle:any,
    handleSetTab:any,
    textValue:any,
    onSubmit:any,
    titleValue:any,
    auth:boolean
}


function ChatEdit({onChange,onChangeValueTitle, handleSetTab, textValue,onSubmit,titleValue, auth}:EventType) {
    return (
        <div style={{backgroundColor:"#fff", borderRadius:"10px", padding:"16px", boxShadow: "4px 4px 10px 0px rgba(0,0,0,0.1)"}}>
            {/* <div>
                <span>제목</span>
                <input
                value={titleValue}
                onChange={onChangeValueTitle}
                placeholder={auth ? "텍스트를 입력하세요" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
             />
            </div> */}
            
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <textarea 
                name=""
                id=""
                placeholder={auth ? "텍스트를 입력하세요" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
                value={textValue}
                onChange={onChange}
                onKeyDown={handleSetTab}
                style={{resize : 'none', width : '84%', height : '100px', backgroundColor:"#f1f1f1", border:"none",outline:"none", borderRadius:"10px", padding:"16px"}}
                 ></textarea>
                 <input type="button" onClick={onSubmit} disabled={auth ? false : true} style={{backgroundColor:"coral", border : "none", borderRadius : "8px", fontWeight:"bold", cursor:"pointer"}} value='저장' />
            </div>
        </div>
    )
}

export default ChatEdit