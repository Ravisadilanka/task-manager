import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { HomeOutlined, FileAddOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Header, Content } = Layout;

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return (
    <Layout>
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="logo">
          <Link to="/" >
            <Title level={3} style={{ color: "white", margin: 0 }}>
              My Task Manager
            </Title>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Breadcrumb */}
      <Breadcrumb style={{ margin: "16px 32px" }}>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Content style={{ padding: "0 50px", height: "100vh" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
