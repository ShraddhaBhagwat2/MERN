// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Box, boxShadow } from '@mui/material'

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

// interface BlogCardProps {
//     title: string;
//     description: string;
//     image: string;
//     _id: String;
//     isUser: String;
//     username?: string;  // username can be optional
// }

// export default function BlogCard({ title, description, image, username = '', _id, isUser }: BlogCardProps) {
//     const [expanded, setExpanded] = React.useState(false);

//     return (
//         <Card sx={{ width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', "&:hover": { boxShadow: '10px 10px 20px #ccc ' } }}>
//             {isUser && (<Box display={"flex"}><IconButton sx={{ marginLeft: "auto" }}><EditIcon /></IconButton><IconButton><DeleteIcon /></IconButton></Box>)}<CardHeader
//                 avatar={
//                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                         {username ? username.charAt(0) : 'U'}
//                     </Avatar>
//                 }

//                 title={title}
//                 subheader={username || 'Unknown user'}
//             />
//             <CardMedia
//                 component="img"
//                 height="194"
//                 image={image}
//                 alt="Paella dish"
//             />
//             <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                     Description:{description}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// }
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface BlogCardProps {
    title: string;
    description: string;
    image: string;
    _id: string;
    isUser: boolean;
    username?: string;  // username can be optional
}

export default function BlogCard({ title, description, image, username = '', id, isUser }: BlogCardProps) {
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/blog-details/${id}`);
    };
    const handleCardClick = () => {
        navigate(`/blog-page`)
    }
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
            if (data?.success) {
                alert('Blog deleted')
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card onClick={handleCardClick} sx={{ width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', "&:hover": { boxShadow: '10px 10px 20px #ccc ' } }}>
            {isUser && (
                <Box display="flex">
                    {/* <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <EditIcon />
                    </IconButton> */<IconButton onClick={(e) => { e.stopPropagation(); handleEdit(); }} sx={{ marginLeft: "auto" }}>
                            <EditIcon />
                        </IconButton>}
                    {<IconButton onClick={handleDelete}>
                        <DeleteIcon /></IconButton>
                    }
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username ? username.charAt(0) : 'U'}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={username || 'Unknown user'}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
