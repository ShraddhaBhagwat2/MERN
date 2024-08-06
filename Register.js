import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
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
            const { data } = await axios.post('/api/v1/user/register', { name: inputs.name, username: inputs.username, password: inputs.password })
            if (data.success) {
                alert('User registered successfully');
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
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
                        sx={{ textTransform: 'uppercase' }} padding={3} textAlign="center">Register</Typography>
                    <TextField
                        placeholder="Enter your name"
                        value={inputs.name}
                        onChange={handleChange}
                        name="name"
                        margin="normal"
                        type="text"
                        required
                    />
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
                        color="primary">create an account</Button>
                    <Button onClick={() => navigate("/login")} sx={{ borderRadius: 3, marginTop: 3 }}>already have an account</Button>
                </Box ></form>

        </>
    )
}

export default Register
