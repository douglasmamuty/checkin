import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import { Button, Result } from "antd";

import { Container } from "../../components";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container direction="vertical">
      <Result
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

export default Dashboard;
