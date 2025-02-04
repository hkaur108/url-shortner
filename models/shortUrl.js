const mongoose=require('mongoose');
const shortId=require('shortid');
const shortUrlSchema = new mongoose.Schema({
    full:{
        type:String,
        required:true,
        unique:true
    },
    short:{
        type:String,
        required:true,
        default:shortId.generate,
        unique:true
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports=mongoose.model('ShortUrl',shortUrlSchema)