import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components";
import Expandable from "../Common/Expandable/Expandable";
import Modal from "react-native-modal";
import Input from "../Common/Input";

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  padding-top: 10px;
  padding-right: 15px;
  padding-left: 10px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const SectionTitle = styled(View)`
  border-bottom-width: 2px;
  border-bottom-color: black;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  padding: 5px 0;
`;

const StyledInput = styled(TextInput)`
  height: 40px;
  border: 2px solid black;
  padding: 5px;
  background: #fff;
`;

const TypesContainer = styled(View)`
  padding: 0 10px;
`;

const venues = ["Bar", "Club", "Concert", "Karaoke", "Happy Hour", "Festival"];

const Filters = () => {
  const [distanceFilter, setDistanceFilter] = useState("");

  return (
    <Container>
      <SectionTitle>
        <StyledText>Filter by</StyledText>
      </SectionTitle>
      <TypesContainer>
        <Expandable title="Venue Type">
          {venues.map((e) => (
            <StyledText key={e}>{e}</StyledText>
          ))}
        </Expandable>
        <Expandable title="Distance">
          <Input
            onChangeText={setDistanceFilter}
            value={distanceFilter}
            placeholder="distance"
            keyboardType="number-pad"
          />
        </Expandable>
      </TypesContainer>
    </Container>
  );
};

export default Filters;
