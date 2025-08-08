import React from "react";
import {EyeOutlined} from "@ant-design/icons";

function Settings(props) {
    const[isChecked, setIsChecked] = React.useState(false);
    const[showPassword, setShowPassword] = React.useState(false);
    const{changeAddress, setChangeAddress} = React.useState(false);
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
    function handleChangeAddress(){
        setChangeAddress(!changeAddress);
    }
    return(
        /* todo fetch data from db*/
        <div className="settings-container">
            <div className="form-group-container">
                <form className="form-group">
                    <div className="form-item">
                        <label>First Name</label>
                        <input type="text" placeholder="First name" disabled/>
                    </div>
                    <div className="form-item">
                        <label>Surname</label>
                        <input type="text" placeholder="Surname" disabled/>
                    </div>
                    <div className="form-item">
                        <label>Citizen ID</label>
                        <input type="text" placeholder="Dob" disabled/>
                    </div>
                    <div className="form-item">
                        <label>Date of Birth</label>
                        <input type="text" placeholder="DOB" disabled/>
                    </div>
                    <div className="form-item">
                        <label>E-mail</label>
                        <input type="mail" placeholder="E-mail"/>
                    </div>
                    <div className="form-item">
                        <label>Phone Number</label>
                        <input type="text" placeholder="Phone Number"/>
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
                                    onChange={handleNewPassword}
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
                                    onChange={handleConfirmPassword}
                                />
                                <span><EyeOutlined onClick={handleShowPassword}/></span>
                            </div>
                        </div>
                    </div>}
                </form>
            </div>
            <div className="confirm-button">
                <button>Save</button>
            </div>
        </div>
    );
}

export default Settings;