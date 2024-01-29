import React, { useEffect, useState } from "react";
import {
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { appFirebase } from "../../../credentials";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles/styles";

const db = getFirestore(appFirebase);

const Detalles = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const docRef = doc(db, "library", route.params.itemId);
  const [bookDataById, setBookDataById] = useState<DocumentData | null>();
  const [error, setError] = useState<null | unknown>(null);
  useEffect(() => {
    (async () => {
      try {
        const docById = await getDoc(docRef);
        if (!docById.exists()) {
          throw new Error(`No such document!`);
        } else {
          const bookDetails = docById.data();
          setBookDataById(bookDetails);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error getting document:", error);
          setError(error);
        }
      }
    })();
  }, [route.params.itemId]);
  const remove = async () => {
    try {
      await deleteDoc(docRef);
      console.log("Document deleted ID:", route.params.itemId);
      navigation.goBack();
    } catch (error) {
      console.error("Can not remove the document:", error);
    }
  };

  return (
    <>
      <View>
        <Text>DETALLES</Text>
      </View>
      {error && (
        <View>
          <Text>{`${error}`}</Text>
        </View>
      )}
      {bookDataById && (
        <View>
          <Text>Title: {bookDataById.title}</Text>
          <Text>Date: {bookDataById.date}</Text>
          <Text>Author: {bookDataById.author}</Text>
          <Text>Genre: {bookDataById.genre}</Text>
        </View>
      )}
      <Pressable style={{ backgroundColor: "red" }} onPress={() => remove()}>
        <Text>Delete</Text>
      </Pressable>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </Pressable>
    </>
  );
};

export { Detalles };
