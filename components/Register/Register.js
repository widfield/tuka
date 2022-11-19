import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Common/Input";
import { View, Text, ActivityIndicator, ToastAndroid } from "react-native";
import H1 from "../Common/H1";
import Button from "../Common/Button";
import * as Animatable from "react-native-animatable";
import * as SecureStore from "expo-secure-store";
import Link from "../Common/Link";
import { register } from "../api/apis/register";
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

const FieldsContainer = styled(Animatable.View)``;

const FieldWrapper = styled(View)`
  margin-bottom: 10px;
`;

const Subtext = styled(Text)`
  color: #9fa4b7;
  font-size: 15px;
  text-align: center;
  padding-top: 20px;
`;

const fieldsMap = {
  first_name: "First name",
  last_name: "Last name",
};

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const user = {
      email,
      password,
      password_verify: passwordConfirm,
      first_name: firstName,
      last_name: lastName,
    };

    const data = await register(user)
      .then((res) => res)
      .catch((e) => console.log(e));

    if (!!data.errors) {
      let message = data.errors[0].msg;
      if (data.errors[0].msg === "Invalid value") {
        message = `${fieldsMap[data.errors[0].param]} is required`;
      }
      setIsLoading(false);
      ToastAndroid.show(message, ToastAndroid.LONG);
      return;
    }
    const loginData = await login({ email, password }).then((res) => res.data);
    await SecureStore.setItemAsync("accessToken", loginData.data.accessToken);
    await SecureStore.setItemAsync("firstName", firstName);
    await SecureStore.setItemAsync("lastName", lastName);
    await SecureStore.setItemAsync("email", email);
    navigation.navigate("Home");
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Form>
        <Header>
          <H1>Sign up</H1>
        </Header>
        <FieldWrapper>
          <Input
            leftIcon="person-circle-outline"
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First name"
            autoComplete="name"
            autoCorrect={false}
            autoFocus={true}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            leftIcon="person-circle-outline"
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last name"
            autoComplete="name-family"
            autoCorrect={false}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            leftIcon="mail-outline"
            onChangeText={setEmail}
            value={email}
            placeholder="E-mail"
            autoComplete="email"
            autoCorrect={false}
            autoCapitalize="none"
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
        <FieldWrapper>
          <Input
            leftIcon="lock-closed-outline"
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoComplete="password-new"
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
                "Sign Up"
              )
            }
          />
        </ButtonWapper>
        <Subtext>OR</Subtext>
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
        Already have an account{" "}
        <Link onPress={() => navigation.navigate("Login")} label="Sign in" />
      </Subtext>
    </Wrapper>
  );
};

export default Register;
