const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
    session({
        secret : 'kpg124214',
        resave : false,
        saveUninitialized : false
    })
)


mongoose.connect("mongodb://127.0.0.1:27017/admin", {

}).then(() => console.log('MongoDb Connect')).catch(err => console.log(err))


const personInfoSchema = new mongoose.Schema({
    name: String,
    age: Number ,
    id : String ,
    password : String 
},{collection:'test'});
  

const Person = mongoose.model("test", personInfoSchema);

app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
    const userId = req.body.userId;
    const password = req.body.userPassword;
    const sendData = { isLogin: "" , userId : ""};

    if (userId && password) {             // id와 pw가 입력되었는지 확인

       

        Person.findOne({id:userId}).then(data => 


            bcrypt.compare(password , data.password, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교
                
                console.log("password : " + password); 
                console.log("crypt Password : " + bcrypt.hashSync(password, 10)); 
                console.log("dataPassword : " + data.password); 

                if (result === true) {                  // 비밀번호가 일치하면
                    

                    req.session.is_logined = true;      // 세션 정보 갱신
                    req.session.nickname = userId;
                    req.session.save(function () {
                        sendData.isLogin = "True"
                        sendData.userId = userId;
                        res.send(sendData);
                    });

                    
                }
                else{                                   // 비밀번호가 다른 경우
                    sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                    res.send(sendData);
                }
            })
        
        );


    } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }
});



app.get('/auth',(req,res) => {

    const sendData = { isLogin: "" , userId : ""};

    sendData.isLogin = req.session.is_logined
    sendData.userId = req.session.nickname

    res.send(sendData);
})
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})