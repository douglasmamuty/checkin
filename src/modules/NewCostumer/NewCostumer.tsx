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

const NewCostumer: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>();
  const { addCostumer } = useCostumer();

  const steps = [0, 1, 2, 3];

  const handleFormChange = useCallback(
    (key: number) => {
      switch (key) {
        case 0:
          return (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="lastname" label="Sobrenome">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ type: "email", required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Telefone"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      style={{ minWidth: "150px" }}
                      controls={false}
                      placeholder="(xx) xxxxx-xxxx"
                      formatter={(value) =>
                        `${value}`.replace(
                          /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/,
                          "($1) $2-$3"
                        )
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          );
          break;
        case 1:
          return (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="cep" label="CEP">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                <Col span={12}>
                  <Form.Item
                    name="addressAlternate"
                    label="Endereço 2"
                    tooltip="Endereço alternativo!"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          );
          break;
        case 2:
          return (
            <>
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item name="cpf" label="CPF">
                    <InputNumber
                      style={{ width: "100%" }}
                      controls={false}
                      // formatter={(value) =>
                      //   `${value}`.replace(
                      //     /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                      //     "$1.$2.$3-$4"
                      //   )
                      // }
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="birthday" label="Data de Nasc.">
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="ex.: 21/05/1993"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item name="salary" label="Renda Mensal">
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
                  Novo
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

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} é obrigatório!",
    types: {
      email: "${label} inválido!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    addCostumer({ ...formData, ...values });
    setCurrent(3);
  };

  const handleIsValidFormByStep = (): boolean => {
    switch (current) {
      case 0:
        return form.isFieldValidating(["name", "email", "phone"]);
        break;

      default:
        return false;
        break;
    }
  };

  const onMoveStep = (type: string) => {
    setFormData({ ...formData, ...form.getFieldsValue() });
    // if (!handleIsValidFormByStep()) {
    //   message.warning({
    //     content: "Você deve completar os campos obrigatorios!",
    //   });
    //   return;
    // }
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

      <StepsStyled current={current}>
        {steps.map((item) => (
          <Steps.Step key={item} />
        ))}
      </StepsStyled>
      <Container>
        <Form
          form={form}
          validateTrigger="onBlur"
          name="creation"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
        >
          {handleFormChange(current)}
        </Form>
      </Container>

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
            <Button type="primary" onClick={() => onMoveStep("next")}>
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
  );
};

export default NewCostumer;
