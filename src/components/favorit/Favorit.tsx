import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularFaHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";


const CommentWrap = styled.div`
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

function Favorit({checkAuth,input_id,checkFavorit,favoritCount,onChange}:any) {
    return (
    <CommentWrap>
        <input id={input_id} type="checkbox" onChange={(e)=> onChange(e)}  checked={checkFavorit} disabled={!checkAuth} />
        <label htmlFor={input_id}>
        <FontAwesomeIcon 
            icon={checkFavorit ? solidFaHeart :regularFaHeart}
            shake={checkFavorit}  
            style={checkFavorit ? {color: "#ff6b6b", transition : ".3s ease-in-out"} : {color : "#888"}} 
        />
        <span >{favoritCount}</span>
        </label>
    </CommentWrap>
    )
}

export default Favorit