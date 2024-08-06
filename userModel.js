import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'username is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Blog',
        }
    ]

}, { timestamps: true })
const userModel = mongoose.model('User', userSchema);
export default userModel;