import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles/styles";

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
    <View style={styles.containerCenter}>
      <Text style={styles.titleText}>Welcome to Bubbo's library</Text>
      <View style={styles.containerCenter}>
        <View style={styles.containerCenterRow}>
          <TouchableOpacity style={styles.button} onPress={onIncrement}>
            <Text style={styles.buttonText}>Yeah! Thumb up!</Text>
          </TouchableOpacity>
          <View style={styles.containerCenter}>
            <Text style={styles.normalText}>👍</Text>
            <Text style={styles.normalText}>{like}</Text>
          </View>
        </View>
        <View style={styles.containerCenterRow}>
          <TouchableOpacity style={styles.button} onPress={onDecrement}>
            <Text style={styles.buttonText}>I don't like</Text>
          </TouchableOpacity>
          <View style={styles.containerCenter}>
            <Text style={styles.normalText}>👎</Text>
            <Text style={styles.normalText}>{unlike}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonStretch}>
        <TouchableOpacity onPress={() => navigation.navigate("Crud" as never)}>
          <Text style={styles.buttonText}>Going on! {showThumbUp}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Hello };
