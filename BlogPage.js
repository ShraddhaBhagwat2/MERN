// // BlogPage.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Typography } from '@mui/material';

// const BlogPage = () => {
//     const { blogId } = useParams(); // Assuming you're using react-router-dom for routing

//     // Fetch blog content based on blogId

//     return (
//         <div>
//             <Typography variant="h4">Blog Title</Typography>
//             displaying conetent
//             {/* Implement comment system */}
//         </div>
//     );
// };

// export default BlogPage;
// BlogPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { IconButton, AppBar, Box, Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const BlogPage = () => {
    const { blogId } = useParams();
    const [comments, setComments] = useState([]);

    // Fetch blog content and comments based on blogId

    const handleLike = (commentId) => {
        // Update the like count for the specified comment
    };

    const handleReply = (commentId) => {
        // Handle reply action
    };

    return (
        <div style={{ backgroundColor: "white" }}>
            {/* Display blog content */}
            <h1>Study Blog</h1>
            <p>Crack every test!
                <p>1.Be in a positive mindset!</p>
                <p>2. Sleep Well</p>
                <p>3. Eat Smart Snacks</p>
                <p>4. Exercise</p>
                <p>5. Make a Study Plan</p>
                <p>6. Stay Away From Distractions</p>
                <p>7. Listen To Calming Music</p>
                <p>8. Start With Your Weakest Subject</p>
                <p>9. Make Sure Your Notes Are Complete</p>
                <p>10. Talk To Your Teachers</p>
                <p>11. Study In Short Bursts</p>
                <p>12. Focus On Keywords</p>
                <p>13. Reading Is Not Studying</p>
                <p>14. Don't Multitask</p>
                <p>15. Use Downtime To Your Advantage</p>
                <p>16. Become A Teacher</p>
                <p>17. Use As Many Senses As Possible</p>
                <p>18. Create Your Flashcards</p>
                <p>19. Study Right Before Bed</p>
                20. Know When To Call It Day</p><AppBar position='sticky'><Box display={'flex'} marginLeft="auto">
                    <Button sx={{ margin: 1, color: 'white' }}>Reply</Button><IconButton><ThumbUpIcon /></IconButton></Box></AppBar>


        </div>
    );
};

export default BlogPage;
