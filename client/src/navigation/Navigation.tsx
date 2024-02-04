import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Create } from "../screens/Create/Create";
import { Library } from "../screens/Library/Library";
import { Hello } from "../screens/Hello/Hello";
import { Detalles } from "../screens/Detalles/Detalles";

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const MyCrudStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Library"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Details" component={Detalles} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HOME">
        <Tab.Screen name="HOME" component={Hello} options={{}} />
        <Tab.Screen name="CRUD" component={MyCrudStack} options={{}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { Navigation };
