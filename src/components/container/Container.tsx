import React from "react";

import { CustomContainer } from "./styles";
import { IContainerProps } from "./interface";

const Container: React.FC<IContainerProps> = ({
  children,
  padding,
  transparent,
  ...res
}) => {
  return (
    <CustomContainer
      {...res}
      data-testid="container-test"
      padding={padding}
      transparent={transparent ? "true" : ""}
    >
      {children}
    </CustomContainer>
  );
};

export default Container;
