import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
  const navigation = useNavigation();

  const [data, setData] = useState<Book[] | any>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      (async () => {
        try {
          setLoading(true);
          const response = await getDocs(collection(db, "library"));
          if (response.size === 0) {
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
            console.error(
              "There isn't any document in the API:",
              error.message
            );
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    [
      /* db */
    ]
  );

  return (
    <>
      <View style={styles.containerCenter}>
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
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) =>
            item && (
              <Pressable
                onPress={() =>
                  /* props.navigation.navigate("Details", { itemId: item.id }) */
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
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.navigate("Create")}
        >
          <Text style={styles.buttonText}>Añade un libro</Text>
        </Pressable>
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
          onPress={() => navigation.goBack()}
        />
      </View>
    </>
  );
};

export { Library };
