const mongoose = require('mongoose');


/* 
category : 사원번호, 문서번호, 파일번호 등등...
id : category에 해당하는 번호

해당 아이디값은 감가될 수 없다.


category : ['empNo', 'docNo', 'fileNo]

*/

const dbIdSchema = mongoose.Schema({
    category : {
        type : String,
    },
    id : {
        type : Number
    },
});

const DbId = mongoose.model('DBID', dbIdSchema);
module.exports = {DbId};