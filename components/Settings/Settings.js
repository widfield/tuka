import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedEventsState, userState } from "../../store";
import BackButton from "../Common/BackButton/BackButton";
import * as SecureStore from "expo-secure-store";

const Wrapper = styled(View)`
  background-color: #2d2c3c;
  height: 100%;
  width: 100%;
  padding: 0 19px;
`;

const Header = styled(View)`
  height: 100px;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled(Text)`
  color: #ffffff;
  font-size: 25px;
  margin-left: 10px;
`;
const TitleWrapper = styled(View)`
  flex: 1;
  text-align: center;
`;

const ListItem = styled(TouchableOpacity)`
  background-color: #181a26;
  padding: 20px 24px;
  border-radius: 5px;
  margin-bottom: 8px;
`;

const StyledText = styled(Text)`
  color: #ffffff;
`;

const Settings = ({ navigation }) => {
  const setLikedEvents = useSetRecoilState(likedEventsState);
  const removeUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("firstName");
    await SecureStore.deleteItemAsync("lastName");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("accessToken");
    removeUser(null);
    setLikedEvents([]);
    navigation.navigate("Home");
  };

  const isLoggedIn = !!user;

  return (
    <Wrapper>
      <Header>
        <BackButton onPress={() => navigation.navigate("Home")} />
        <TitleWrapper>
          <Heading>Settings</Heading>
        </TitleWrapper>
      </Header>
      <ListItem>
        <StyledText>About Us</StyledText>
      </ListItem>
      <ListItem>
        <StyledText>List Your Venue</StyledText>
      </ListItem>
      <ListItem>
        <StyledText>Privacy Policy</StyledText>
      </ListItem>
      <ListItem>
        <StyledText>Support</StyledText>
      </ListItem>
      <ListItem>
        <StyledText>Terms & Conditions</StyledText>
      </ListItem>
      {isLoggedIn && (
        <ListItem onPress={handleLogout}>
          <StyledText>Logout</StyledText>
        </ListItem>
      )}
    </Wrapper>
  );
};

export default Settings;
