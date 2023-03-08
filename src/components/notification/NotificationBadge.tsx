import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Badge({data, notCheckLength}:any) {
    return (
        <div style={{backgroundColor:data.bgColor, color : data.txtColor, width: '16px', height:'16px', borderRadius : '16px', textAlign : 'center', fontWeight : '700'}}>
            {notCheckLength}
        </div>
    )
}

//알림을 확인하면 아래 기능이 수행되야함.

// 알림 확인시 뱃지 숫자 수정
// 모두 확인했다면 not_checked.find false로 변경하여 빨간 풍선 안보이게 하기.


function NotificationBadge({badge, not_checked}:any) {
    return (
        <div>
            {
                not_checked.find ? 
                <Badge 
                    data={badge}
                    notCheckLength={not_checked.length}
                />
                :
                false

            }
            <FontAwesomeIcon icon={faEnvelope}  />
        </div>
    )
}
export default NotificationBadge