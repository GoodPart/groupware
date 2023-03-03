import { ChangeEvent, ChangeEventHandler } from "react"

type EventType = {
    onChange:any,
    handleSetTab:any,
    textValue:any,
    onSubmit:any,
}


function CommentEdit({onChange, handleSetTab, textValue,onSubmit}:EventType) {
    return (
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
    )
}

export default CommentEdit