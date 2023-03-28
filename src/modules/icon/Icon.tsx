import React from "react";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SIZES = ["xs", "sm", "lg", "2x", "3x", "5x", "7x", "10x"];

type IconType = {
    fa_name : string
}

function Icon({icon, style}:any) {
    return (
        <FontAwesomeIcon 
            icon={icon}
            style={style} 
         />
    );
  }
  
  export default Icon;
  