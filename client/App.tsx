import React from "react";
import { Navigation } from "./src/navigation/Navigation";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <Navigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
