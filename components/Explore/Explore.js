import React, { useState } from "react";
import styled from "styled-components";
import CarouselConteiner from "../Common/Carousel/Carousel";
import { View, Text } from "react-native";
import VenueThumbnail from "../Venue/VenueThumbnail ";
// import { getUpcomingEvents } from "../api/apis/getUpcomingEvents";
import withModal from "../hoc/withModal";
import EventModal from "../Event/EventModal";

const Wrapper = styled(View)`
  background: #2d2c3c;
  width: 100%;
  height: 100%;
`;

const Heading = styled(Text)`
  color: #ffffff;
  font-size: 25px;

  padding-bottom: 20px;
`;

const Header = styled(View)`
  height: 120px;
  display: flex;
  padding: 0 19px;
  justify-content: flex-end;
`;

const Explore = ({ navigation, setModal }) => {
  const [events, setEvents] = useState([]);
  const handleEventClick = (event) => {
    setModal({
      content: <EventModal eventData={event} />,
      options: {
        height: 600,
        customStyles: {
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        },
      },
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     const data = await getUpcomingEvents()
  //       .then((res) => res.data)
  //       .catch((e) => console.log(e));
  //     setEvents(data.upcomingEvents);
  //   })();
  // }, []);

  return (
    <Wrapper>
      <Header>
        <Heading>Events & Venues</Heading>
      </Header>

      <CarouselConteiner
        data={events}
        Item={VenueThumbnail}
        onItemPress={handleEventClick}
      />
    </Wrapper>
  );
};

export default withModal(Explore);
