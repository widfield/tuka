import React from "react";
import styled from "styled-components";
import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Wrapper = styled(View)`
  background: #262634;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  height: 100px;
  z-index: 3;
`;

const Item = styled(Pressable)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-color: ${(props) => (props.active ? "#12e2f6" : "transparent")};
  border-top-width: ${(props) => (props.active ? "5px" : "0px")};
  padding-top: ${(props) => (props.active ? "15px" : "20px")};
  min-width: 100px;
`;

const StyledText = styled(Text)`
  color: ${(props) => (props.active ? "#12e2f6" : "#5c5e6f")};
`;

const BottomNavigation = ({ activeNav, goTo }) => {
  const handleNavClick = (target) => {
    goTo(target);
  };
  return (
    <Wrapper>
      <Item
        active={activeNav === "events"}
        onPress={() => handleNavClick("events")}
      >
        <Ionicons
          name="calendar-outline"
          size={30}
          color={`${activeNav === "events" ? "#12e2f6" : "#5c5e6f"}`}
        />
        <StyledText active={activeNav === "events"}>Events</StyledText>
      </Item>
      <Item active={activeNav === "map"} onPress={() => handleNavClick("map")}>
        <Ionicons
          name="map-outline"
          size={30}
          color={`${activeNav === "map" ? "#12e2f6" : "#5c5e6f"}`}
        />
        <StyledText active={activeNav === "map"}>Map</StyledText>
      </Item>
      <Item
        active={activeNav === "account"}
        onPress={() => handleNavClick("account")}
      >
        <Ionicons
          name="person-outline"
          size={30}
          color={`${activeNav === "account" ? "#12e2f6" : "#5c5e6f"}`}
        />
        <StyledText active={activeNav === "account"}>Favourites</StyledText>
      </Item>
    </Wrapper>
  );
};

export default BottomNavigation;
