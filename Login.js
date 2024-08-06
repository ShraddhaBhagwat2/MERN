import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({

        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/login', { username: inputs.username, password: inputs.password })
            if (data.success) {
                localStorage.setItem('userId', data?.user._id);
                dispatch(authActions.login());
                alert('User login successful');
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Box style={{ backgroundColor: "white" }}>
            <form style={{ backgroundColor: "white" }} onSubmit={handleSubmit}>
                <Box st
                    maxWidth={450}
                    display="flex"
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin="auto"
                    boxShadow="10px 10px 20px #ccc"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}><Typography variant="h4"
                        sx={{ textTransform: 'uppercase' }} padding={3} textAlign="center">Login</Typography>

                    <TextField
                        placeholder="Enter your Username"
                        value={inputs.username}
                        onChange={handleChange}
                        name="username"
                        margin="normal"
                        type="text"
                        required
                    />
                    <TextField
                        placeholder="Enter your Password"
                        value={inputs.password}
                        onChange={handleChange}
                        name="password"
                        margin="normal"
                        type="password"
                        required
                    />

                    <Button type="submit" sx={{ borderRadius: 3, marginTop: 3 }}
                        variant="contained"
                        color="primary">Login</Button>
                    <Button onClick={() => navigate("/register")} sx={{ borderRadius: 3, marginTop: 3 }}>Please register</Button>
                </Box ></form>

        </Box>
    )
}

export default Login;
