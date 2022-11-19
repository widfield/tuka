import React from "react";
import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

const InputWrapper = styled(View)`
  border-radius: 10px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #1d192c;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledInput = styled(TextInput)`
  height: 100%;
  padding: 5px;
  width: 100%;
  color: #7477a0;
`;

const Input = ({
  leftIcon,
  leftIconColor,
  rightIcon,
  rightIconColor,
  ...props
}) => {
  return (
    <InputWrapper {...props}>
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={20}
          color={leftIconColor || "#7477a0"}
          style={{ paddingHorizontal: 10 }}
        />
      )}
      <StyledInput {...props} placeholderTextColor={"#7477a0"} />
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={20}
          color={rightIconColor || "#7477a0"}
        />
      )}
    </InputWrapper>
  );
};

export default Input;
