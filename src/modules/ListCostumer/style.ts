import { List } from "antd";
import styled from "styled-components";

export const LogoImg = styled.img<any>`
  margin: 10px;
  width: 190px;
  min-height: 40px;
`;

export const ListStyled = styled(List)<any>`
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  width: 100%;
  padding: 15px;
`;
