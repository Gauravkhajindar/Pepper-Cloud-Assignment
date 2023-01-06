const mongoose=require("mongoose")

const ImageSchema=new mongoose.Schema({
    image:{ type: String, required: true, trim: true },
    uploadedDate:{type:String}
},{timestamps:true})

module.exports=mongoose.model("Image",ImageSchema)