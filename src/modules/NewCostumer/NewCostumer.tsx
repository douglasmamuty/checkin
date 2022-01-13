import React, { useCallback, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Result,
  Row,
  Space,
  Steps,
} from "antd";
import { StepsStyled } from "./style";
import { Container } from "../../components";

const NewCostumer: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const steps = [
    {
      key: 0,
    },
    {
      key: 1,
    },
    {
      key: 2,
    },
    {
      key: 3,
    },
  ];

  const handleFormChange = useCallback(
    (key: number) => {
      switch (key) {
        case 0:
          return (
            <>
              <Form.Item
                name={["user", "name"]}
                label="Nome"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={["user", "lastname"]} label="Sobrenome">
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Email"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "phone"]}
                label="Telefone"
                rules={[{ type: "number", min: 0, max: 99 }]}
              >
                <InputNumber />
              </Form.Item>
            </>
          );
          break;
        case 1:
          return (
            <>
              <Form.Item name={["user", "cep"]} label="CEP">
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "address"]}
                label="Endereço 1"
                tooltip="Endereço principal!"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "addressAlternate"]}
                label="Endereço 2"
                tooltip="Endereço alternativo!"
              >
                <Input />
              </Form.Item>
            </>
          );
          break;
        case 2:
          return (
            <>
              <Form.Item name={["user", "cpf"]} label="CPF">
                <Input />
              </Form.Item>
              <Row>
                <Col>
                  <Form.Item name={["user", "cep"]} label="Data de Nasc.">
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="ex.: 21/05/1993"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name={["user", "salary"]} label="Renda Mensal">
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>
            </>
          );
          break;
        case 3:
          return (
            <Result
              status="success"
              title="Successfully Purchased Cloud Server ECS!"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button type="primary" key="console">
                  Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
              ]}
            />
          );
          break;
        default:
          break;
      }
    },
    [current]
  );

  const onChange = (current: number) => {
    setCurrent(current);
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Container direction="vertical">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Cliente</Breadcrumb.Item>
        <Breadcrumb.Item>Novo</Breadcrumb.Item>
      </Breadcrumb>

      <StepsStyled current={current} onChange={onChange}>
        {steps.map((item) => (
          <Steps.Step key={item.key} />
        ))}
      </StepsStyled>
      <Container>
        <Form
          name="creation"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
        >
          {handleFormChange(current)}
        </Form>
      </Container>

      {current !== 3 && (
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => console.log("next")}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => console.log("prev")}
            >
              Previous
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default NewCostumer;
