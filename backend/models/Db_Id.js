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


dbIdSchema.methods.makeEmployeeNumber = function(ele, cb) {
    const {category, id} = ele;

    const newId = id + 1
    function mkDbId(id) {
        // const maxNumber = 10000000;
        // const maxLength = 8;
        /* 
            조회된 id값을 받았기 때문에 다음 id값을 부여하기위해 +1
        */
        
        if(id <= 9) {
            return `00000` + id
        }else if (id <= 99) {
            return `0000` + id
        }else if (id <= 999) {
            return `000` + id
        }else if (id <= 9999) {
            return `00` + id
        }else if (id <= 99999) {
            return `0` + id
        }else if (id <= 99999) {
            return `` + id
        }
    };

    const _result = {
        newId : newId,
        mkdId : mkDbId(newId)
    }
    cb(null, _result)
    
    
}

const DbId = mongoose.model('DBID', dbIdSchema);
module.exports = {DbId};