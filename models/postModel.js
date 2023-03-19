import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is a required field"],
        // trim : true
    },
    prompt : {
        type : String,
        required : [true, "Name is a required field"]
    },
    photo : {
        type : String,
        required : [true, "Name is a required field"]
    },
})


const Post = mongoose.model('Post', postSchema)

export default Post;