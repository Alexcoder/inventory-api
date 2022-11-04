import mongoose from "mongoose";

const userSchema =  mongoose.Schema ({
        username:{type: String, required: true},
        password:{type: String, required: true},
        name:{type: String , required:true},
    })

const UserInventory = mongoose.model("UserInventory", userSchema);
export default UserInventory;