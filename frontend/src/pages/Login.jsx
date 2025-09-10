import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import axiosInstance from "../api/axiosInstance.js";
function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    async function handleLogin(event) {
        event.preventDefault();
        setLoginError(false); // Clear last error

        if (userEmail === "" || userPassword === "") {
            setEmptyEmail(true);
            return;
        }

        if (!userEmail.match(isValidEmail)) {
            setInvalidEmail(true);
            return;
        }

        try{
            const response = await axiosInstance.post("/login", {
                email: userEmail,
                password: userPassword
            });
            if(response.status === 200) navigate("/profile");
        }catch (error){
            if(error.response?.status === 404 || error.response?.status === 401) setLoginError(true);
            else console.error("Unexpected error", error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "email") {
            setUserEmail(value);
            setEmptyEmail(false);
            setInvalidEmail(false);
        } else if (name === "password") {
            setUserPassword(value);
        }
    }

    return (
        <>
            {emptyEmail && (
                <Alert
                    message="Warning"
                    description="Email address can not be empty"
                    type="warning"
                    showIcon
                    closable
                    onClose={() => setEmptyEmail(false)}
                />
            )}

            {invalidEmail && (
                <Alert
                    message="Warning"
                    description="Email format is invalid"
                    type="warning"
                    showIcon
                    closable
                    onClose={() => setInvalidEmail(false)}
                />
            )}

            {loginError && (
                <Alert
                    message="Error"
                    description="Invalid credentials"
                    type="error"
                    showIcon
                    closable
                    onClose={() => setLoginError(false)}
                />
            )}
            <div className="login-page-container cfb">

                <form className="login-form">
                    <label>Welcome</label>
                    <div className="login-input">
                        <input
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userEmail}
                        />
                    </div>
                    <div className="login-input">
                        <input
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userPassword}
                        />
                    </div>
                    <button className="login-form-button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
