import styled, { css } from "styled-components";
import { Space } from "antd";

import { ICustomContainerProps } from "./interface";

export const CustomContainer = styled(Space)<ICustomContainerProps>`
  width: 100% !important;
  background-color: #ffffff;

  & > div {
    width: 100% !important;
  }

  padding: ${(props) => (props.padding ? props.padding : "15px 30px")};

  ${(props) =>
    props.transparent &&
    css`
      background-color: transparent;
    `}
`;
