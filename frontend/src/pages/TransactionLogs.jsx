import React from "react";
import { Table } from "antd";


function TransactionLogs() {
    // TODO: Fetch data from DB
    const data = [
        {
            bankName: "Ziraat Bankası",
            personName: "Ahmet Yılmaz",
            personIban: "TR00 0000 0000 0000 0000 0000 00",
            amount: "1000₺",
            date: "2019-02-02",
        },
        {
            bankName: "Vakıfbank",
            personName: "Ayşe Demir",
            personIban: "TR11 1111 1111 1111 1111 1111 11",
            amount: "1500₺",
            date: "2019-02-02",
        },
    ];
    const columns = [
        {
            title: 'Bank Name',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Person Name',
            dataIndex: 'personName',
            key: 'personName',
        },
        {
            title: 'IBAN',
            dataIndex: 'personIban',
            key: 'personIban',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];
    const isDataExists = data.length > 0;
    return (
        <>
            {isDataExists ? (
                <Table
                    dataSource={data}
                    columns={columns}
                    scroll={{ x: "max-content" }}
                />

            ) : (
                <h5>There is no activity</h5>
            )}
        </>
    );
}

export default TransactionLogs;
