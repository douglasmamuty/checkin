import React, { useEffect, useState } from "react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { HeaderStyled, LogoImg } from "./style";
import { modules } from "../";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Template: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const location = useLocation();
  const [current, setCurrent] = useState<string>(location.pathname);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderStyled>
        <Row justify="space-between">
          <Col>
            <LogoImg src={require("../../assets/logo.png")} alt="logo" />
          </Col>
          <Col>
            <MediaQuery maxWidth={600}>
              <Button
                style={{ color: " #fff" }}
                type="link"
                onClick={toggleMenu}
                icon={<MenuOutlined />}
              ></Button>
            </MediaQuery>
          </Col>
        </Row>
      </HeaderStyled>

      <Layout>
        <Sider
          style={
            isMobile
              ? { position: "absolute", height: "100vh", zIndex: 2 }
              : undefined
          }
          trigger={isMobile ? null : undefined}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          collapsedWidth={isMobile ? 0 : undefined}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
            onClick={handleClick}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Cliente">
              <Menu.Item key="/new">
                <Link to="/new">Novo</Link>
              </Menu.Item>
              <Menu.Item key="/list">
                <Link to="/list">Lista</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
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
    </Layout>
  );
};

export default Template;
