import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { modalState, userState } from "./store/index";
import Navigation from "./components/Navigation/Navigation";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Navigation stack={Stack} />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
