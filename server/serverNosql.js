const mongoose = require('mongoose');
const express = require('express');
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/admin", {

}).then(() => console.log('MongoDb Connect')).catch(err => console.log(err))


const personInfoSchema = new mongoose.Schema({
    name: String,
    age: Number
},{collection:'test'});
  

const Person = mongoose.model("test", personInfoSchema);

const allUser = Person.find({});

Person.find().then(data => console.log(data));


//console.log("alluser : " + allUser);  
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})