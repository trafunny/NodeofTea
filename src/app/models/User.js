const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const bcrypt = require('bcrypt')


mongoose.plugin(slug); 

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    // _id: ObjectId,
    name: { type: String, maxLength: 255 , default:"anonymous" ,require: true},
    
    // image: { type: String, maxLength: 255 },
    tel: { type : String , index : true } ,
    slug : { type : String , slug : "name" ,unique : true } ,  
    password : {type : String , minLength : 0 , maxLength : 255 , require : true} ,
    role : {type : String , default : "user"},  // user , guest , admin
   
},{
    timestamps : true ,     
})

User.pre('save',async function(next){
    try {
        console.log(`called before save :::` , this.username , this.password)
        const salt = await bcrypt.genSalt(10)
        const hassPassword =  await  bcrypt.hash(this.password, salt)
        this.password = hassPassword
        next()

        
    } catch (error) {
        next(error)
        
    }
})

module.exports = mongoose.model('user',User);
