const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');

const app = express();
const port = 9999;

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const {auth} = require('./middleware/auth');

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true,
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());



//스키마 불러오기.
const mongoose = require('mongoose');
//유저 스키마
const { User } = require('./models/User');
//dbid 스키마
const { DbId } = require('./models/Db_Id');
// 게시판 스키마
const {Chat} = require('./models/Chat');
// 게시판 코멘트(댓글) 스키마 
const {ChatComment}  = require('./models/Chat_comment');
// 게시판 카테고리 스키마
const {ChatCategory}  = require('./models/Chat_category');
// 알림 스키마
const {Notification} = require('./models/Notification');



//몽고 DB 에러
mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB Conntected"))
.catch(err=> console.log(err))

app.get('/', (req,res)=> {
   res.send('hi too')
})

//모든유저
app.get('/users', (req,res)=> {
    User.find({}, (err, _user)=> {
        if(!_user) {
            return res.json({
                success : false,
                message : "유저가 없습니다"
            })
        }
        return res.status(200).json({
            success : true,
            result : _user
        })
    })
})
// 내정보
app.post('/user/me', (req,res)=> {
    const data = req.body;

    User.findOne({
        userNo : data.userId
    }, (err, result)=> {
        if(err) return res.json({
            success : false,
            message : "해당 유저가 없습니다."
        })
        return res.status(200).json({
            success : true,
            user : result
        })
    })
})



//auth req를 req받아 cb하기전 auth를 들린다.
app.get('/users/auth', auth,(req,res)=> {

    //미들웨어를 통과 =  auth true
    res.status(200).json({
        _id: req.user._id,
        userNo : req.user.userNo,
        name : req.user.name,
        userId : req.user.userId,
        isAuth : true,
        token : req.user.token,
        isAdmin : req.user.role === 0 ? false : true //관리자

    })
});


//회원가입
app.post('/signup', (req,res)=> {
    const getUserData = req.body; // 회원 가입 object


    const user = new User(getUserData);

    user.save((err, ele)=> {
        if(err) return res.json({
            success : false,
            err
        })
        return res.status(200).json({
            success : true,
            user : ele
        })
    })
})

//로그인
app.post('/api/users/login', (req,res)=> {
    const data = req.body; // {userId : '', userPw : ''}

    //아이디 확인
    User.findOne({
        userId : data.userId
    }, (err, user)=> {
        if(!user) {
            return res.json({
                success : false,
                message : "해당 아이디는 존재하지 않습니다."
            })
        }
        //비밀번호 복호화 후 비교
        user.comparePassword(data.userPw, (err, isMatch)=> {
            if(!isMatch) {
                return res.json({
                    success : false,
                    message : "비밀번호가 틀렸습니다."
                })
            }
            
            //맞다면 로그인 유저 db의 '_id' 값을 jwt를 이용해 쿠키 발급.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess : true,
                        token : user._id
                    })
                
            } )
        });
    });

})

//로그 아웃
app.get('/api/users/logout', auth , (req,res)=> {
    User.findOneAndUpdate({
        _id : req.user._id
    }, {token : ""}, (err, user)=>{
        if(err) return res.json({success : false, err})
        return res.status(200).send({
            success : true
        })
    })
})

//회원가입 - 중복 아이디 확인
app.post('/signup/checkid', (req,res)=> {
    const data = req.body; //user id

    console.log(req.body)

    User.findOne({
        userId : data.userId
    }, (err, result)=> {
        if(result) {
            return res.json({
                success : false,
                message : "중복된 아이디입니다."
            })
        }else {

            return res.status(200).json({
                success : true,
                message : "사용 가능한 아이디입니다."
            })
        }
    })
})

// 사용자 제거 - 임시
app.delete('/user/deleteuser', (req,res)=> {
    const data = req.body; //user id

    User.findOne({
        userId : data.userId
    },(err, result)=> {
        if(result) {
            User.findOneAndDelete({
                userId : data.userId
            }, ()=> {
                return res.json({
                    searchId : data.userId,
                    findId : result.userId,
                    message : "해당 아이디를 삭제 했습니다."
                })
            })
            
        }else {

            return res.json({
                searchId : data.userId,
                message : '해당 아이디가 없습니다.',
                err : err
            })
        }
    })
})

