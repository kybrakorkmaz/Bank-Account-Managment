import React, { useState, useEffect } from "react";
import { DownOutlined, RollbackOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const addressType = [
    { label: "Home", key: "Home" },
    { label: "Office", key: "Office" },
    { label: "Other", key: "Other" },
];

const countries = [
    { label: "Turkey", key: "Turkey" },
    { label: "USA", key: "USA" },
    { label: "Germany", key: "Germany" },
];

const cities = {
    Turkey: [
        { label: "Istanbul", key: "Istanbul" },
        { label: "Ankara", key: "Ankara" },
        { label: "Izmir", key: "Izmir" },
    ],
    USA: [
        { label: "New York", key: "NewYork" },
        { label: "Los Angeles", key: "LosAngeles" },
        { label: "Chicago", key: "Chicago" },
    ],
    Germany: [
        { label: "Berlin", key: "Berlin" },
        { label: "Munich", key: "Munich" },
        { label: "Hamburg", key: "Hamburg" },
    ],
};

const districts = {
    Istanbul: [
        { label: "Kadikoy", key: "Kadikoy" },
        { label: "Besiktas", key: "Besiktas" },
        { label: "Uskudar", key: "Uskudar" },
    ],
    Ankara: [
        { label: "Cankaya", key: "Cankaya" },
        { label: "Kecioren", key: "Kecioren" },
    ],
    NewYork: [
        { label: "Manhattan", key: "Manhattan" },
        { label: "Brooklyn", key: "Brooklyn" },
    ],
};

function ChangeAddress({ address, onBack, onSave }) {
    const [selectedAddressType, setSelectedAddressType] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [state_, setState_] = useState("");
    const [street, setStreet] = useState("");
    const [others_, setOthers_] = useState("");

    useEffect(() => {
        if (address) {
            setSelectedAddressType(address.fullData?.address_type || null);
            setSelectedCountry(address.fullData?.country || null);
            setSelectedCity(address.fullData?.city || null);
            setSelectedDistrict(address.fullData?.district || null);
            setState_(address.fullData?.state_ || "");
            setStreet(address.fullData?.street || "");
            setOthers_(address.fullData?.others_ || "");
        }
    }, [address]);

    const handleSave = () => {
        if (!selectedAddressType || !selectedCountry || !selectedCity || !selectedDistrict || !state_ || !street) {
            alert("Lütfen tüm zorunlu alanları doldurun (Adres türü, ülke, şehir, ilçe, eyalet, sokak).");
            return;
        }

        const updatedAddress = {
            id: address.id,
            label: selectedAddressType,
            value: `${street}, ${selectedDistrict}, ${selectedCity}, ${state_}, ${selectedCountry}`,
            fullData: {
                address_type: selectedAddressType,
                country: selectedCountry,
                city: selectedCity,
                state_: state_,
                district: selectedDistrict,
                street: street,
                others_: others_,
            },
        };

        onSave?.(updatedAddress);
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
                    <div className="dropdown-label"><label>Country</label></div>
                    <Dropdown menu={{ items: countries, onClick: ({ key }) => {
                            setSelectedCountry(key);
                            setSelectedCity(null);
                            setSelectedDistrict(null);
                        }}}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                {selectedCountry
                                    ? countries.find(c => c.key === selectedCountry)?.label
                                    : "Select Country"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

                {/* City */}
                <div className="dropdown-container-item">
                    <div className="dropdown-label"><label>City</label></div>
                    <Dropdown menu={{ items: selectedCountry ? cities[selectedCountry] || [] : [], onClick: ({ key }) => {
                            setSelectedCity(key);
                            setSelectedDistrict(null);
                        }}}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                {selectedCity
                                    ? cities[selectedCountry]?.find(c => c.key === selectedCity)?.label
                                    : "Select City"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

                {/* District */}
                <div className="dropdown-container-item">
                    <div className="dropdown-label"><label>District</label></div>
                    <Dropdown menu={{ items: selectedCity ? districts[selectedCity] || [] : [], onClick: ({ key }) => setSelectedDistrict(key) }}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                {selectedDistrict
                                    ? districts[selectedCity]?.find(d => d.key === selectedDistrict)?.label
                                    : "Select District"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

                {/* State */}
                <div className="dropdown-container-item">
                    <label>State / Province</label>
                    <input
                        type="text"
                        value={state_}
                        onChange={e => setState_(e.target.value)}
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
                        value={others_}
                        onChange={e => setOthers_(e.target.value)}
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
