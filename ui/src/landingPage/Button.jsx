import React from "react";
import { Button as RebassButton } from "rebass";
import styled, { withTheme } from "styled-components";

const Button = styled(({ theme, ...props }) => (
  <RebassButton bg={theme.colors.primary} {...props} />
))`
  &:disabled {
    cursor: initial;
  }
  &:not(:disabled) {
    cursor: pointer;
  }
  &:focus {
    box-shadow: none;
  }
`;

export default withTheme(Button);
