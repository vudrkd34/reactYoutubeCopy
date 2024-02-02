// express 모듈 호출
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sequelize = require('./models').sequelize;
const models = require('./models');
sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/hello', (req, res) => {
    res.send({ hello : 'Hello react' });
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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})