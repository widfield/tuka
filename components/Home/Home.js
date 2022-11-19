import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";

import withModal from "../hoc/withModal";

import BottomNavigation from "../BottomNavigation/BottomNavigation";

import Map from "../Map/Map";
import Explore from "../Explore/Explore";
import Account from "../User/Account";
import { useRecoilState } from "recoil";
import { likedEventsState } from "../../store";
import * as SecureStore from "expo-secure-store";
import { getSubscribedEvents } from "../api/apis/getSubscribedEvents";

const Container = styled(View)`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
`;

const Content = styled(View)`
  height: 89%;
  position: relative;
`;

const TopLayerContent = styled(View)`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 999;
`;

const screenMap = {
  map: (props) => (
    <Map
      setModal={props.setModal}
      navigation={props.navigation}
      setTopLayerContent={props.setTopLayerContent}
      setActiveNav={props.setActiveNav}
    />
  ),
  events: (props) => <Explore navigation={props.navigation} />,
  account: (props) => <Account {...props} />,
};

const Home = ({ setModal, navigation }) => {
  const [activeNav, setActiveNav] = useState("map");
  const [topLayerContent, setTopLayerContent] = useState(null);
  const [likedEvents, setLikedEvents] = useRecoilState(likedEventsState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      (async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        if (likedEvents.length === 0 && !!token) {
          const events = await getSubscribedEvents(token)
            .then((res) => res.data)
            .catch((e) => console.log(e));

          setLikedEvents(events.data);
        }
      })();
    });
    return unsubscribe;
  });

  return (
    <Container>
      {topLayerContent && <TopLayerContent>{topLayerContent}</TopLayerContent>}
      <Content>
        {screenMap[activeNav]({
          setModal,
          navigation,
          setTopLayerContent,
          setActiveNav,
        })}
      </Content>
      <BottomNavigation activeNav={activeNav} goTo={setActiveNav} />
    </Container>
  );
};

export default withModal(Home);
