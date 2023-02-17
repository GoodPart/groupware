const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');

const app = express();
const port = 9999;

const bodyParser = require('body-parser')
const config = require('./config/key');

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



//스키마 불러오기.
const {User} = require('./models/User');

const mongoose = require('mongoose');
const { DbId } = require('./models/Db_Id');

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


//회원가입
app.post('/signup', (req,res)=> {
    const getUserData = req.body;

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
//회원가입 - 중복 아이디 확인
app.post('/signup/checkid', (req,res)=> {
    const data = req.body; //user id

    User.findOne({
        userId : data.userId
    }, (err, result)=> {
        if(result) res.json({
            success : false,
            message : "중복된 아이디입니다."
        })
        return res.status(200).json({
            success : true,
            message : "사용 가능한 아이디입니다."
        })
    })

})

//특정 카테고리 조회
app.post('/api/dbid/getdbid', (req,res)=> {
    const data = req.body;

    DbId.find({
        category : data.category,
    }, (err, ele)=> {
        if(!ele) res.json({
            success : false,
            err
        })
        return res.status(200).json({
            success : true,
            getId : ele
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

        DbId.updateOne({category : data.category}, {$set: {id: findCategory.id + 1}}, (err, ele)=> {
            // console.log(ele)
            if(!ele) res.json({
                success : false,
                message : `오류입니다. ${err}`
            })

            return res.status(200).json({
                success : true,
                result : ele
            })
        })

        // DbId.updateOne(
        //     {category : data.category},{$set: {id : findCategory.id +1}}, (err, next)=> {
        //         if(!err) res.json({
        //             success : false,
        //             message : `오류입니다. ${err}`
        //         })

        //         return res.status(200).json({
        //             success : true,
        //             result : next
        //         })
        // })
        
    })
})

app.post('/sum', (req,res)=> {
    const data = req.body;
    
    function sum(data) {
        const _a = data.a;
        const _b = data.b;

        const calc = _a+_b;
        return calc
    }


    if(!data) {
        return res.status(400).json({
            message : "error"
        })
    }else {
        return res.status(200).json({
            message : "success",
            result : sum(data)
        })
    }
    
});

app.listen(port, ()=> {
    console.log(`backend server listening on port ${port}`)
})