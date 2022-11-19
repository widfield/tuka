import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import UserCircle from "./UserCircle";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Common/Button";
import * as SecureStore from "expo-secure-store";
import Link from "../Common/Link";
import Event from "../Event/Event";
import { useRecoilState, useRecoilValue } from "recoil";
import { likedEventsState, userState } from "../../store";
import dayjs from "dayjs";
import EventModal from "../Event/EventModal";
import withModal from "../hoc/withModal";

const Wrapper = styled(View)`
  background-color: #2d2c3c;
  height: 100%;
  width: 100%;
  padding: 0 19px;
`;

const Header = styled(View)`
  height: 90px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const Heading = styled(Text)`
  color: #ffffff;
  font-size: 25px;
`;

const ProfilePicWrapper = styled(View)`
  display: flex;
  margin-top: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LoggedOutContainer = styled(View)`
  text-align: center;
  display: flex;
  height: 100%;
  margin-top: 50%;
  justify-content: space-between;
`;

const StyledText = styled(Text)`
  color: #ffffff;
  font-size: 21px;
  text-align: center;
  padding-bottom: 20px;
`;

const Subtext = styled(Text)`
  color: #9fa4b7;
  font-size: 15px;
  text-align: center;
  padding-bottom: 20px;
`;

const ButtonWrapper = styled(View)`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Footer = styled(View)`
  margin-bottom: 290px;
`;

const StyledButton = styled(Button)`
  width: 230px;
`;

const EventWrapper = styled(View)`
  margin-bottom: 11px;
`;

const Account = ({ navigation, setModal }) => {
  const [user, setUser] = useRecoilState(userState);
  const events = useRecoilValue(likedEventsState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      updateUser();
    });
    return unsubscribe;
  });

  const updateUser = async () => {
    const firstName = await SecureStore.getItemAsync("firstName");
    const lastName = await SecureStore.getItemAsync("lastName");
    const email = await SecureStore.getItemAsync("email");

    const hasUser = firstName && lastName && email;
    if (hasUser) {
      setUser({ firstName, lastName, email });
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  const isLoggedIn = !!user;

  const upcomingEvents = [...events]
    .filter((e) => dayjs().isBefore(dayjs(e.date)))
    .sort((a, b) => {
      if (dayjs(a.date).isBefore(dayjs(b.date))) {
        return -1;
      }
      if (!dayjs(a.date).isBefore(dayjs(b.date))) {
        return 1;
      }
      return 0;
    });

  const handleEventPress = (event) => {
    setModal({
      content: <EventModal eventData={event} />,
      options: {
        height: 600,
        customStyles: {
          wrapper: {
            backgroundColor: "#141329",
            opacity: 0.99,
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,

            backgroundColor: "#282736",
          },
        },
      },
    });
  };

  return (
    <Wrapper>
      <Header>
        <Heading>Profile</Heading>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={30} color={"#5b5e6f"} />
        </TouchableOpacity>
      </Header>
      {isLoggedIn ? (
        <>
          <ProfilePicWrapper>
            <UserCircle
              firstName={user.firstName}
              lastName={user.lastName}
              size={120}
            />
            <StyledText style={{ marginTop: 10, paddingBottom: 5 }}>
              {`${user.firstName} ${user.lastName}`}
            </StyledText>
            <Subtext>{user.email}</Subtext>
          </ProfilePicWrapper>
          <StyledText
            style={{ fontSize: 18, paddingBottom: 15, textAlign: "left" }}
          >
            Upcoming Events
          </StyledText>
          <ScrollView vertical>
            {upcomingEvents.map((e) => (
              <TouchableOpacity onPress={() => handleEventPress(e)} key={e.id}>
                <EventWrapper>
                  <Event data={e} />
                </EventWrapper>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <LoggedOutContainer>
          <View>
            <StyledText>Hi, it seems like you aren't logged in!</StyledText>
            <Subtext>
              Please Sign In / Register in order to save your favorite venues,
              future and past events.
            </Subtext>
            <ButtonWrapper>
              <StyledButton
                title="Log in"
                onPress={() => navigation.navigate("Login")}
              />
            </ButtonWrapper>

            <Subtext>OR</Subtext>
            <Subtext>
              Don't have an account?{" "}
              <Link
                onPress={() => navigation.navigate("Register")}
                label="Sign up"
              />
            </Subtext>
          </View>
          <Footer>
            <Subtext>
              Are you a Venue owner? {"\n"} List and promote your events{" "}
              <Link
                onPress={() => navigation.navigate("Register")}
                label="here."
              />
            </Subtext>
          </Footer>
        </LoggedOutContainer>
      )}
    </Wrapper>
  );
};

export default withModal(Account);
