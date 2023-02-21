const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

/*
userNo : 사원번호
name: 이름
ssn : 주민번호
email : 이메일
phn : 전화번호
salary : 급여
empDate : 입사일
dptDate : 퇴사일
stateMent : 재직상태
gender : 성별

*/

const userSchema = mongoose.Schema({
    userNo : {
        type : String,
    },
    name : {
        type : String,
        maxLength : 50
    },
    userId : {
        type : String,
        maxLength : 14
    },
    userPw : {
        type : String,
        minLength : 5
    },
    ssn : {
        type : Number,
        maxLength : 14
    },
    email : {
        type : String,
    },
    phn : {
        type : Number,
    },
    salary : {
        type : Number,
    },
    empDate : {
        type : Date,
    },
    dptDate : {
        type : Date
    },
    stateMent : {
        type : Number
    },
    gender : {
        type : String
    },
})



// 비밀번호 암호화
userSchema.pre('save',function(next) {
    var user = this;

    if(user.isModified('userPw')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            if(err) return next(err);
            bcrypt.hash(user.userPw,salt, (err, hash) => {
                if(err) return next(err);
                user.userPw = hash;
                next()
            })
        })
    }else {
        next();
    }
})

// 비밀번호 복호화
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword,this.userPw, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}
// jwt 암호화
userSchema.methods.generateToken = function(cb) {
    let user = this;

    //user._id : this는 db에서 조회된 테이블.
    //dbdml _id를 조회한것.
    let token = jwt.sign(user._id.toHexString(), 'screatToken');

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user);
    })
}


const User = mongoose.model('User', userSchema)
module.exports = {User}