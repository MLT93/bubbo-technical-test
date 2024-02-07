import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { appFirebase } from "../../../credentials.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { Book } from "../../../utils/utils.js";
import { styles } from "../../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";

const db = getFirestore(appFirebase);

const Library = (props: {
  navigation: {
    navigate: (
      arg0: string,
      {
        arg1: {},
      }?: Object
    ) => void;
  };
}) => {
  // Hook de navegación entre componentes anidados sin necesidad de pasar la prop.navigation.navigate() a través de la jerarquía de componentes
  const navigation = useNavigation();
  // Llamada a la API
  const [data, setData] = useState<any | Book[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getDocs(collection(db, "library"));
        const dbLength = response.size;
        if (dbLength === 0) {
          throw new Error(`404 - Not Found`);
        }
        console.log("Length of Object[]:", response.size);
        const books = response.docs.map((doc) => {
          return {
            id: doc.id,
            doc: doc.data(),
          };
        });
        setData(books);
      } catch (error) {
        if (error instanceof Error) {
          console.error("There isn't any document in the API:", error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [db]);
  // JSX.Element
  return (
    <>
      <View style={styles.containerBetween}>
        <Text style={styles.titleText}>LISTA DE LIBROS</Text>
        {loading && (
          <View style={styles.containerCenter}>
            <Text style={styles.subtitleText}>Is Loading...</Text>
          </View>
        )}
        {error && (
          <View style={styles.containerCenter}>
            <Text style={styles.subtitleText}>{`${error}`}</Text>
          </View>
        )}
        <View style={styles.containerFlatListCenter}>
          <FlatList
            style={styles.flatListText}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) =>
              item && (
                <Pressable
                  onPress={() =>
                    props.navigation.navigate("Details", {
                      itemId: item.id,
                    })
                  }
                >
                  <Text>
                    {index}. {item.doc.title}
                  </Text>
                </Pressable>
              )
            }
          />
        </View>
        <View style={styles.containerCenterEnd}>
          <Button
            title="AÑADE UN LIBRO"
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{
              width: 200,
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
            onPress={() => props.navigation.navigate("Create")}
          />
          <Button
            title="HOME"
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{
              width: 200,
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
            onPress={() => {
              navigation.goBack();
              navigation.navigate("HOME" as never);
            }}
          />
        </View>
      </View>
    </>
  );
};

export { Library };
