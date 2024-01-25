import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Create } from "./src/screens/Create/Create";
import { Library } from "./src/screens/Library/Library";

export default function App() {
  const Tab = createBottomTabNavigator();

  const MyStack = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Create" component={Create} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
