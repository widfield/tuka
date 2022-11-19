import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

const Title = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const ItemsContainer = styled(Animatable.View)`
  padding-left: 10px;
`;

const StyledText = styled(Text)`
  font-size: 20px;
`;

const Expandable = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View>
      <Title>
        <StyledText onPress={() => setIsExpanded((prev) => !prev)}>
          {title}
        </StyledText>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={30}
          color="black"
          onPress={() => setIsExpanded((prev) => !prev)}
        />
      </Title>
      {isExpanded && (
        <ItemsContainer animation="fadeInDown" duration={300}>
          {children}
        </ItemsContainer>
      )}
    </View>
  );
};

export default Expandable;
