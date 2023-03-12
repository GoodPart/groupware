
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
        <div style={{border : '1px solid #333', borderRadius : '3px'}}>
            <h3>글쓰기</h3>
            <div>
                <span>제목</span>
                <input
                value={titleValue}
                onChange={onChangeValueTitle}
                placeholder={auth ? "텍스트를 입력하세요" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
             />
            </div>
            
            <div>
                <textarea 
                name=""
                id=""
                placeholder={auth ? "텍스트를 입력하세요" : "로그인이 필요합니다."}
                readOnly={auth ? false : true}
                value={textValue}
                onChange={onChange}
                onKeyDown={handleSetTab}
                style={{resize : 'none', width : '100%', height : '100px'}}
                 ></textarea>
                 <input type="button" onClick={onSubmit} disabled={auth ? false : true} value='저장' />
            </div>
        </div>
    )
}

export default ChatEdit