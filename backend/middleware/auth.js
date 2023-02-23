const {User} = require("../models/User");

let auth = (req,res, next) => {
    //인증 처리 장소

    //클라이언트에서 쿠키 토큰 가져오기
    let token = req.cookies.x_auth;
    console.log('token ->', token)
    
    //토큰 복호화 후, 유저 찾기
    User.findByToken(token, (err, user)=> {
        if(err) throw err;
        if(!user) return res.json({
            isAuth : false,
            error : true
        })
        console.log('user ->',user)

        //다음 콜백 req에서 조회시 아래 녀석들을 찾을 수 있다
        req.token = token;
        req.user = user;

        //미들웨어에서 다음 콜백으로 진행하기위해 next()
        next()
    })


    //유저 있으면 인증

    //유저가 없으면 인증x
}

module.exports = {auth}