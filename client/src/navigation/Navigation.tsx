import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Create } from "../screens/Create/Create";
import { Library } from "../screens/Library/Library";
import { Hello } from "../screens/Hello/Hello";
import { Read } from "../screens/Read/Read";

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
        <Stack.Screen name="Read" component={Read} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Hello} options={{}} />
        <Tab.Screen name="Crud" component={MyCrudStack} options={{}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { Navigation };
