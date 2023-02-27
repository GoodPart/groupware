const mongoose = require('mongoose');

/*
    post_comment_code : 댓글코드
    post_sort_no : 정렬번호
    post_comment_desc : 내용
    post_comment_create_date : 작성일
    userId : 유저 아이디
*/

const chatCommentSchema = mongoose.Schema({
    post_comment_code : {
        type : Number
    },
    post_sort_no : {
        type : Number
    },
    post_comment_desc : {
        type : String,
        maxLength : 240
    },
    post_comment_create_date : {
        type : Date
    },
    userId : {
        type : String
    }
});

const ChatComment = mongoose.model('ChatComment', chatCommentSchema)
module.exports = {ChatComment}