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
        const original = address.fullData;
        const updatedFields = {};

        const isEmpty = val =>
            val === null || val === undefined || (typeof val === "string" && val.trim() === "");

        if (!isEmpty(selectedAddressType) && selectedAddressType !== original.address_type) {
            updatedFields.addressType = selectedAddressType;
        }
        if (!isEmpty(selectedCountry) && selectedCountry !== original.country) {
            updatedFields.country = selectedCountry;
        }
        if (!isEmpty(selectedCity) && selectedCity !== original.city) {
            updatedFields.city = selectedCity;
        }
        if (!isEmpty(selectedDistrict) && selectedDistrict !== original.district) {
            updatedFields.district = selectedDistrict;
        }
        if (!isEmpty(state) && state !== original.state_) {
            updatedFields.state = state;
        }
        if (!isEmpty(street) && street !== original.street) {
            updatedFields.street = street;
        }
        if (!isEmpty(others) && others !== original.others_) {
            updatedFields.others = others;
        }

        if (Object.keys(updatedFields).length === 0) {
            message.warning("Boş veya geçersiz değişiklik tespit edildi.");
            return;
        }

        try {
            const response = await axiosInstance.patch(`/addresses/${address.id}`, updatedFields);
            if (response.status === 200) {
                message.success("Adres başarıyla güncellendi.");

                const fullData = { ...original, ...updatedFields };
                const value = [
                    fullData.country,
                    fullData.city,
                    fullData.state_,
                    fullData.street,
                    fullData.district,
                    fullData.others_
                ].filter(Boolean).join(", ");

                onSave?.({
                    id: address.id,
                    label: fullData.address_type,
                    value,
                    fullData
                });
            } else {
                message.error("Bir hata oluştu.");
            }
        } catch (error) {
            message.error("Sunucu hatası.");
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