//특정 카테고리 조회
app.post('/api/dbid/getdbid', (req,res)=> {
    const data = req.body;

    DbId.findOne({
        category : data.category,
    }, (err, ele)=> {
        if(!ele) res.json({
            success : false,
            err
        })

        ele.makeEmployeeNumber(ele, (err, empNumb)=> {
            return res.status(200).json({
                success : true,
                result : empNumb,
                message : `find '${data.category}' id, id is '${empNumb.mkdId}'`,
            })
           

        })
    })
})


// DbID값 만들기
app.post('/api/dbid/publishid', (req,res)=> {
    const data = req.body;

    console.log(data)
    function mkDbId(category,id) {
        // const maxNumber = 10000000;
        // const maxLength = 8;


        /* 
            조회된 id값을 받았기 때문에 다음 id값을 부여하기위해 +1
        */
        id = id + 1
        
        if(id <= 9) {
            return `${category}_00000` + id
        }else if (id <= 99) {
            return `${category}_0000` + id
        }else if (id <= 999) {
            return `${category}_000` + id
        }else if (id <= 9999) {
            return `${category}_00` + id
        }else if (id <= 99999) {
            return `${category}_0` + id
        }else if (id <= 99999) {
            return `${category}_` + id
        }
    };

    DbId.findOne({
        category : data.category
    }, (err, ele)=> {
        if(!ele) {
            return res.json({
                success : false,
                message : "해당 값은 없습니다."
            })
        }
        
        return res.status(200).json({
            success : true,
            pubId: mkDbId(data.category, data.id)
        })
    })

})

// 새로운 dbid값을 만들때 사용.
app.post('/api/dbid/pushdbid', (req,res)=> {
    const data = req.body;
    const dbid = new DbId(data);
    
    DbId.findOne({
        category : data.category
    }, (err, findCategory) => {
        if(findCategory) {
            return res.json({
                message : `${data.category}는 DB에 이미 있습니다.`
            })
        }

        dbid.save((err, ele)=> {
            if(err) return res.json({
                success : false,
                err
            })
    
            return res.json({
                success : true,
                dbid : ele
            })
        })

    })

    
})
// 
app.post('/api/dbid/updatedbid', (req,res)=> {
    const data = req.body;
    /*
    // req 값.
        {
            category : "watch",
        }
    */
    DbId.findOne({
        category : data.category
    }, (err, findCategory) => {
        console.log(findCategory)
        if(!findCategory) {
            return res.json({
                success : false,
                message : "해당 카테고리는 없습니다."
            })
        }

        DbId.updateOne({category : data.category}, {$set: {id: data.id}}, (err, ele)=> {
            // console.log(ele)
            if(!ele) res.json({
                success : false,
                message : `오류입니다. ${err}`
            })

            return res.status(200).json({
                success : true,
                result : `updated '${data.category}', number ${data.id}`
            })
        })
    })
})


// chat endpoint
// 모든 게시글 조회
app.post('/api/chat/get/chatall', (req, res)=> {
    const data = req.body;
    
    Chat.find({
        userId : data.userId,
    },(err, chatprops)=> {
        if(err) res.json({
            success : false,
            message : '게시글이 존재하지 않습니다.'
        })

        return res.status(200).json({
            success : true,
            message : `게시글을 찾았습니다.`,
            chatprops
        })
    })
})

// 카테고리별 게시판 조회
app.post('/api/chat/getlistbycategory', (req, res)=> {
    const data = req.body;
    
    Chat.find({
        class_no : data.class_no,
    },(err, chatprops)=> {
        if(err) res.json({
            success : false,
            message : '해당 카테고리는 존재하지 않습니다.'
        })

        return res.status(200).json({
            success : true,
            message : `카테고리에 맞는 게시글을 찾았습니다.`,
            chatprops
        })
    })
})
// 게시글 추가 - auth 필요
app.post('/api/chat/createchat', auth, (req,res)=> {
    const data = req.body;

    data.post_create_date = new Date();
    const chat = new Chat(data);

    chat.save((err, ele)=> {
        if(err) return res.json({
            success : false,
            err
        })
        return res.status(200).json({
            success : true,
            message : `정상적으로 등록되었습니다.`,
            payload : ele
        })
    })
})

//모든 카테고리 검색
app.get('/api/chat/get/categoryall', (req,res)=> {
    const data = req.body;
    
    ChatCategory.find({},(err, getData) => {
     
        return res.status(200).json({
            success : true,
            message : "카테고리를 찾았습니다.",
            getData
        })
    })
})

