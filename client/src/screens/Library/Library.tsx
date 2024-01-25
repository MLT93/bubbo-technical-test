import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, Pressable, FlatList } from "react-native";
import { appFirebase } from "../../../credentials.mjs";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  FirestoreError,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const db = getFirestore(appFirebase);

const Library = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getDocs(collection(db, "library"));
        if (response.size === 0) {
          throw new Error(`404 - Not Found`);
        }
        console.log(response.size);
        const books = response.docs.map((doc) => doc.data());
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
  }, [db]);

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
          keyExtractor={(index) => String(index)} // (property) keyExtractor?: ((item: DocumentData, index: number) => string) | undefined
          renderItem={({ item, index }) =>
            item && (
              <View>
                <Text>id: {index}</Text>
                <Text>title: {item.title}</Text>
                <Text>author: {item.author}</Text>
                <Text>genre: {item.genre}</Text>
                <Text>date: {item.date}</Text>
              </View>
            )
          }
        />
      </ScrollView>
      {error && <Text>{`${error}`}</Text>}
    </>
  );
};

export { Library };
