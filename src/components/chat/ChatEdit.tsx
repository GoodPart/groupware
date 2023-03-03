import { ChangeEvent, ChangeEventHandler } from "react"

type EventType = {
    onChange:any,
    onChangeValueTitle:any,
    handleSetTab:any,
    textValue:any,
    onSubmit:any,
    titleValue:any
}


function ChatEdit({onChange,onChangeValueTitle, handleSetTab, textValue,onSubmit,titleValue}:EventType) {
    return (
        <div style={{border : '1px solid #333', borderRadius : '3px'}}>
            <h3>글쓰기</h3>
            <div>
                <span>제목</span>
                <input
                value={titleValue}
                onChange={onChangeValueTitle}
                placeholder="제목을 입력하세요."
             />
            </div>
            
            <div>
                <textarea 
                name=""
                id=""
                placeholder="텍스트를 입력하세요."
                value={textValue}
                onChange={onChange}
                onKeyDown={handleSetTab}
                style={{resize : 'none', width : '100%', height : '100px'}}
                 ></textarea>
                 <button type="button" onClick={onSubmit}>저장</button>
            </div>
        </div>
    )
}

export default ChatEdit