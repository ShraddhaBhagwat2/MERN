import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
export const getAllBlogsController = async (req, res) => {
    try {

        const blogs = await blogModel.find({}).populate("user")
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All blogs lists',
            blogs,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while getting blogs',
            error
        })
    }
};
export const createBlogController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { title, description, image, user } = req.body;

        // Check if all required fields are present
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }

        // Validate if user ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid User ID',
            });
        }

        // Check if user exists
        const existingUser = await userModel.findById(user).session(session);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user',
            });
        }

        // Create new blog
        const newBlog = new blogModel({ title, description, image, user });
        await newBlog.save({ session });

        // Update user's blogs array
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });

        await session.commitTransaction();

        return res.status(201).send({
            success: true,
            message: 'Blog created',
            newBlog,
        });
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error,
        });
    } finally {
        session.endSession();
    }
};
// export const createBlogController = async (req, res) => {
//     try {
//         const { title, description, image, user } = req.body
//         if (!title || !description || !image || !user) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'Please provide all fields'
//             })
//         }
//         const existingUser = await userModel.findById(user)
//         if (!existingUser) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Unable to find user'
//             })
//         }
//         const newBlog = new blogModel({ title, description, image })
//         const session = await mongoose.startSession()
//         session.startTransaction()
//         await newBlog.save({ session })
//         existingUser.blogs.push(newBlog)
//         await existingUser.save({ session })
//         await session.commitTransaction();
//         await newBlog.save()
//         return res.status(201).send({
//             success: true,
//             message: 'Blog created',
//             newBlog,
//         });
//     } catch (error) {
//         console.log(error)
//         return res.status(400).send({
//             success: false,
//             message: 'Error while creating blog',
//             error
//         })
//     }
// };
// export const updateBlogController = async (req, res) => {
//     try {
//         const id = req.params;
//         const { title, description, image } = req.body;
//         const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
//         return res.status(200).send({
//             success: true,
//             message: 'Blog updated',
//             blog,
//         });

//     } catch (error) {
//         console.log(error)
//         return res.status(400).send({
//             success: false,
//             message: 'Error while updating blog',
//             error
//         })
//     }
// };
export const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params; // Extract id correctly from URL params

        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid blog ID',
            });
        }

        // Perform the update
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

        // Check if the blog was found and updated
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        // Respond with success
        return res.status(200).send({
            success: true,
            message: 'Blog updated',
            blog,
        });
    } catch (error) {
        console.error(error); // Use console.error for errors
        return res.status(500).send({ // Use 500 status code for server errors
            success: false,
            message: 'Error while updating blog',
            error,
        });
    }
};
export const getBlogByIdController = async (req, res) => {
    try {

        const { id } = req.params; // Extract id correctly from URL params

        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid blog ID',
            });
        }

        // Perform the update
        const blog = await blogModel.findById(id);

        // Check if the blog was found and updated
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        // Respond with success
        return res.status(200).send({
            success: true,
            message: 'Fetch single blog',
            blog,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting single blog',
            error,
        })
    }
};
// export const deleteBlogController = async (req, res) => {
//     try {
//         const { id } = req.params; // Extract id correctly from URL params

//         // Validate the id
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'Invalid blog ID',
//             });
//         }

//         // Perform the update
//         const blog = await blogModel.findOneAndDelete(id).populate("user");
//         await blog.user.blogs.pull(blog);
//         await blog.user.save();

//         // Check if the blog was found and updated
//         if (!blog) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Blog not found',
//             });
//         }

//         // Respond with success
//         return res.status(200).send({
//             success: true,
//             message: 'Blog deleted',

//         });
//     } catch (error) {
//         console.log(error)
//         return res.status(400).send({
//             success: false,
//             message: 'Error while deleting blog',
//             error
//         })
//     }
// };
export const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params; // Extract id correctly from URL params

        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid blog ID',
            });
        }

        // Find the blog to delete and populate the associated user
        const blog = await blogModel.findByIdAndDelete(id).populate('user');

        // Check if the blog was found
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        // Remove the blog ID from the user's blogs array
        const user = blog.user;
        user.blogs.pull(id); // Remove the blog's ID from the user's blogs array
        await user.save();

        // Respond with success
        return res.status(200).send({
            success: true,
            message: 'Blog deleted',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while deleting blog',
            error,
        });
    }
};
export const userBlogController = async (req, res) => {
    try {
        const { id } = req.params; // Extract id correctly from URL params

        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid blog ID',
            });
        }

        // Find the blog to delete and populate the associated user
        const userBlog = await userModel.findById(id).populate('blogs');

        // Check if the blog was found
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blogs not found with this ID',
            });
        }




        // Respond with success
        return res.status(200).send({
            success: true,
            message: 'User blogs',
            userBlog,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error in user blog',
            error
        })
    }
};
