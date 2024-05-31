import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpInput } from './Input'; // Ensure this import path is correct
import { Link, useNavigate } from 'react-router-dom';
import { webClient } from '../util/config';
import {updateUser} from '../redux/slice/userSlice'


function SignUpForm() {
    const emptyUser = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const [user, setUser] = useState(emptyUser);
    const dispatch = useDispatch();

    function handleOnChange(event) {
        const { id, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    }

    function saveUserDetails() {
        webClient.post('/user/addUserDetails', user, { timeout: 10000 }) // Increased timeout
            .then(response => {
                const userData = response.data;
               dispatch(updateUser(userData));
               alert("Sign up Successful. Please Login.");
                 console.log(response.data)
                setUser(emptyUser);
            })
            .catch(err => {
                console.error("Error saving user details:", err);
                alert("Error occurred while saving user details. Please try again.");
            });
    }

    function checkIfUserExists() {
        webClient.post('/user/checkIfUserExists', user, { timeout: 10000 }) // Increased timeout
            .then(response => {
                console.log("Response:", response);
                if (response.status === 200) {
                    alert("Username already exists! Try with a different username.");
                } else {
                    saveUserDetails();
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 404) {
                        saveUserDetails();
                    } else if (error.response.status === 500) {
                        alert("Internal Server error. Please try again.");
                    } else {
                        console.error("Unexpected error response:", error.response);
                        alert("An unexpected error occurred. Please try again.");
                    }
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    alert("No response received from the server. Please try again.");
                } else {
                    console.error("Request setup error:", error.message);
                    alert("Error occurred while checking if user exists. Please try again.");
                }
            });
    }

    function submitSignUp(event) {
        event.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Password and Confirm Password should match. Please recheck and submit.");
        } else {
            checkIfUserExists();
        }
    }

    return (
        <form onSubmit={submitSignUp}>
            <h1 className="h3 mt-5 mb-3 fw-normal sign-up-title">Sign up</h1>
            <SignUpInput type="text" id="username" value={user.username} placeholder="Username" onChange={handleOnChange} />
            <SignUpInput type="email" id="email" value={user.email} placeholder="Email" onChange={handleOnChange} /> 
            <SignUpInput type="password" id="password" value={user.password} placeholder="Password" onChange={handleOnChange} />
            <SignUpInput type="password" id="confirmPassword" value={user.confirmPassword} placeholder="Confirm Password" onChange={handleOnChange} />
            <button className="btn btn-primary mt-3 w-100 py-10" type="submit">Sign up</button>
            <h2 className="h6 mt-3 fw-normal">Already have an account? <span><Link className="login-link" to="/LoginPage">Login</Link></span></h2>
        </form>
    );
}

export default SignUpForm;
