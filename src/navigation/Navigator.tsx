import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import SignInScreen from "../screens/Auth/SignInScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { GetKey } from "../utils/SecureStorage";
import { setLoggedIn } from "../store/UserSlice";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import OnBoardingScreen from "../screens/Auth/OnBoardingScreen";
import { SupabaseContext } from "../context/SupabaseContext";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { user } = useContext(SupabaseContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen
              name={DrawerNavigator.name}
              component={DrawerNavigator.component}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={OnBoardingScreen.name}
              component={OnBoardingScreen.component}
            />
            <Stack.Screen
              name={SignInScreen.name}
              component={SignInScreen.component}
            />
            <Stack.Screen
              name={SignUpScreen.name}
              component={SignUpScreen.component}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
