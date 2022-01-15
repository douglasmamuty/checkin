import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { Container } from "../../components";
import { useMediaQuery } from "react-responsive";
import { MessageWelcome } from "./style";

const Checkin: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 350 });
  const navigate = useNavigate();
  return (
    <Container
      direction="vertical"
      style={
        isMobile
          ? {
              height: "calc(100vh - 64px)",
              overflow: "hidden",
              justifyContent: "center",
            }
          : {
              height: "calc(100vh - 64px)",
              overflow: "hidden",
              justifyContent: "center",
            }
      }
      padding={isMobile ? "0px" : undefined}
    >
      <MessageWelcome
        isMobile={isMobile}
        status="404"
        title="Você não sabe oque fazer por aqui?"
        subTitle="Começa cadastrando um cliente. Este botão vai lhe ajudar!"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate("/new");
            }}
          >
            Cliente
          </Button>
        }
      />
    </Container>
  );
};

export default Checkin;
