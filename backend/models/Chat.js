const mongoose = require('mongoose');

/*
    post_no : 게시글 번호 -> dbid에서 관리
    post_title : 제목
    post_desc : 내용
    post_comment_count : 댓글수
    post_comment_code : 댓글 코드
    post_create_date : 작성일
    post_edite_date : 수정일
    userId : 유저 아이디
    favorit_count : 좋아요
    class_no : 카테고리 분류코드 // 10단위로
*/

const chatSchema = mongoose.Schema({
    post_no : {
        type : Number,
    },
    post_title : {
        type : String,
        maxLength : 20
    },
    post_desc : {
        type : String,
        maxLength : 240
    },
    post_comment_count : {
        type : Number,
    },
    post_comment_code : {
        type : Number
    },
    post_create_data : {
        type : Date,
    },
    post_edite_date : {
        type : Date,
    },
    favorit_count : {
        type : Number
    },
    class_no : {
        type : Number
    }
})

chatSchema.pre('save', function(next) {
    var chat = this;
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = {Chat};