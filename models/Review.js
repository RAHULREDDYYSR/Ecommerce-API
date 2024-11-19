import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    rating: {
        type:Number,
        min:1,
        max:5,
        required:[true,'please provide rating']
    },
    title: {
        type:String,
        trim:true,
        required:[true,'please provide review title'],
        maxLength:100,
    },
    comment: {
        type:String,
        required:[true,'please provide review comment'],
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:[true,'please provide product']
    }
},{timestamps:true}
)

//one user can create only one review to the product
ReviewSchema.index({product:1, user:1},{unique:true})


export const Review = mongoose.model('Review', ReviewSchema)