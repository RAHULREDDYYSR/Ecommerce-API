import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please provide email address'],
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid email'
        }
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minLength:6,

    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}
export const User = mongoose.model('User',UserSchema);