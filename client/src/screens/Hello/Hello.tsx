import React, { useState } from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles/styles";
import { Button } from "@rneui/base";

// Obtener las dimensiones de la pantalla que se esté utilizando
const { width, height } = Dimensions.get("window");

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
    <View style={[styles.containerBetween, { backgroundColor: "#7a93a550" }]}>
      <Text style={styles.titleText}>WELCOME TO BUBBO LIBRARY</Text>
      <View style={styles.containerCenter}>
        <View style={styles.containerCenterRow}>
          <View style={styles.containerCenter}>
            <Button
              title={`Nice!`}
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 170,
              }}
              buttonStyle={{
                backgroundColor: "#5a9ae6",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 30,
                margin: 10,
                shadowColor: "#000000",
                shadowOpacity: 3,
                shadowRadius: 4,
                shadowOffset: {
                  width: 0,
                  height: 1.5,
                },
              }}
              onPress={() => onIncrement()}
            />
          </View>
          <Text style={[styles.normalText, { fontSize: 30 }]}>👍 {like}</Text>
        </View>
        <View style={styles.containerCenterRow}>
          <View style={styles.containerCenter}>
            <Button
              title={`Don't like!`}
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 170,
              }}
              buttonStyle={{
                backgroundColor: "#5a9ae6",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 30,
                margin: 10,
                shadowColor: "#000000",
                shadowOpacity: 3,
                shadowRadius: 4,
                shadowOffset: {
                  width: 0,
                  height: 1.5,
                },
              }}
              onPress={() => onDecrement()}
            />
          </View>
          <Text style={[styles.normalText, { fontSize: 30 }]}>👎 {unlike}</Text>
        </View>
      </View>
      <View style={[styles.containerCenterEnd]}>
        <View style={styles.containerCenterRow}>
          <Button
            title={`GOING ON!`}
            titleStyle={{ fontWeight: "900" }}
            containerStyle={{
              width: 300,
            }}
            buttonStyle={{
              backgroundColor: "#5a9ae6",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
              margin: 10,
              shadowColor: "#000000",
              shadowOpacity: 3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 1.5,
              },
            }}
            onPress={() => navigation.navigate("CRUD" as never)}
          />
        </View>
      </View>
    </View>
  );
};

export { Hello };
