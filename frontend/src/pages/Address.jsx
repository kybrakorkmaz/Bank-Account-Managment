import React, {useEffect, useState} from "react";
import AddAddress from "../components/AddressComponents/AddAddress.jsx";
import ChangeAddress from "../components/AddressComponents/ChangeAddress.jsx";
import {message, Modal} from "antd";
import axiosInstance from "../api/axiosInstance.js";
function AddressSection() {
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        async function addressList(){
            try{
                const response = await axiosInstance.get("/addresses");
                const rawList = response.data.addresses;
                const list = rawList.map((addr, i)=>({
                    id: addr.address_id,
                    label: addr.address_type,
                    value: [
                        addr.country,
                        addr.city,
                        addr.state_,
                        addr.street,
                        addr.district,
                        addr.others_
                    ].filter(Boolean).join(", "),
                    fullData: addr
                }));
                setAddresses(list);
            }catch (error){
                if (error.response?.status === 400) {
                    message.warning("No address found!");
                }

                if(error.response?.status ===  500) {
                    message.warning("İnternal Service Error!");
                }
            }

        }
        addressList();
    }, []);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [mode, setMode] = useState(null);

    function handleAddressClick(id) {
        console.log("Selected Address:", id);
        setSelectedAddressId(id);
    }

    function handleDelete() {
        if (!selectedAddressId) {
            message.warning("Please select an address to delete.");
            return;
        }

        const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

        Modal.confirm({
            title: "Delete Address",
            content: (
                <>
                    <p><strong>{selectedAddress.label}</strong> — Are you sure you want to delete this address?</p>
                    <p>{selectedAddress.value}</p>
                </>
            ),
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const response = await axiosInstance.delete(`/addresses/${selectedAddressId}`);
                    if (response.status === 200) {
                        message.success("Address deleted successfully!");
                        setAddresses(prev => prev.filter(addr => addr.id !== selectedAddressId));
                        setSelectedAddressId(null);
                        setMode(null);
                    }
                } catch (error) {
                    if (error.response?.status === 404) {
                        message.error("Address not found or already deleted");
                    } else if (error.response?.status === 500) {
                        message.error("Internal Server Error");
                    } else {
                        message.error("Something went wrong");
                    }
                }
            },
            onCancel: () => {
                console.log("Delete Process Canceled");
            }
        });
    }


    function handleAdd() {
        setMode("add");
    }

    function handleChange() {
        if (!selectedAddressId) {
            alert("Please select and address.");
            return;
        }
        setMode("edit");
    }

    return (
        <div className="address-section">
            {!mode && (
                <>
                    <div className="address-section-button-group">
                        <button onClick={handleAdd}>Add</button>
                        <button onClick={handleChange}>Change</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>

                    {addresses.length > 0 &&
                        addresses.map(addr => (
                            <div
                                key={addr.id}
                                className={`address-item ${selectedAddressId === addr.id ? "selected" : ""}`}
                                onClick={() => handleAddressClick(addr.id)}
                            >
                                <div className="address-item-label-group">
                                    <label>Address Type</label>
                                    <label>{addr.label}</label>
                                </div>
                                <div className="address-item-input">
                                    <input
                                        type="text"
                                        value={addr.value}
                                        readOnly
                                        onClick={() => handleAddressClick(addr.id)}
                                    />
                                </div>
                            </div>
                        ))}
                </>
            )}

            {mode === "add" && (
                <AddAddress
                    onBack={() => setMode(null)}
                    onSave={newAddress => {
                        setAddresses(prev => [...prev, newAddress]);
                        setMode(null);
                    }}
                />
            )}

            {mode === "edit" && selectedAddressId && (
                <ChangeAddress
                    address={addresses.find(addr => addr.id === selectedAddressId)}
                    onBack={() => setMode(null)}
                    onSave={updatedAddress => {
                        setAddresses(prev =>
                            prev.map(addr =>
                                addr.id === updatedAddress.id ? updatedAddress : addr
                            )
                        );
                        setMode(null);
                    }}
                />
            )}
        </div>
    );
}

export default AddressSection;
