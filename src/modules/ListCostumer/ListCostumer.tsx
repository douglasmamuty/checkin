import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Drawer,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { Container } from "../../components";
import { useCostumer } from "../../context/Costumer";
import { ListStyled } from "./style";
import ListItem from "./ListItem";
import { ICostumer } from "../../context/interface";
import moment from "moment";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

// eslint-disable-next-line react/prop-types
const DescriptionItem = ({ title, content }) => (
  <Row gutter={10}>
    <Col>
      <Typography.Text>{title}:</Typography.Text>
    </Col>
    <Col>
      <Typography.Text>{content}</Typography.Text>
    </Col>
  </Row>
);

const ListCostumer: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const navigate = useNavigate();
  const { costumer, removeCostumer } = useCostumer();
  const [visibleMoreInfo, setVisibleMoreInfo] = useState<boolean>(false);
  const [currentCostumer, setCurrentCostumer] = useState<ICostumer>(
    {} as ICostumer
  );
  const [loading, setLoading] = useState<boolean>(true);

  setTimeout(
    function () {
      setLoading(false);
    }.bind(this),
    3000
  );

  const handleContentDrawer = useCallback(
    () => (
      <Container direction="vertical">
        <Typography.Title level={3}>Passo 1</Typography.Title>
        <DescriptionItem
          title="Nome Completo"
          content={`${currentCostumer.name} ${currentCostumer.lastname}`}
        />
        <DescriptionItem title="Email" content={currentCostumer.email} />
        <DescriptionItem title="Telefone" content={currentCostumer.phone} />
        <Divider />
        <Typography.Title level={3}>Passo 2</Typography.Title>
        <DescriptionItem title="CEP" content={currentCostumer.cep} />
        <DescriptionItem
          title="Endereço Principal"
          content={currentCostumer.address}
        />
        <DescriptionItem
          title="Endereço Alternativo"
          content={currentCostumer.addressAlternate}
        />
        <Divider />
        <Typography.Title level={3}>Passo 3</Typography.Title>
        <DescriptionItem
          title="Data Nascimento"
          content={moment(currentCostumer.birthday).format("DD/MM/YYYY")}
        />
        <DescriptionItem title="CPF" content={currentCostumer.cpf} />
        <DescriptionItem title="Renda" content={currentCostumer.salary} />
      </Container>
    ),
    [currentCostumer]
  );

  return (
    <>
      <Container direction="vertical">
        <Row justify="space-between" align="middle">
          <Col>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Cliente</Breadcrumb.Item>
              <Breadcrumb.Item>Lista</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col>
            <Button
              type="primary"
              key="new-costumer"
              icon={<PlusOutlined />}
              onClick={() => navigate("/new")}
            >
              Criar
            </Button>
          </Col>
        </Row>
      </Container>
      <Container padding="0px">
        <ListStyled
          dataSource={costumer && costumer}
          renderItem={(item, key) => (
            <Skeleton loading={loading} active>
              <ListItem
                item={item}
                key={key}
                handleActionMoreInfo={(item: ICostumer) => {
                  setCurrentCostumer(item);
                  setVisibleMoreInfo(true);
                }}
                handleActionRemove={(item: ICostumer) => {
                  removeCostumer(item.cpf);
                }}
              />
            </Skeleton>
          )}
        ></ListStyled>

        {currentCostumer && (
          <Drawer
            width={isMobile ? "100vw" : "50vw"}
            placement="right"
            closable={false}
            onClose={() => {
              setVisibleMoreInfo(false);
            }}
            visible={visibleMoreInfo}
          >
            <Container>
              <Row justify="end">
                <Col>
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setVisibleMoreInfo(false);
                    }}
                  ></Button>
                </Col>
              </Row>
            </Container>
            {handleContentDrawer()}
          </Drawer>
        )}
      </Container>
    </>
  );
};

export default ListCostumer;
