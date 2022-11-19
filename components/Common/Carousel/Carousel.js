import React from "react";
import styled from "styled-components";
import { View, ScrollView } from "react-native";

const ItemWrapper = styled(View)`
  margin-right: 10px;
`;

const CarouselConteiner = ({ data, Item, onItemPress }) => {
  return (
    <ScrollView horizontal>
      {data.map((e) => (
        <ItemWrapper key={e.id} onPress={onItemPress}>
          <Item data={e} onItemPress={onItemPress} />
        </ItemWrapper>
      ))}
    </ScrollView>
  );
};

export default CarouselConteiner;
