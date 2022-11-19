import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const StyledButton = styled(TouchableOpacity)`
  background: #12e2f6;
  border-radius: 10px;
  padding: 15px 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const ButtonLabel = styled(Text)`
  color: ${({ labelColor }) => labelColor ?? "#ffffff"};
  font-size: 16px;
  margin-left: ${(props) => (props.hasLeftIcon ? "10px" : 0)};
  margin-right: ${(props) => (props.hasRightIcon ? "10px" : 0)};
`;
const Button = ({
  leftIcon,
  leftIconColor,
  rightIcon,
  rightIconColor,
  title,
  labelColor,
  ...props
}) => {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  return (
    <StyledButton {...props}>
      {leftIcon && (
        <Ionicons name={leftIcon} size={20} color={leftIconColor || "white"} />
      )}
      <ButtonLabel
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        labelColor={labelColor}
      >
        {title}
      </ButtonLabel>
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={20}
          color={rightIconColor || "white"}
        />
      )}
    </StyledButton>
  );
};
export default Button;
