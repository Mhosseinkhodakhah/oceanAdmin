import { Schema , model } from "mongoose";
import { admin } from "../../interfaces";



const adminSchema = new Schema<admin>({
    userName : {type : String},
    firstName : {type : String},
    lastName : {type : String},
    password : {type : String},
    suspended : {type : Boolean , default : false},
    role : {type : Number},    // 0 : admin    1 : superAdmin
})


const adminModel = model<admin>('admin' , adminSchema)
export default adminModel