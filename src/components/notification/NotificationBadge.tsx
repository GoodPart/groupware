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
        position: relative;
        cursor : pointer;

    };
    input + label div {
    }
    input + label span {
        display: flex;
        align-self: center;
        justify-content: center;    
        line-height: 14px;
        font-size : 12px;
        font-weight : normal;
        color : #fff;
        font-weight : '700';

    };
`;


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
                                    <div style={{position :"absolute", top : 0, right : 0,backgroundColor:badge.bgColor, color : badge.txtColor, width: '12px', height:'12px', borderRadius : '12px', }}>
                                        <span>{not_checked.length}</span>
                                    </div>
                                ) : 
                                <></>
                            }
                            <FontAwesomeIcon icon={faBell}  size="xl"/>
                        </label>
                    </>
                ) : 
                <>loading...</>
            }
            
        </CommentWrap>
    )
}
export default NotificationBadge