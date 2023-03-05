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
                <input type="button" onClick={onSubmit} disabled={auth ? false : true} value='저장'  />
        </div>
    )
}

export default CommentEdit