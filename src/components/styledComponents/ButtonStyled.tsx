import styled from "styled-components"

export const SubmitBtn = styled.button`
    cursor: pointer;
    width: 100%;
    padding : 16px;
    background-color: #0F9485;
    border : none;
    border-radius: 4px;
    color : #fff;
    font-size : 20px;
    font-weight: bold;


    &:disabled {
        cursor: not-allowed;
        background-color: gray
    }
`