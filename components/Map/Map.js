import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-map-clustering";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Input from "../Common/Input";
import Venue from "../Venue/Venue";
import * as Location from "expo-location";
import CarouselConteiner from "../Common/Carousel/Carousel";
import VenueThumbnail from "../Venue/VenueThumbnail ";
import { getVenues } from "../api/apis/getVenues";

const Container = styled(View)`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
`;

const InputContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

const MyLocationButton = styled(Pressable)`
  position: absolute;
  top: 105px;
  right: 10px;
  z-index: 10;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
    height: "50%",
    width: "100%",
    zIndex: 6,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    zIndex: 9999,
    position: "absolute",
  },
});

const CarouselWrapper = styled(View)`
  position: absolute;
  bottom: 10px;
`;

const HiddenCallout = styled(Text)`
  display: none;
`;

const Wrapper = styled(View)`
  top: 42px;
  z-index: 5;
  position: absolute;
  width: 100%;
  padding: 10px;
`;

const customMapStyle = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2C2D3C",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ color: "#252533" }],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [{ color: "#ffffff", visibility: "simplified" }],
  },
];

const Map = ({ setModal, setTopLayerContent, setActiveNav, navigation }) => {
  const [text, onChangeText] = useState("");
  const [location, setLocation] = useState({
    latitude: 42.6977,
    longitude: 23.3219,
  });
  const mapRef = useRef();
  const [venues, setVenues] = useState([]);

  const handleOpenVenueModal = (venue) => {
    setModal({
      content: (
        <Venue
          data={venue}
          isInModal={true}
          setTopLayerContent={setTopLayerContent}
          setActiveNav={setActiveNav}
          navigation={navigation}
        />
      ),
      options: {
        onPress: () =>
          setTopLayerContent(
            <Venue
              data={venue}
              isInModal={false}
              setTopLayerContent={setTopLayerContent}
              setActiveNav={setActiveNav}
              navigation={navigation}
            />
          ),
      },
    });
  };

  const handleLocationChange = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: 3,
    });
    setLocation(currentLocation.coords);
    mapRef.current.animateCamera({
      center: {
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      },
      zoom: 15,
    });
  };

  useEffect(() => {
    handleLocationChange();
  }, []);

  useEffect(() => {
    (async () => {
      const {
        data: { allVenues },
      } = await getVenues().then((res) => res.data);
      const formattedData = allVenues.map((e) => {
        const location = JSON.parse(e.mapPin);
        console.log(e);
        return {
          ...e,
          mapPin: {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          },
        };
      });
      setVenues(formattedData);
    })();
  }, []);

  return (
    <Container>
      <MyLocationButton onPress={handleLocationChange}>
        <Ionicons name="navigate-circle-outline" size={40} color="#12e2f6" />
      </MyLocationButton>
      <Wrapper>
        <InputContainer>
          <StyledInput
            leftIcon="search-outline"
            rightIcon="menu-outline"
            onChangeText={onChangeText}
            value={text}
            placeholder="Search here..."
          />
        </InputContainer>
      </Wrapper>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={customMapStyle}
        toolbarEnabled={false}
        clusterColor={"#12e2f6"}
      >
        {venues.map((e) => (
          <Marker
            key={e.id}
            coordinate={{
              latitude: e?.mapPin?.latitude,
              longitude: e?.mapPin?.longitude,
            }}
            title={e.name}
            onPress={() => handleOpenVenueModal(e)}
          >
            <Ionicons name="location-sharp" size={40} color="#12e2f6" />
            <Callout tooltip={true}>
              <HiddenCallout>hidden</HiddenCallout>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <CarouselWrapper>
        <CarouselConteiner
          Item={VenueThumbnail}
          data={venues}
          onItemPress={handleOpenVenueModal}
        />
      </CarouselWrapper>
    </Container>
  );
};

export default Map;
