const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const {DbId} = require('./Db_Id');

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

// jwt 암호화


const User = mongoose.model('User', userSchema)
module.exports = {User}