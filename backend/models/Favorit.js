const mongoose = require('mongoose');

/*
    post_id : 포스트의 _id값,
    user_id : 유저의 아이디,
    favorit : 좋아요 여부

*/

const favoritSchema = mongoose.Schema({
    post_id :{
        type : String
    },
    user_id : {
        type : String
    },
});

const Favorit = mongoose.model('Favorit', favoritSchema);
module.exports = {Favorit} 