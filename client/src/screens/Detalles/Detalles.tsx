import React, { useEffect, useState } from "react";
import {
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { appFirebase } from "../../../credentials";
import { Alert, View /* , Text */ } from "react-native";
import { Button, ButtonGroup, withTheme, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles/styles";

const db = getFirestore(appFirebase);

const Detalles = ({ route }: { route: any }) => {
  // Hook de navegación entre componentes anidados sin necesidad de pasar la prop.navigation.navigate() a través de la jerarquía de componentes
  const navigation = useNavigation();
  // Llamada a la API para conseguir un solo documento
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
  // Eliminar el documento
  const remove = async () => {
    try {
      await deleteDoc(docRef);
      console.log("Document deleted ID:", route.params.itemId);
      navigation.navigate("HOME" as never);
    } catch (error) {
      console.error("Can not remove the document:", error);
    }
  };
  // JSX.Element
  return (
    <>
      <View style={styles.containerBetween}>
        <Text style={styles.titleText}>DETALLES</Text>
        {error && (
          <View style={styles.containerCenter}>
            <Text style={styles.subtitleText}>{`${error}`}</Text>
          </View>
        )}
        {bookDataById && (
          <View style={styles.containerCenter}>
            <Text>Title: {bookDataById.title}</Text>
            <Text>Date: {bookDataById.date}</Text>
            <Text>Author: {bookDataById.author}</Text>
            <Text>Genre: {bookDataById.genre}</Text>
          </View>
        )}
        <View style={styles.containerCenterEnd}>
          <View style={styles.containerCenterRow}>
            <Button
              title="MODIFICAR"
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 200,
              }}
              buttonStyle={{
                backgroundColor: "#5f009e",
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
              onPress={() => console.log("Modificar elemento")}
            />
            <Button
              title="BORRAR"
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 200,
              }}
              buttonStyle={{
                backgroundColor: "#bb1717",
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
                remove();
                navigation.goBack();
                navigation.navigate("HOME" as never);
              }}
            />
          </View>
          <Button
            title="VOLVER"
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
              /* navigation.navigate("HOME" as never); */
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </>
  );
};

export { Detalles };
