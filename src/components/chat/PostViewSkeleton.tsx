import React from 'react'
import styled from 'styled-components'

const Skeleton = styled.div`
    background-color: #fff;
    list-style: none;
    padding: 32px;
    margin-bottom: 16px;
    box-shadow: 4px 4px 10px 0px rgba(0,0,0,0.1);
    border-radius: 10px;

    .chat-item__header {
        display: flex;
        align-items: center;
    }
    .header__thumbnail {
        position: relative;
        width : 40px;
        height: 40px;
        border-radius: 25px;
        background-color: coral;
        margin-right: 8px;
    }
    .header__thumbnail span {
        position: absolute;
        top: 50%;
        left : 50%;
        transform: translate(-50%, -50%);
    }

    .header__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .header__info .info__user-name {
        width : 100px;
        height: 16px;
        background-color: #f1f1f1;
    }
    .header__info .info__create-at {
        margin-top: 8px;
        width : 80px;
        height: 12px;
        background-color: #f1f1f1;
    }
    .chat-item__desc {
        
        background-color: #f1f1f1;
        border-radius: 10px;
        padding : 16px;
        margin-top: 24px;
    }
`



export default function PostViewSkeleton(count:any) {
  return (
    
    <Skeleton>
        <div className='chat-item'>
            <div className="chat-item__header">
                <div className="header__thumbnail">
                    <span></span>
                </div>

                <div className="header__info" >
                    <div className="info__user-name"></div>
                    <div className="info__create-at"></div>
                </div>

            </div>
            <div className="chat-item__desc" >
            </div>
            <div className="chat-item__emotions"></div>
        </div>
    </Skeleton>
  )
}
