import React, {useEffect, useState} from "react";
import {message, Table} from "antd";
import axiosInstance from "../api/axiosInstance.js";
import dayjs from "dayjs";



const columns = [
    {
        title: "Action Type",
        dataIndex: "action_type",
        key: "action_type",
    },
    {
        title: "Counterparty IBAN",
        dataIndex: "counterparty_iban",
        key: "counterparty_iban",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (value) => `${value}₺`,
    },
    {
        title: "Date",
        dataIndex: "action_time",
        key: "action_time",
        render: (value) => dayjs(value).format("DD.MM.YYYY HH:mm"),
    },
];

function TransactionLogs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axiosInstance.get("/transaction");
                if (response.status === 200) {
                    setData(response.data.logs);
                } else {
                    message.warning("No transaction found");
                }
            } catch (error) {
                message.error("Failed to fetch transaction logs");
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);
    return (
        <>
            {data.length > 0 ? (
                <Table
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    rowKey={(record, index) => index}
                    scroll={{ x: "max-content" }}
                />
            ) : (
                <h5>No transaction activity</h5>
            )}
        </>
    );
}

export default TransactionLogs;
