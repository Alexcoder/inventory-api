import mongoose from 'mongoose';

const dashboardSchema = mongoose.Schema({
    category: { type:String, required:true},
    user: { type:String, required:true},
    creator: { type: String, required:true},
    buyPrice: { type: Number, required:true},
    quantityIn: { type: Number, required:true},
    quantityOut: { type: Number, required:true},
    amountIn: { type: Number, required:true},
    amountOut: { type: Number, required:true},    
},
{timeStamp:true}
)

 const DashboardHistory = mongoose.model("DashboardHistory", dashboardSchema);
 export default DashboardHistory;