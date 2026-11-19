const mongoose =require ('mongoose');

const Schema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    description:{
        required:true,
         type:String
    },
    price:{
        required:true,
         type:String
    },
    fasting:{
        required:true,
         type:String
    },
   imgLink :{
         type:String,
         default:"https://tse3.mm.bing.net/th/id/OIP.3JpFam4YU6Ki1Yn7QYsa7AHaHa?pid=Api&P=0&h=220"
    },
    normalRange:{
        required:true,
         type:String
    },
    abnormalRange:{
        required:true,
         type:String
    }
},{

timestamps:{
    createdAt:true,
    updatedAt:true
}

}
);

const repo=mongoose.model('test',Schema);
 module.exports=repo;