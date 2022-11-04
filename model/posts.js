import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    user:  { type:String, required:true},
    type: { type:String, required:true},
    location: { type:String, required:true},
    category: { type:String, required:true},
    quantity: { type: Number, required:true},
    price: { type: Number, required:true},
    amount: { type: Number, required:true},
    creator: { type: String, required:true},
    date: {
     type: Date,
     default: new Date()
    } 
}
// {timeStamp:true}
)

 const Inventory = mongoose.model("Inventory", postSchema);
 export default Inventory;