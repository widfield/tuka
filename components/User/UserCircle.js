import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Circle = styled(TouchableOpacity)`
  height: ${(props) => `${props.size}px` || "50px"};
  width: ${(props) => `${props.size}px` || "50px"};
  border-radius: ${(props) => `${props.size / 2}px` || "25px"};
  border: 5px solid #12e2f6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  color: #12e2f6 ;
  font-size: ${(props) => `${props.size / 2.5}px` || "25px"};
`;

const UserCircle = ({ firstName, lastName, onPress, size = 50 }) => {
  const initials = `${firstName ? firstName[0] : ""}${
    lastName ? lastName[0] : ""
  }`;
  return (
    <Circle onPress={onPress} size={size}>
      <StyledText size={size}>{initials}</StyledText>
    </Circle>
  );
};

export default UserCircle;
