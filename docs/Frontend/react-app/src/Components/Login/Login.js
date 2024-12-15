import { React, useState } from 'react';

// Joy UI Tools
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';

// Material UI Tools
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// API
import axios from "axios";

// Local 
import { useAuth } from "../../contexts/AuthContext";
import './Login.css'

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { login } = useAuth();

    function loginValidation() {

        if (formData.username === '' || formData.password === '') return;

        axios
            .post("http://localhost:4000/api/login", JSON.stringify(formData), {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response);

                login("ram");
            })
            .catch(function (error) {
                console.error("Error:", error);
            });


        console.log(formData);
    }

    function handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;

        setFormData((previousState) => {
            return { ...previousState, [name]: value, }
        })

    }

    function loginUI() {

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >

                <Card sx={{ width: 320 }}>

                    <h2 id='login-header'> Login </h2>

                    <div id="login-credential">
                        <TextField
                            className="outlined-basic" variant="outlined"
                            label="Enter User Name" name="username"
                            onChange={handleChange}
                            value={
                                formData.username !== undefined
                                    ? formData.username
                                    : ""
                            } />
                        <TextField
                            className="outlined-basic" variant="outlined"
                            label="Enter Password" name="password" type="password"
                            onChange={handleChange}
                            value={
                                formData.password !== undefined
                                    ? formData.password
                                    : ""
                            } />
                    </div>

                    <div id="login-footer">
                        <a href='/forgotpassword'> Forgot Password </a>
                        <Button endDecorator={<ArrowRightAltIcon />} onClick={loginValidation}>Login</Button>
                    </div>
                </Card>
            </Grid>
        )
    }

    return (loginUI());
}

export default Login;
