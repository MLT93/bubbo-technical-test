import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { appFirebase } from "../../../credentials.mjs";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { Book } from "../../utils";

const db = getFirestore(appFirebase);

const Library = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [data, setData] = useState<Book[]>([]);
  const [error, setError] = useState<null | unknown>(null);
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
          console.log(response.size);
          const books = response.docs.map((doc) => {
            return {
              id: doc.id,
              doc: doc.data(),
            };
          });
          setData(books);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`There is no document in the API: ${error.message}.`);
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
      {loading && <Text>Is Loading...</Text>}
      <ScrollView>
        <Pressable onPress={() => props.navigation.navigate("Create")}>
          <Text>Add a new book</Text>
        </Pressable>
        <View>
          <Text>Lista de Libros</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}:${item.id}`} // (property) keyExtractor?: ((item: DocumentData, index: number) => string) | undefined
          renderItem={({ item, index }) =>
            item && (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Show")}
              >
                <Text>INDEX: {index}</Text>
                <Text>TITLE: {item.doc.title}</Text>
                <Text>DATE: {item.doc.date}</Text>
                <Text>GENRE: {item.doc.genre}</Text>
                <Text>AUTHOR: {item.doc.author}</Text>
                <Text>UID: {item.id}</Text>
              </TouchableOpacity>
            )
          }
        />
      </ScrollView>
      {error && <Text>{`${error}`}</Text>}
    </>
  );
};

export { Library };
