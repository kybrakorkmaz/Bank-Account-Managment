import React, { useState } from "react";
import AddAddress from "../components/AddressComponents/AddAddress.jsx";
import ChangeAddress from "../components/AddressComponents/ChangeAddress.jsx";
import { Modal } from "antd";

function AddressSection() {
    const [addresses, setAddresses] = useState([
        { id: 1, label: "Home", value: "İstanbul, Türkiye", fullData: {} },
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [mode, setMode] = useState(null);

    function handleAddressClick(id) {
        console.log("Selected Address:", id);
        setSelectedAddressId(id);
    }

    function handleDelete() {
        console.log("Delete Clicked");

        if (!selectedAddressId) {
            alert("Please select an address to delete.");
            return;
        }

        const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

        console.log("Address will be deleted:", selectedAddress);

        Modal.confirm({
            title: "Delete Address",
            content: (
                <>
                    <p><strong>{selectedAddress.label}</strong>Are you sure you want to delete that address?</p>
                    <p>{selectedAddress.value}</p>
                </>
            ),
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => {
                setAddresses(prev =>
                    prev.filter(addr => addr.id !== selectedAddressId)
                );
                setSelectedAddressId(null);
                setMode(null); // reset setMode after deleting
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
