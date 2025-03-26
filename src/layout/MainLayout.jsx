import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown, Space, Button, message } from "antd";
import {
  DesktopOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { assets } from "../assets/assets";
import { signOut, auth } from "../firebaseConfig";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState(
    location.pathname.substring(1) || "dashboard"
  );

  useEffect(() => {
    setSelectedKey(location.pathname.substring(1) || "dashboard");
  }, [location.pathname]);

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
      setUserPhoto(auth.currentUser.photoURL || "https://i.pravatar.cc/40");
    }
  }, []);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(`/${key}`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    message.success("Logout Successful!");
    navigate("/login");
  };

  const userMenuItems = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { key: "logout", label: "Logout", onClick: handleLogout },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "white",
          paddingTop: "10px",
          textAlign: "center",
          borderRight: "1px solid #ddd",
        }}
      >
        <div
          style={{
            padding: "12px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={assets.logo}
            alt="Logo"
            style={{
              width: collapsed ? "50px" : "50px",
              transition: "width 0.3s ease-in-out",
            }}
          />
          <p
            className={`text-lg font-medium transition-all duration-300 ${
              collapsed ? "hidden" : "block"
            } ml-2`}
          >
            FHealth Care
          </p>
        </div>
        <Menu
          theme="light"
          selectedKeys={[selectedKey]}
          mode="inline"
          style={{
            borderRight: "none",
            fontSize: "16px",
            backgroundColor: "white",
          }}
          onClick={handleMenuClick}
          items={[
            { key: "dashboard", icon: <DesktopOutlined />, label: "Dashboard" },
            { key: "patient", icon: <UserOutlined />, label: "Patient" },
            { key: "band", icon: <ClockCircleOutlined />, label: "Band" },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#333",
            }}
          />
          <h1 className="m-0 text-2xl text-gray-800">Welcome to Dashboard</h1>

          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <Space>
              <Avatar
                src={userPhoto}
                size={40}
                style={{ cursor: "pointer", backgroundColor: "#f39c12" }}
              />
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                {userName}
              </span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "20px",
            background: "#f9f9f9",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "2000px",
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              color: "#333",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
