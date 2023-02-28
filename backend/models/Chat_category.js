const mongoose = require('mongoose');

/*
    category_name : 카테고리 이름
    class_no : 카테고리 분류코드 // 10단위
*/

const chatCategorySchema = mongoose.Schema({
    category_name : {
        type : String
    },
    class_no : {
        type : Number
    }
});

const ChatCategory = mongoose.model('Chatcategory', chatCategorySchema)
module.exports = {ChatCategory}