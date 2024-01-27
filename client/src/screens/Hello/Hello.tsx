import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Hello = () => {
  const navigation = useNavigation();

  const [like, setLike] = useState(0);
  const [unlike, setUnlike] = useState(0);
  const [showThumbUp, setShowThumbUp] = useState(true);

  const onIncrement = () => {
    setLike(like + 1);
    setShowThumbUp(true);
  };

  const onDecrement = () => {
    if (like > 0) {
      setUnlike(unlike + 1);
      setShowThumbUp(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to Bubbo's library</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <Text>Yeah! Thumb up!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDecrement}>
          <Text>I don't like</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>👍 {like}</Text>
        <Text style={styles.counterText}>👎 {unlike}</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Crud" as never)}
        >
          <Text>Going on! {showThumbUp}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    gap: 10,
  },
  buttonContainer: {
    gap: 10,
    textAlign: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "lightskyblue",
    padding: 20,
    fontWeight: "700",
    borderWidth: 2,
    borderColor: "blue",
  },
  counterText: {
    fontSize: 16,
  },
});

export { Hello };
