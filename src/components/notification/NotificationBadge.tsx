import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Badge({data}:any) {
    return (
        <div style={{backgroundColor:data.bgColor, color : data.txtColor}}></div>
    )
}

function NotificationBadge({badge}:any) {
    // console.log(test)
    return (
        <div>
            <Badge 
                data={badge}
                // is_checked={storeData.is_checked}
            />
            <FontAwesomeIcon icon={faEnvelope}  />
        </div>
    )
}
export default NotificationBadge