import React, { useEffect, useState } from "react";

import Home from "../Home/Home";
import Login from "../Login/Login";
import Account from "../User/Account";
import * as SecureStore from "expo-secure-store";
import Venue from "../Venue/Venue";
import Explore from "../Explore/Explore";
import Register from "../Register/Register";
import Settings from "../Settings/Settings";

const Navigation = ({ stack }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      let result = await SecureStore.getItemAsync("name");
      setUser(result);
    })();
  }, []);

  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Account"
        component={Account}
        options={{
          title: "Account",
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Venue"
        //component={({ route }) => }
        options={{
          title: "Venue",
          headerShown: false,
        }}
      >
        {({ route, navigation }) => (
          <Venue
            data={route.params.data}
            isInModal={false}
            navigation={navigation}
          />
        )}
      </stack.Screen>
      <stack.Screen
        name="Explore"
        component={Explore}
        options={{
          title: "Explore",
          headerShown: false,
        }}
      />

      <stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default Navigation;
