const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/pathology-backend').then(()=>{
    console.log("mongo Db Connected Successfully")
}).catch(err=>{
    console.log("Something went wrong");
})

