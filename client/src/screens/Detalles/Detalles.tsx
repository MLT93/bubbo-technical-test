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
import { Button, ButtonGroup, withTheme /* Text */ } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles/styles";

const db = getFirestore(appFirebase);

const Detalles = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const docRef = doc(db, "library", route.params.itemId);
  const [bookDataById, setBookDataById] = useState<DocumentData | null>();
  const [error, setError] = useState(null);
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
      } catch (error: any) {
        if (error instanceof Error) {
          console.error("Error getting document:", error.message);
        }
        setError(error.message);
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
      <View style={styles.containerCenter}>
        <Text style={styles.titleText}>DETALLES</Text>
        {error && (
          <View style={styles.containerCenter}>
            <Text style={styles.subtitleText}>{`${error}`}</Text>
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

export { Detalles };
