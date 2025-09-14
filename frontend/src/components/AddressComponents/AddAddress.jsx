import React, { useState } from "react";
import { DownOutlined, RollbackOutlined } from "@ant-design/icons";
import {Dropdown, message, Space} from "antd";
import addressTypeEnum from "../../../../backend/enum/addressTypeEnum.js";
import axiosInstance from "../../api/axiosInstance.js";

const addressType = Object.entries(addressTypeEnum).map(([key, value]) => ({
    key: value,   // "Home"
    label: value  // "Home"
}));

function AddAddress({ onBack, onSave }) {
    const [selectedAddressType, setSelectedAddressType] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [others, setOthers] = useState("");

    const handleSaveAddress = async () => {
        if (!selectedAddressType || !selectedCountry || !selectedCity || !selectedDistrict || !state || !street) {
            message.warning("All fields must be filled!");
            return;
        }

        const newAddress = {
            addressType: selectedAddressType,
            country: selectedCountry,
            city: selectedCity,
            state: state,
            district: selectedDistrict,
            street: street,
            others: others,
        };

        try {
            const response = await axiosInstance.post("/addresses", newAddress);
            if (response.status === 201) {
                message.success("New address successfully added!");
                console.log("response.data.address_id",response.data.address);
                const formattedAddress = {
                    id: response.data.address.address_id,
                    label: newAddress.addressType,
                    value: [
                        newAddress.country,
                        newAddress.city,
                        newAddress.state,
                        newAddress.street,
                        newAddress.district,
                        newAddress.others
                    ].filter(Boolean).join(", "),
                    fullData: newAddress
                };
                onSave?.(formattedAddress);
            } else {
                message.error("Something went wrong!");
            }
        } catch (error) {
            if (error.response?.status === 400) message.warning("Empty Request");
            else if (error.response?.status === 500) message.error("Internal Server Error");
            else message.error("Unexpected error occurred");
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

                {/* Country */}
                <div className="dropdown-container-item">
                    <label>Country</label>
                    <input
                        type="text"
                        value={selectedCountry || ""}
                        onChange={e => setSelectedCountry(e.target.value)}
                        maxLength={255}
                    />
                </div>

                <div className="dropdown-container-item">
                    <label>City</label>
                    <input
                        type="text"
                        value={selectedCity || ""}
                        onChange={e => setSelectedCity(e.target.value)}
                        maxLength={255}
                    />
                </div>

                <div className="dropdown-container-item">
                    <label>District</label>
                    <input
                        type="text"
                        value={selectedDistrict || ""}
                        onChange={e => setSelectedDistrict(e.target.value)}
                        maxLength={255}
                    />
                </div>

                {/* State (Eyalet) */}
                <div className="dropdown-container-item">
                    <label>State / Province</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        maxLength={100}
                    />
                </div>

                {/* Street */}
                <div className="dropdown-container-item">
                    <label>Street</label>
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        maxLength={100}
                    />
                </div>

                {/* Others */}
                <div className="dropdown-container-item">
                    <label>Others</label>
                    <input
                        type="text"
                        value={others}
                        onChange={(e) => setOthers(e.target.value)}
                        maxLength={100}
                        placeholder="Additional info (optional)"
                    />
                </div>

                <div className="confirm-button" style={{ marginTop: 16 }}>
                    <button onClick={handleSaveAddress}>Save Address</button>
                </div>
            </div>
        </div>
    );
}

export default AddAddress;
