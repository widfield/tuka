import React from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";
import H1 from "../Common/H1";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

const Container = styled(View)`
  background: #282736;

  height: 100%;
`;

const SectionTitle = styled(H1)``;

const StyledText = styled(Text)`
  color: #9fa4b7;
  padding: 12px 0;
`;

const EventPicture = styled(Image)`
  width: 100%;
  height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const InfoContainer = styled(View)`
  padding: 12px 19px;
`;

const Wrapper = styled(View)`
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HighlitedText = styled(Text)`
  color: #12e2f6;
  font-size: 15px;
  font-weight: bold;
  margin-left: 16px;
`;

const ButtonWrapper = styled(View)`
  width: 150px;
  margin-top: 10px;
`;

const EventModal = ({ eventData }) => {
  const date = dayjs(eventData?.date).format("DD/MM/YYYY");
  return (
    <Container>
      {eventData?.image?.href && (
        <EventPicture source={{ uri: eventData?.image?.href }} />
      )}
      <InfoContainer>
        <SectionTitle>{eventData.name}</SectionTitle>
        <StyledText>{eventData.description}</StyledText>
        <Wrapper>
          <Ionicons name="calendar-outline" size={30} color="#12e2f6" />
          <HighlitedText>{date}</HighlitedText>
        </Wrapper>
        <Wrapper>
          <Ionicons name="cash-outline" size={30} color="#12e2f6" />
          <HighlitedText>{eventData.price ?? "Free"}</HighlitedText>
        </Wrapper>
        {/* <ButtonWrapper>
          <Button title="View Venue" />
        </ButtonWrapper> */}
      </InfoContainer>
    </Container>
  );
};

export default EventModal;
