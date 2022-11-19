import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import H1 from "../Common/H1";
import Event from "../Event/Event";
import withModal from "../hoc/withModal";
import BackButton from "../Common/BackButton/BackButton";
import EventModal from "../Event/EventModal";
import { getVenue } from "../api/apis/getVenue";
import dayjs from "dayjs";

const Container = styled(View)`
  background: #282736;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  height: 100%;
`;

const SectionTitle = styled(H1)`
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 19px;
`;

const StyledText = styled(Text)`
  color: #9fa4b7;
  margin-bottom: 20px;
`;

const ImageContainer = styled(View)`
  position: relative;
`;

const ImageOverlay = styled(View)`
  position: absolute;
  background-color: #000000;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  bottom: 0;
`;

const VenuePicture = styled(Image)`
  width: 100%;
  height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const InfoContainer = styled(View)`
  padding: 12px 19px;
  height: 90%;
`;

const EventWrapper = styled(View)`
  margin-bottom: 11px;
`;
const Header = styled(View)`
  padding-top: 60px;
  display: flex;
  flex-direction: row;
`;

const TitleWrapper = styled(View)`
  flex: 1;
  text-align: center;
`;

const DrawerWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

const Venue = ({
  data,
  id,
  setModal,
  isInModal,
  setTopLayerContent,
  setActiveNav,
  navigation,
}) => {
  const [venue, setVenue] = useState(data);
  const [selectedDrawer, setSelectedDrawer] = useState("new");

  useEffect(() => {
    if (!isInModal && id) {
      (async () => {
        const venue = await getVenue(id || data.id)
          .then((res) => res.data)
          .catch((e) => console.log(e));
        setVenue(venue.data);
      })();
    }
  }, [isInModal, data]);

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

  const handleUnauthorizedLike = () => {
    navigation.navigate("Home");
    setActiveNav("account");
    setTopLayerContent(null);
  };

  const renderEvents = () => {
    if (venue?.events?.length > 0) {
      if (isInModal) {
        return (
          <EventWrapper>
            <Event
              data={venue.events[0]}
              onUnauthorizedLike={handleUnauthorizedLike}
            />
          </EventWrapper>
        );
      } else {
        const filter = selectedDrawer === "new" ? "isBefore" : "isAfter";
        return (
          <>
            <DrawerWrapper>
              <TouchableOpacity
                onPress={() => setSelectedDrawer("new")}
                style={{
                  marginRight: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: selectedDrawer === "new" ? "#12e2f6" : "#5c5e6f",
                    fontSize: 17,
                  }}
                >
                  Upcoming Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedDrawer("past")}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: selectedDrawer === "past" ? "#12e2f6" : "#5c5e6f",
                    fontSize: 17,
                  }}
                >
                  Past Events
                </Text>
              </TouchableOpacity>
            </DrawerWrapper>
            <ScrollView vertical>
              {venue.events
                .filter((e) => dayjs()?.[filter](dayjs(e.date)))
                .sort((a, b) => {
                  if (dayjs(a.date).isBefore(dayjs(b.date))) {
                    return -1;
                  }
                  if (!dayjs(a.date).isBefore(dayjs(b.date))) {
                    return 1;
                  }
                  return 0;
                })
                .map((e) => (
                  <TouchableOpacity
                    onPress={() => handleEventPress(e)}
                    key={e.id}
                  >
                    <EventWrapper>
                      <Event
                        data={e}
                        onUnauthorizedLike={handleUnauthorizedLike}
                      />
                    </EventWrapper>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </>
        );
      }
    } else {
      return <Text>No events listed</Text>;
    }
  };
  return (
    <Container>
      {isInModal ? (
        <ImageContainer>
          <VenuePicture
            source={{
              uri: `https://monkfish-app-n3daw.ondigitalocean.app${venue?.profilePicUrl}`,
            }}
          />
          <ImageOverlay />
          <SectionTitle>{venue.name}</SectionTitle>
        </ImageContainer>
      ) : (
        <Header>
          <BackButton onPress={() => setTopLayerContent(null)} />
          <TitleWrapper>
            <SectionTitle>{venue.name}</SectionTitle>
          </TitleWrapper>
        </Header>
      )}
      <InfoContainer>
        <StyledText numberOfLines={isInModal ? 6 : 0}>
          {venue.description}
        </StyledText>
        {renderEvents()}
      </InfoContainer>
    </Container>
  );
};

export default withModal(Venue);
