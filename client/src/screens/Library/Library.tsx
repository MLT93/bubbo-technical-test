import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Book } from "../../../utils/utils.js";
import { styles } from "../../../styles/styles";

const db = getFirestore(appFirebase);

const Library = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<Book[]>([]);
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
              `There isn't any document in the API: ${error.message}.`
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
                  navigation.navigate("Details", { itemId: item.id })
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
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={styles.buttonText}>Añade un libro</Text>
        </Pressable>
      </View>
    </>
  );
};

export { Library };
