// express 모듈 호출
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sequelize = require('./models').sequelize;
const models = require('./models');

const session = require('express-session')
const db = require('./lib/db');
const bcrypt = require('bcrypt');

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
    session({
        secret : 'kpg124214',
        resave : false,
        saveUninitialized : false
    })
)


app.get('/hello', (req, res) => {
    res.send({ hello : 'Hello react' });
})

app.get('/auth',(req,res) => {

    const sendData = { isLogin: "" , userId : ""};

    sendData.isLogin = req.session.is_logined
    sendData.userId = req.session.nickname

    res.send(sendData);
})

app.get("/test_data" , (req,res) => {
    
    models.test1.findAll({

    })
    .then(result => {res.send(result)})
    .catch(err => {throw err})
    
    // sequelize.query("SELECT * FROM sample1s", { type: sequelize.QueryTypes.SELECT})
    // .then(rows => {
    //     console.log(rows);
    //     res.send(rows);
    // })
});

app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
    const username = req.body.userId;
    const password = req.body.userPassword;
    const sendData = { isLogin: "" , userId : ""};

    if (username && password) {             // id와 pw가 입력되었는지 확인
        db.query('SELECT * FROM userTable WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.      

                bcrypt.compare(password , results[0].password, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교
                    console.log("crypt Password : " + bcrypt.hashSync(password, 10)); 
                    if (result === true) {                  // 비밀번호가 일치하면
                        

                        req.session.is_logined = true;      // 세션 정보 갱신
                        req.session.nickname = username;
                        req.session.save(function () {
                            sendData.isLogin = "True"
                            sendData.userId = username;
                            res.send(sendData);
                        });
                        // db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
                        //     , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                        // 마이따 턴
                    }
                    else{                                   // 비밀번호가 다른 경우
                        sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                        res.send(sendData);
                    }
                })                      
            } else {    // db에 해당 아이디가 없는 경우
                sendData.isLogin = "아이디 정보가 일치하지 않습니다."
                res.send(sendData);
            }
        });
    } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }
});






const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})