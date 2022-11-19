import React from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Rating = ({ rating }) => {
  return (
    <Container>
      {[
        ...Array(5)
          .fill(1)
          .map((star, index) => {
            if (index + 1 <= Math.floor(rating)) {
              return (
                <FontAwesome key={index} name="star" size={30} color="black" />
              );
            }
            if (
              Number(rating % Math.floor(rating).toFixed(1)) > 0.2 &&
              Math.floor(rating) === index
            ) {
              return (
                <FontAwesome
                  key={index}
                  name="star-half-full"
                  size={30}
                  color="black"
                />
              );
            }
            return (
              <FontAwesome key={index} name="star-o" size={30} color="black" />
            );
          }),
      ]}
    </Container>
  );
};

export default Rating;
