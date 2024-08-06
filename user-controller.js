// import User from '../model/user.js';
// export const signupUser=async(request, response)=>{
//     try{
//         const user=request.body;
//         const newUser=new User(user);
//         await newUser.save();
//         return response.status(200).json({msg:'signup successful'})
//     }catch(error){
//         return response.status(500).json({msg:'Error while signup the user'
//         })

//     }

// }
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
export const registerController = async (req, res) => {
    try {
        const { name, username, password } = req.body
        if (!name || !username || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            })
        }
        const existingUser = await userModel.findOne({ username })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        const user = new userModel({ name, username, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New user created',
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            messsage: 'Error in register callback',
            success: false,
            error
        })
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'All users data',
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get all users",
            error,
        })
    }
}
export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide username or password'
            })
        }
        const user = await userModel.findOne({ username })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Username is not registered'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error
        })
    }
}
// export default getAllUsers;
// export default registerController;
// export default loginController;