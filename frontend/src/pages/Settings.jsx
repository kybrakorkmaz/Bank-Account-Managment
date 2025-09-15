import React, {useEffect, useState} from "react";
import {EyeOutlined} from "@ant-design/icons";
import axiosInstance from "../api/axiosInstance.js";
import {message} from "antd";
import dayjs from "dayjs";
function Settings(props) {
    const [name, setName]= useState("");
    const [citizenID, setCitizenID] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail]= useState("");
    const [phone, setPhone]=useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const[isChecked, setIsChecked] = useState(false);
    const[showPassword, setShowPassword] = useState(false);
    const{changeAddress, setChangeAddress} = useState(false);
    useEffect(() => {
        async function getUserInfo(){
            try{
                const response = await axiosInstance.get("/settings");
                if(response.status === 200){
                    setName(response.data.settings.username);
                    setCitizenID(response.data.settings.citizen_id);
                    setDob(dayjs(response.data.settings.dob).format("DD.MM.YYYY"));
                    setEmail(response.data.settings.email);
                    setPhone(response.data.settings.phone_no);
                }
            }catch (error){
                if(error.response?.status === 500){
                    message.error("Internal Server Error");
                }
            }

        }
        getUserInfo();
    }, []);
    function handleChangePassword(){
        setIsChecked(!isChecked);
    }
    function handleNewPassword(event){

    }

    function handleConfirmPassword(event) {

    }
    function handleShowPassword(){
        setShowPassword(!showPassword);
    }
    async function handleSave() {
        const payload = {
            email: email,
            phone: phone,
            password: password || null,
            confirmPassword: confirmPassword || null,
        };
        if (!payload.password !== !payload.confirmPassword) {
            message.error("Passwords do not match.");
            return;
        }
        try {
            const response = await axiosInstance.patch("/settings", payload);

            if (response.status === 200) {
                message.success("Settings updated successfully");
            } else {
                message.error("Failed to update settings");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                message.error("Invalid request: " + error.response.data.message);
            } else if (error.response?.status === 401) {
                message.error("Unauthorized: Please login again");
            } else {
                message.error("Internal Server Error");
            }
        }
    }
    return(
        <div className="settings-container">
            <div className="form-group-container">
                <form className="form-group">
                    <div className="form-item">
                        <label>Name</label>
                        <input type="text"
                               name={"name"}
                               value={name}
                               disabled
                        />
                    </div>
                    <div className="form-item">
                        <label>Citizen ID</label>
                        <input type="text"
                               name={"citizenID"}
                               value={citizenID}
                               disabled
                        />
                    </div>
                    <div className="form-item">
                        <label>Date of Birth</label>
                        <input type="text"
                               name={"dob"}
                               value={dob}
                               disabled
                        />
                    </div>
                    <div className="form-item">
                        <label>E-mail</label>
                        <input type="mail"
                               name={"email"}
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <label>Phone Number</label>
                        <input type="text"
                               name={"phone"}
                               value={phone}
                               onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <label>Change Password</label>
                        <input type="checkbox" id="change-password" onClick={handleChangePassword} />
                    </div>
                    {isChecked && <div>
                        <div className="form-item password-input-wrapper">
                            <label>Password</label>
                            <div className="input-icon-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span><EyeOutlined onClick={handleShowPassword}/></span>
                            </div>
                        </div>

                        <div className="form-item password-input-wrapper">
                            <label>Confirm</label>
                            <div className="input-icon-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span><EyeOutlined onClick={handleShowPassword}/></span>
                            </div>
                        </div>
                    </div>}
                </form>
            </div>
            <div className="confirm-button">
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default Settings;