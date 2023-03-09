const mongoose = require('mongoose');
/*
    (MongoDb inner value)_id : 게시글 id 
    receiver_id : 알람 받을 유저
    writer_id : 발생시킨 유저
    post_id : 게시물 id
    noti_desc :  알림 내용
    noti_type : 알림 종류 ['comment', 'reply'] 일단 게시글에 대한 댓글만 사용 대댓은 없고 '@User'로 사용할 예정
    create_at : 알림 생성일자
    isChecked : 알림 확인 유무
*/

const notificationSchema = mongoose.Schema({
    receiver_id : {
        type : String
    },
    writer_id : {
        type : String
    },
    post_id : {
        type : String
    },
    noti_desc : {
        type : String
    },
    noti_type : {
        type : String
    },
    create_at : {
        type : Date
    },
    is_checked : {
        type : Boolean
    }
})

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = {Notification}