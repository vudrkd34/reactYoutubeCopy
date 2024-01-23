// express 모듈 호출
const express = require('express');
const app = express();
const api = require('./routes/index');
// api 처리는 './routes/index'에서 일괄처리
app.use('/api', api);
 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})