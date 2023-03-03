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
    },
    post_no : {
        type : Number
    }
});

chatCategorySchema.methods.makePostNumber = function(ele, cb) {
    const {post_no,category_name, class_no} = ele;

    const newId = post_no + 1

    const _result = {
        post_no : newId,
        category_name : category_name,
        class_no : class_no
    }
    cb(null, _result)
    
    
}

const ChatCategory = mongoose.model('Chatcategory', chatCategorySchema)
module.exports = {ChatCategory}