import { SpaceProps } from "antd/lib/space";

export interface IContainerProps extends SpaceProps {
  padding?: string;
  transparent?: boolean;
}

export interface ICustomContainerProps extends SpaceProps {
  padding?: string;
  transparent?: string;
}
