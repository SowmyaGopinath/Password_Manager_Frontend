import React, { useState } from "react";
import { webClient } from "../util/config";
import { Input } from "./Input";
import { useDispatch } from 'react-redux';
import { login } from "../redux/slice/userSlice";
import { useNavigate } from 'react-router-dom';
import { API } from "../util/constants";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        otp: ""
    });
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");

    const sendOtp = () => {
        console.log('Sending OTP to:', inputs.email);
        webClient.post(API.SEND_OTP_ENDPOINT, { email: inputs.email },{timeout:20000})
            .then(response => {
                console.log('OTP sent successfully');
                setOtpSent(true);
                setError("");
            })
            .catch(error => {
                console.error('Error sending OTP:', error);
                if (error.code === 'ECONNABORTED') {
                    // Handle timeout error
                    setError('Request timed out. Please try again later.');
                } else if (error.response && error.response.status === 400) {
                    // Handle 400 Bad Request error
                    setError('There was a problem sending the OTP. Please check your email and try again.');
                } else {
                    // Handle other errors
                    setError('An unexpected error occurred. Please try again later.');
                }
            });
    };

    const validateUser = () => {
        const data = {
            email: inputs.email,
            password: inputs.password,
            otp: inputs.otp
        };
        console.log(data)
        webClient.post(API.ENDPOINT_AUTHENTICATE_USER, data,{timeout :10000}).then(response => {
            console.log(`${inputs.email} logged In`);
            dispatch(login(response.data));
            console.log(response.data);
            navigate('/Home');
        }).catch(error => {
            console.error('Error during authentication:', error);
            if (error.response && error.response.status === 400) {
                setError('Invalid credentials. Login failed.');
            } else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
                setError('Request timed out. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        });
    };
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = inputs.email;
        const password = inputs.password;
        if (otpSent) {
            validateUser();
        } else {
            sendOtp();
        }
        // const res = validateUser();
        // console.log(res);
    };

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    return (
        <>
        <div className="login-container">
            <div className="logo-container"></div>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit} method="POST">
                    <Input
                        id="input1" type="email" name="email" placeholder="Email" value={inputs.email}
                        onChange={onChange} disabled={otpSent}
                    />
                    <Input
                        id="input2" type="password" name="password" placeholder="Password" value={inputs.password}
                        onChange={onChange} disabled={otpSent}
                    />
                     {otpSent && (
                        <Input
                            id="input3" type="text" name="otp" placeholder="Enter OTP" value={inputs.otp}
                            onChange={onChange}
                        />
                    )}
                     <input type="submit" className="login-button" value={otpSent ? 'Login' : 'Send OTP'} />
                    
                </form>
                {error && <span className='text-danger'>{error}</span>}
                <a href="/SignUpPage">Signup</a>
            </div>
        </div>
    </>
    );
}

export default Login;
