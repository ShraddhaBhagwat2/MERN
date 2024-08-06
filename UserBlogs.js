import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../componenets/BlogCard'
const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserBlogs();
    }, []);
    return (
        <div>
            {blogs && blogs.length > 0 ? (blogs.map((blog, index) => (
                <BlogCard
                    id={blog._id}
                    isUser={true}
                    key={index} // Ensure that the key is unique for each blog item
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.username}
                />))) : (<h1 >You have not created a blog</h1>)}
        </div>
    )
}

export default UserBlogs
