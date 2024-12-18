import mongoose from "mongoose";


export default async () => {
    mongoose.connect(`${process.env.MONGOURL}`).then(()=>{
        console.log('database connected . . .')
    }).catch((err)=>{
        console.log(`error occured while connecting to database ::::: ${err}`)
    })
}