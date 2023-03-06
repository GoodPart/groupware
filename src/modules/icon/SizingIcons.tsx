import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SIZES = ["xs", "sm", "lg", "2x", "3x", "5x", "7x", "10x"];

type IconType = {
    fa_name : string
}

function SizingIcons({fa_name}:IconType) {
    return (
        <FontAwesomeIcon icon={faEnvelope}  />
    );
  }
  
  export default SizingIcons;
  