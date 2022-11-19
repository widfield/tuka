import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Common/Input";
import { View, Text, ActivityIndicator, ToastAndroid } from "react-native";
import H1 from "../Common/H1";
import Button from "../Common/Button";
import * as SecureStore from "expo-secure-store";
import Link from "../Common/Link";
import { login } from "../api/apis/login";

const Wrapper = styled(View)`
  background-color: #2d2c3c;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
`;

const Header = styled(View)`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Form = styled(View)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 25px;
  width: 100%;
  padding: 20px;
`;

const ButtonWapper = styled(View)`
  display: flex;
  padding-top: 16px;
`;

const AltLoginButtonWrapper = styled(View)`
  margin-top: 20px;
`;

const FieldWrapper = styled(View)`
  margin-bottom: 10px;
`;

const Subtext = styled(Text)`
  color: #9fa4b7;
  font-size: 15px;
  text-align: center;
  padding-top: 20px;
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = await login({ email, password }).then((res) => res);
    if (!!data.errors) {
      setIsLoading(false);
      ToastAndroid.show(data.errors[0], ToastAndroid.LONG);
      return;
    }
    await SecureStore.setItemAsync("accessToken", data.data.accessToken);
    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("firstName", "Test"); /// TODO
    await SecureStore.setItemAsync("lastName", "Guy"); /// TODO
    navigation.navigate("Home", { data });
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Form>
        <Header>
          <H1>TUKA</H1>
        </Header>

        <FieldWrapper>
          <Input
            leftIcon="mail-outline"
            onChangeText={setEmail}
            value={email}
            placeholder="E-mail"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            leftIcon="lock-closed-outline"
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
          />
        </FieldWrapper>
        <ButtonWapper>
          <Button
            onPress={handleSubmit}
            disabled={isLoading}
            title={
              isLoading ? (
                <ActivityIndicator size="small" color="#f146a0" />
              ) : (
                "Login"
              )
            }
          />
        </ButtonWapper>
        <AltLoginButtonWrapper>
          <Button
            onPress={handleSubmit}
            title="Continue with Google"
            leftIcon="logo-google"
            style={{ backgroundColor: "#ffffff" }}
            leftIconColor="#000000"
            labelColor="#000000"
          />
        </AltLoginButtonWrapper>
      </Form>
      <Subtext>
        Don't have an account{" "}
        <Link onPress={() => navigation.navigate("Register")} label="Sign up" />
      </Subtext>
      <Subtext>OR</Subtext>
      <Subtext>
        <Link
          onPress={() => navigation.navigate("Home")}
          label="Continue as guest"
        />
      </Subtext>
    </Wrapper>
  );
};

export default Login;