// 카테고리 검색
app.post('/api/chat/get/category', (req,res)=> {
    const data = req.body;
    
    ChatCategory.findOne({
        class_no : data.class_no
    },(err, getData) => {
        if(err) return res.json({
            success : false,
            message : "찾는 카테고리가 없습니다."
        })

        getData.makePostNumber(getData, (err, result)=> {
            console.log(result)
            return res.status(200).json({
                success : true,
                message : "카테고리를 찾았습니다.",
                result
            })
        })

        
    })
})

// 채팅 카테고리 추가하기
app.post('/api/chat/create/category', (req,res)=> {
    const data = req.body;
    const cahtCategory = new ChatCategory(data);

    cahtCategory.save((err, ele)=> {
        if(err) return res.json({
            success : false
        })

        return res.status(200).json({
            success : true,
            message : "카테고리가 정상 등록 되었습니다."
        })
    })

    // ChatCategory
})



//카테고리 업데이트
app.post('/api/chat/update/category', (req,res)=> {
    const data = req.body;
    console.log('update input ->',data)
    ChatCategory.updateOne(
        {
            class_no : data.class_no
        },{$set : {
                post_no : data.post_no,
            }}, (err, updatedComment)=> {
            if(err) res.json({
                success : false,
                err
            })
            return res.status(200).json({
                success : true,
                updatedComment
            })
        }
    )
})

//카테고리 제거
app.delete('/api/chat/delete/category', (req,res)=> {
    
})


//댓글 조회
app.post('/api/chat/get/comment', (req,res)=> {
    const data = req.body;

    ChatComment.find({
        post_comment_code : data._id
    }, (err, find)=> {
        if(err) res.json({
            success : false
        })
        return res.status(200).json({
            success : true,
            find
        })
    })
    // Chat.find

    
})
// 댓글 추가
app.post('/api/chat/create/comment', auth,(req,res)=> {
    let data = req.body;
    
    data.post_comment_create_date = new Date();

    const chatComment = new ChatComment(data);
    
    chatComment.save((err, result)=> {
        if(err) res.json({
            success : false,
            message : "댓글을 등록하지 못했습니다."
        })
        return res.status(200).json({
            success : true,
            message : "댓글 등록 완료",
            result
        })
    })
})
// 댓글 업데이트
app.post('/api/chat/update/comment', auth, (req,res)=> {
    let data = req.body;

    ChatComment.updateOne(
        {
            post_comment_code : data.post_comment_code,
            userId : data.userId,
            _id : data._id
        },{$set : {
                post_comment_desc : data.post_comment_desc,
                post_comment_update_date : new Date()
            }}, (err, updatedComment)=> {
            if(err) res.json({
                success : false,
                err
            })
            return res.status(200).json({
                success : true,
                updatedComment
            })
        }
    )

})



// 댓글 삭제
app.delete('/api/chat/delete/comment', (req,res)=> {
    const data = req.body;
})



// 알림 기능 Notification


// 유저별 알림 조회
app.post('/api/notification/get/user', (req, res)=> {
    const data = req.body;

    Notification.find({
        user_id : data.user_id
    }, (err, find)=> {
        if(err) res.json({
            success : false,
            err
        })
        return res.status(200).json({
            success : true,
            message : "알림을 조회 했습니다.",
            find
        })
    })

})

// 알림 발생시키기
app.post('/api/notification/create/user', auth,(req, res)=> {
    const data = req.body;

    data.create_at = new Date();

    const notification = new Notification(data);
    
    notification.save((err, result)=> {
        if(err) res.json({
            success : false,
            err
        })
        return res.status(200).json({
            success : true,
            message : "알림이 정상적으로 발생했습니다,",
            result
        })
    })
})

// 알림 체크 기능
app.post('/api/notification/update/checked', (req, res)=> {
    const data = req.body;

    Notification.findOneAndUpdate({
        user_id : data.user_id,
        _id : data._id
    },{$set : {is_checked : true}}, (err, find)=> {
        if(err) res.json({
            success : false,
            err
        })
        return res.status(200).json({
            success : true,
            message : "알림을 확인했습니다.",
            find
        })
    })

})




// ---------------------
app.listen(port, ()=> {
    console.log(`backend server listening on port ${port}`)
})