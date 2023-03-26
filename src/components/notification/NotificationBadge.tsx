import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const CommentWrap = styled.div`
    display: flex;
    align-self: center;
    input {
        display : none;
    };
    input + label {
        cursor : pointer
    };
    input + label span {
        font-size : 16px;
        font-weight : normal;
        color : #777;
        margin : 0 8px;
    };
`;

function Badge({fontColor, bgColor, badgeContent, notificationOnToggle}:any) {
    return (
        <>
            <input type="checkbox" id="notification" />
            <label htmlFor='notification'>
                <div style={{backgroundColor:bgColor, color : fontColor, width: '16px', height:'16px', borderRadius : '16px', textAlign : 'center', fontWeight : '700'}}>
                    {badgeContent}
                </div>
            </label>
        </>
       
    )
}

//알림을 확인하면 아래 기능이 수행되야함.

// 알림 확인시 뱃지 숫자 수정
// 모두 확인했다면 not_checked.find false로 변경하여 빨간 풍선 안보이게 하기.


function NotificationBadge({badge, not_checked, notificationOnToggle}:any) {
    return (
        <CommentWrap>
            {
                not_checked ? 
                (
                    <>
                        <input type="checkbox" id="notification" onChange={(e)=> notificationOnToggle(e)} />
                        <label htmlFor='notification'>
                            {
                                not_checked.find ? (
                                    <div style={{backgroundColor:badge.bgColor, color : badge.txtColor, width: '16px', height:'16px', borderRadius : '16px', textAlign : 'center', fontWeight : '700'}}>
                                        {not_checked.length}
                                    </div>
                                ) : 
                                <></>
                            }
                            <FontAwesomeIcon icon={faBell}  />
                        </label>
                    </>
                ) : 
                <>loading...</>
            }
            
        </CommentWrap>
    )
}
export default NotificationBadge