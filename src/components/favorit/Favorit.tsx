import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularFaHeart } from "@fortawesome/free-regular-svg-icons";


function Favorit({checkAuth,input_id,checkFavorit,favoritCount,onChange}:any) {
    return (
    <p>
        <input id={input_id} type="checkbox" onChange={(e)=> onChange(e)}  checked={checkFavorit} disabled={!checkAuth} style={{display : "none"}}  />
        <label htmlFor={input_id} style={{cursor:"pointer"}}>
        <FontAwesomeIcon 
            icon={checkFavorit ? solidFaHeart :regularFaHeart}
            shake={checkFavorit}  
            style={checkFavorit ? {color: "#ff6b6b", transition : ".3s ease-in-out"} : {color : "#888"}} 
        />
        <span style={{fontSize : "16px", fontWeight:"normal", color:"#777", margin:"0 8px"}}>{favoritCount}</span>
        </label>
    </p>
    )
}

export default Favorit