import React, { useState, useEffect } from "react";
import { DownOutlined, RollbackOutlined } from "@ant-design/icons";
import {Dropdown, message, Space} from "antd";
import addressTypeEnum from "../../../../backend/enum/addressTypeEnum.js";
import axiosInstance from "../../api/axiosInstance.js";

const addressType = Object.entries(addressTypeEnum).map(([key, value]) => ({
    key: value,   // "Home"
    label: value  // "Home"
}));


function ChangeAddress({ address, onBack, onSave }) {
    const [selectedAddressType, setSelectedAddressType] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [others, setOthers] = useState("");

    useEffect(() => {
        if (address) { //router callback value
            setSelectedAddressType(address.fullData?.address_type || null);
            setSelectedCountry(address.fullData?.country || null);
            setSelectedCity(address.fullData?.city || null);
            setSelectedDistrict(address.fullData?.district || null);
            setState(address.fullData?.state_ || "");
            setStreet(address.fullData?.street || "");
            setOthers(address.fullData?.others_ || "");
        }
    }, [address]);

    const handleSave = async () => {
        if (!selectedAddressType || !selectedCountry || !selectedCity || !selectedDistrict || !state || !street) {
            alert("All fields must be filled!");
            return;
        }

        const updatedAddress = {
            id: address.id,
            label: selectedAddressType,
            value: [
                selectedCountry,
                selectedCity,
                state,
                street,
                selectedDistrict,
                others
            ].filter(Boolean).join(", "),
            fullData: {
                addressType: selectedAddressType,
                country: selectedCountry,
                city: selectedCity,
                state: state,
                district: selectedDistrict,
                street: street,
                others: others,
            }
        };

        try {
            const response = await axiosInstance.patch(`/addresses/${address.id}`, updatedAddress.fullData);
            if (response.status === 200) {
                message.success("Address successfully updated!");
                onSave?.(updatedAddress);
            } else {
                message.error("Something went wrong!");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                message.warning("Empty update request");
            } else if (error.response?.status === 500) {
                message.error("Internal server Error");
            } else {
                message.error("Unexpected error occurred");
            }
        }
    };
    return (
        <div className="address-wrapper">
            <div className="back-button">
                <button onClick={onBack}>
                    <RollbackOutlined style={{ fontSize: "1.5rem", color: "#08c" }} />
                </button>
            </div>

            <div className="dropdown-container">
                {/* Address Type */}
                <div className="dropdown-container-item">
                    <div className="dropdown-label"><label>Address Type</label></div>
                    <Dropdown menu={{ items: addressType, onClick: ({ key }) => setSelectedAddressType(key) }}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                {selectedAddressType
                                    ? addressType.find(a => a.key === selectedAddressType)?.label
                                    : "Select Address Type"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

                <div className="dropdown-container-item">
                    <label>Country</label>
                    <input
                        type="text"
                        value={selectedCountry || ""}
                        onChange={e => setSelectedCountry(e.target.value)}
                        maxLength={255}
                        placeholder="Enter country"
                    />
                </div>

                <div className="dropdown-container-item">
                    <label>City</label>
                    <input
                        type="text"
                        value={selectedCity || ""}
                        onChange={e => setSelectedCity(e.target.value)}
                        maxLength={255}
                        placeholder="Enter city"
                    />
                </div>

                <div className="dropdown-container-item">
                    <label>District</label>
                    <input
                        type="text"
                        value={selectedDistrict || ""}
                        onChange={e => setSelectedDistrict(e.target.value)}
                        maxLength={255}
                        placeholder="Enter district"
                    />
                </div>


                {/* State */}
                <div className="dropdown-container-item">
                    <label>State / Province</label>
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        maxLength={255}
                        placeholder="Enter state/province"
                    />
                </div>

                {/* Street */}
                <div className="dropdown-container-item">
                    <label>Street</label>
                    <input
                        type="text"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        maxLength={255}
                        placeholder="Enter street"
                    />
                </div>

                {/* Others */}
                <div className="dropdown-container-item">
                    <label>Others</label>
                    <input
                        type="text"
                        value={others}
                        onChange={e => setOthers(e.target.value)}
                        maxLength={255}
                        placeholder="Additional info (optional)"
                    />
                </div>

                <div className="confirm-button" style={{ marginTop: 16 }}>
                    <button onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default ChangeAddress;
