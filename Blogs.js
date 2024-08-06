// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import BlogCard from '../componenets/BlogCard'
// const Blogs = () => {
//     const [blogs, setBlogs] = useState([])
//     const getAllBlogs = async () => {
//         try {
//             const { data } = await axios.get('/api/v1/blog/all-blog')
//             if (data?.success) {
//                 setBlogs(data.blogs)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         getAllBlogs();
//     }, [])
//     return (
//         <div>{blogs && blogs.map((blog, index) => (
//             <BlogCard
//                 id={blog._id}
//                 isUser={localStorage.getItem('userId') === blog.user._id}
//                 key={index} // Ensure that the key is unique for each blog item
//                 title={blog.title}
//                 description={blog.description}
//                 image={blog.image}
//                 username={blog.username}
//             />))}

//         </div>
//     )
// }

// export default Blogs
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../componenets/BlogCard';
//import BlogCard from '../components/BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blog');
            if (data?.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div>
            {blogs && blogs.map((blog) => {
                const userId = blog.user ? blog.user._id : null;
                const username = blog.user ? blog.user.username : 'Unknown';

                return (
                    <BlogCard
                        key={blog._id}
                        id={blog._id}
                        isUser={localStorage.getItem('userId') === userId}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={username}
                    />
                );
            })}
        </div>
    );
};

export default Blogs;
