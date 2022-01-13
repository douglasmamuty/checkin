import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LogoImg } from "./style";
import { modules } from "../";
import { Route, Link, Routes } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const Template: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <LogoImg src={require("../../assets/logo.png")} alt="logo" />

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<UserOutlined />} title="Cliente">
            <Menu.Item key="new-client">
              <Link to="/new">Novo</Link>
            </Menu.Item>
            <Menu.Item key="list">
              <Link to="/list">Lista</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            {modules.map((module) => (
              <Route
                path={module.path}
                element={<module.component />}
                key={module.key}
              />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Template;
