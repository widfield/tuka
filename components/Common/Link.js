import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const StyledLink = styled(Text)`
  color: ${({ variant }) => (variant === "primary" ? "#12E2F6" : "#fff")};
`;

const Link = ({ label, variant = "primary", onPress }) => (
  <StyledLink onPress={onPress} variant={variant}>
    {label}
  </StyledLink>
);

export default Link;
