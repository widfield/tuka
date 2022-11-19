import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { View, Text, Image } from "react-native";

const Container = styled(TouchableOpacity)`
  position: relative;
  height: 120px;
  width: 200px;
`;

const ImageOverlay = styled(View)`
  position: absolute;
  background-color: #000000;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  bottom: 0;
  border-radius: 10px;
`;

const VenuePicture = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const TextContainer = styled(View)`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 17px;
`;
const VenueTitle = styled(Text)`
  font-weight: bold;
  color: #ffffff;
`;
const EventText = styled(Text)`
  color: #12e2f6;
  padding-bottom: 10px;
`;

const VenueThumbnail = ({ data, onItemPress }) => {
  return (
    <Container onPress={() => onItemPress(data)} activeOpacity={0.5}>
      <VenuePicture
        source={{
          uri: `https://monkfish-app-n3daw.ondigitalocean.app${data?.profilePicUrl}`,
        }}
        style={{ width: 200, height: 120 }}
      />
      <ImageOverlay />
      <TextContainer>
        <VenueTitle>{data.name}</VenueTitle>
        <EventText>{data.events?.[0]?.name}</EventText>
      </TextContainer>
    </Container>
  );
};

export default VenueThumbnail;
