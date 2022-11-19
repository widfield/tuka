import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ onPress }) => (
  <Pressable onPress={onPress}>
    <Ionicons name="arrow-back-outline" size={40} color="#12e2f6" />
  </Pressable>
);

export default BackButton;
