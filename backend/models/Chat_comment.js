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
        type : String // _id
    },
    post_comment_desc : {
        type : String,
        maxLength : 240
    },
    post_comment_create_date : {
        type : Date
    },
    post_comment_update_date : {
        type : Date
    },
    userId : {
        type : String
    }
});

const chatRecomentSchema = mongoose.Schema({
    post_comment_code : {
        type : String // 게시글 코드
    },
    comment_code : {
        type : String // 댓글 코드
    },
    re_comment_desc : {
        type : String,
        maxLength : 240
    },
    re_comment_create_date : {
        type : Date
    },
    re_comment_update_date : {
        type : Date
    },
    to : {
        type : String
    },
    from : {
        type : String
    }
})


const ChatComment = mongoose.model('ChatComment', chatCommentSchema)
const ChatRecoment = mongoose.model('ChatRecoment', chatRecomentSchema)
module.exports = {ChatComment, ChatRecoment}