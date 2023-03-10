import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    category: { type:String, required:true},
    user:  { type:String, required:true},
    type: { type:String, required:true},
    price: { type: Number, required:true},
    creator: { type: String, required:true},
    quantity: { type: Number, required:true},
    location: { type:String, required:true},
    amount: { type: Number, required:true},
    date: {
     type: Date,
     default: new Date()
    } ,
},
{timeStamp:true}
)

 const InventoryHistory = mongoose.model("InventoryHistory", postSchema);
 export default InventoryHistory;