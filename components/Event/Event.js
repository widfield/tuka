import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { subscribeToEvent } from "../api/apis/subscribeToEvent";
import * as SecureStore from "expo-secure-store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedEventsState } from "../../store";
import { unsubscribeFromEvent } from "../api/apis/unsubscribeFromEvent";
import dayjs from "dayjs";

const Wrapper = styled(View)`
  background: #0b0b15;
  border-radius: 10px;
  display: flex;
  height: 82px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const EventName = styled(Text)`
  color: #ffffff;
  padding-bottom: 7px;
`;

const EventDate = styled(Text)`
  color: #12e2f6;
`;

const EventImage = styled(Image)`
  height: 51px;
  width: 51px;
  margin-right: 11px;
`;

const InfoWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 16px;
`;

const TextWrapper = styled(View)`
  display: flex;
`;

const LikeButton = styled(TouchableOpacity)`
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: row;

  padding-top: 25px;
`;

const Event = ({ data, onUnauthorizedLike }) => {
  const subscribedEvents = useRecoilValue(likedEventsState);
  const setSubscribedEvents = useSetRecoilState(likedEventsState);
  const isLiked = !!subscribedEvents.find((e) => e.id === data.id);

  const date = dayjs(data?.date).format("DD/MM/YYYY");

  const onEventLikeClick = async (e) => {
    e.stopPropagation();

    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      if (isLiked) {
        await unsubscribeFromEvent(data.id, token)
          .then(() => {
            setSubscribedEvents((prev) => {
              const eventIndex = subscribedEvents.findIndex(
                (e) => e.id === data.id
              );
              const leftoverEvents = [...prev];
              leftoverEvents.splice(eventIndex, 1);
              return leftoverEvents;
            });
          })
          .catch((e) => console.log(e));
      } else {
        await subscribeToEvent(data.id, token)
          .then(() => {
            setSubscribedEvents((prev) => [...prev, data]);
          })
          .catch((e) => console.log(e));
      }
    } else {
      onUnauthorizedLike();
    }
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <EventImage source={{ uri: data?.image?.href }} />
        <TextWrapper>
          <EventName>{data?.name}</EventName>
          <EventDate>{date}</EventDate>
        </TextWrapper>
      </InfoWrapper>
      <LikeButton onPress={onEventLikeClick}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={30}
          color={"#12e2f6"}
        />
      </LikeButton>
    </Wrapper>
  );
};

export default Event;
