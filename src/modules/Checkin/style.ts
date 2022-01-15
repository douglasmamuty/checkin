import { Result } from "antd";
import styled, { css } from "styled-components";
import { IMessageWelcomeProps } from "./interface";

export const MessageWelcome = styled(Result)<IMessageWelcomeProps>`
  ${(props) =>
    props.isMobile &&
    css`
      padding: 0px !important;
      .ant-result-title {
        line-height: 1;
        font-size: 20px;
      }
      .ant-result-subtitle {
        line-height: 1;
        font-size: 12px;
        margin-top: 10px;
      }
    `}
`;
