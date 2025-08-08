import React, {useState} from "react";
import {Button, Layout, Menu} from "antd";
import {
    DollarOutlined,
    BankOutlined,
    SwapOutlined,
    FileTextOutlined,
    SettingOutlined,
    UserOutlined, LogoutOutlined, EnvironmentOutlined
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function Profile() {
    const [collapsed, setCollapsed] = useState(false);
    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }
    function handleLogout() {}

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={toggleCollapsed}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2,
                        fontWeight: "bold",
                    }}
                >
                    <Link to="/profile" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                        <UserOutlined style={{ fontSize: 18, marginRight: collapsed ? 0 : 8 }} />
                        {!collapsed && <span>Welcome User</span>}
                    </Link>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                    <Menu.Item key="balance" icon={<DollarOutlined />}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile/balance">Balance</Link>
                    </Menu.Item>
                    <Menu.Item key="account" icon={<BankOutlined />}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile/accounts">Accounts</Link>
                    </Menu.Item>
                    <Menu.Item key="transfer" icon={<SwapOutlined />}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile/transfer">Money Transfer</Link>
                    </Menu.Item>
                    <Menu.Item key="logs" icon={<FileTextOutlined />}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile/transactions-logs">Last Logs</Link>
                    </Menu.Item>
                    <Menu.Item key="addresses" icon={<EnvironmentOutlined />}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile/addresses">Addresses</Link>
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile/user-settings">Settings</Link>
                    </Menu.Item>

                    {/* Logout öğesine marginTop:auto veriyoruz */}
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        style={{ marginTop: 'auto' }}
                        onClick={handleLogout}
                    >
                        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">Logout</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Content style={{ margin: "16px", background: "#fff" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Profile;