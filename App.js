import 'react-native-gesture-handler';
// FIND OUT IF YOU NEED TO PUT THIS LIME 1 IN EVERY
// FILE OF THE APP
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider, MD3DarkTheme, useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainDrawer from "./src/utilities/components/MainDrawer";
import { BlurView } from 'expo-blur';
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";


const Stack = createStackNavigator();


const App = () => {
  //let theme = useTheme();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Drawer"
        >
          <Stack.Screen
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />

          <Stack.Screen
            name="Drawer"
            component={MainDrawer}
          />
        </Stack.Navigator>

        {/*
        <Stack.Navigator
          screenOptions={{
            header: (props) => <MyHeader {...props} />
          }}
        >
          <Stack.Screen
            name="home"
            options={{
              title: "Home"
            }}
            component={Home}
          />


        </Stack.Navigator>*/}
      </NavigationContainer>

    </PaperProvider >
  )
}


export default App;


/*headerTitleAlign: "center",
            presentation: "transparentModal",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            headerShadowVisible: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerLeft: () => null,
            headerStatusBarHeight: 45,
            headerTitleStyle: { fontSize: 30 },
            gestureEnabled: true*/

