import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown, Space, Button,message } from "antd";
import { DesktopOutlined, ClockCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined } from "@ant-design/icons";
import { assets } from "../assets/assets";
import { signOut, auth } from "../firebaseConfig";
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("User"); // Lưu tên người dùng
  const [userPhoto, setUserPhoto] = useState(""); // Lưu ảnh đại diện
  const navigate = useNavigate();

  // Lấy tên và ảnh từ Firebase Auth
  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
      setUserPhoto(auth.currentUser.photoURL || "https://i.pravatar.cc/40"); // Ảnh mặc định nếu không có
    }
  }, []);
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(`/${key}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear(); // Xóa tất cả thông tin đăng nhập
    message.success("Bạn đã đăng xuất thành công!");
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
        style={{ backgroundColor: "#A0E9FF", paddingTop: "10px", textAlign: "center", borderRight: "1px solid #ddd" }}
      >
        <div style={{ padding: "12px 0", display: "flex", justifyContent: "center" }}>
          <img
            src={assets.logo}
            alt="Logo"
            style={{
              width: collapsed ? "50px" : "150px",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          style={{ borderRight: "none", fontSize: "16px", backgroundColor: "#CDF5FD" }}
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
              <span style={{ fontSize: "16px", fontWeight: "500" }}>{userName}</span> {/* Hiển thị tên */}
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

        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
            color: "#7f8c8d",
            padding: "10px",
            borderTop: "1px solid #ddd",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
