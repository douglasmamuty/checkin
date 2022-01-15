import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Steps,
} from "antd";
import { StepsStyled } from "./style";
import { Container } from "../../components";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useCostumer } from "../../context/Costumer";
import MaskedInput from "antd-mask-input";
import { useMediaQuery } from "react-responsive";

const NewCostumer: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>();
  const { addCostumer } = useCostumer();

  const steps = [0, 1, 2, 3];
  const validateMessages = {
    required: "${label} é obrigatório!",
  };

  const handleFormChange = useCallback(
    (key: number) => {
      switch (key) {
        case 0:
          return (
            <Form
              form={form}
              name="step-1"
              validateMessages={validateMessages}
              layout="vertical"
            >
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="lastname" label="Sobrenome">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ type: "email", required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="Telefone"
                    rules={[{ required: true }]}
                  >
                    <MaskedInput
                      mask="(11) 11111-1111"
                      placeholder="(xx) xxxxx-xxxx"
                    ></MaskedInput>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          );

        case 1:
          return (
            <Form
              form={form}
              name="step-2"
              validateMessages={validateMessages}
              layout="vertical"
            >
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="cep"
                    label="CEP"
                    rules={[{ required: true }]}
                  >
                    <MaskedInput
                      mask="11111-111"
                      placeholder="xxxxx-xxx"
                    ></MaskedInput>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="address"
                    label="Endereço 1"
                    tooltip="Endereço principal!"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="addressAlternate"
                    label="Endereço 2"
                    tooltip="Endereço alternativo!"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          );

        case 2:
          return (
            <Form
              form={form}
              name="step-3"
              validateMessages={validateMessages}
              layout="vertical"
            >
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6}>
                  <Form.Item
                    name="cpf"
                    label="CPF"
                    rules={[{ required: true }]}
                  >
                    <MaskedInput
                      mask="111.111.111-11"
                      placeholder="xxx.xxx.xxx-xx"
                    ></MaskedInput>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                  <Form.Item name="birthday" label="Data de Nasc.">
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="ex.: 21/05/1993"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6}>
                  <Form.Item name="salary" label="Renda Mensal">
                    <InputNumber
                      style={{ width: "100%" }}
                      step="0000000000000.00"
                      stringMode
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          );

        case 3:
          return (
            <Result
              status="success"
              title="Novo Cliente Cadastrado!"
              extra={[
                <Button
                  type="primary"
                  key="console"
                  icon={<UnorderedListOutlined />}
                  onClick={() => navigate("/list")}
                >
                  Lista
                </Button>,
                <Button
                  key="buy"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    form.resetFields();
                    setCurrent(0);
                  }}
                >
                  Cliente
                </Button>,
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

  const onFormFinish = (name, { values, forms }) => {
    switch (name) {
      case "step-1":
        setFormData({ ...formData, ...form.getFieldsValue() });
        onMoveStep("next");
        break;
      case "step-2":
        setFormData({ ...formData, ...form.getFieldsValue() });
        onMoveStep("next");
        break;
      case "step-3":
        addCostumer({ ...formData, ...values });
        setCurrent(3);
        break;

      default:
        break;
    }
  };

  const onMoveStep = (type: string) => {
    switch (type) {
      case "next":
        setCurrent(current + 1);
        break;
      case "prev":
        setCurrent(current - 1);
        break;
      default:
        break;
    }
  };

  return (
    <Container direction="vertical">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Cliente</Breadcrumb.Item>
        <Breadcrumb.Item>Novo</Breadcrumb.Item>
      </Breadcrumb>

      <Container direction={isMobile ? "horizontal" : "vertical"} padding="0">
        <StepsStyled
          current={current}
          direction={isMobile ? "vertical" : undefined}
        >
          {steps.map((item) => (
            <Steps.Step key={item} />
          ))}
        </StepsStyled>

        <Container direction="vertical" padding="0">
          <Form.Provider onFormFinish={onFormFinish}>
            {handleFormChange(current)}
          </Form.Provider>
          {current !== 3 && (
            <Row justify="end">
              {current > 0 && (
                <Button
                  style={{ margin: "0 8px" }}
                  onClick={() => onMoveStep("prev")}
                >
                  Anterior
                </Button>
              )}
              {current < steps.length - 1 && current !== steps.length - 2 && (
                <Button type="primary" onClick={() => form.submit()}>
                  Próximo
                </Button>
              )}
              {current === steps.length - 2 && (
                <Button type="primary" onClick={() => form.submit()}>
                  Criar
                </Button>
              )}
            </Row>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default NewCostumer;
