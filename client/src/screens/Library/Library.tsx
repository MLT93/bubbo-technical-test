import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { appFirebase } from "../../../credentials.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { Doc } from "../../../utils/utils.js";
import { styles } from "../../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";

// Iniciar la base de datos
const db = getFirestore(appFirebase);
// Obtener las dimensiones de la pantalla que se esté utilizando
const { width, height } = Dimensions.get("window");

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
  const [data, setData] = useState<any | Doc[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        // Set del loader antes de hacer la llamada a la base de datos
        setLoading(true);
        // Llamada sin actualizar lo que recibimos de la base de datos en el caso de que hubiese cambios (sin recargar la página)
        /**
         *
         **  const response = await getDocs(collection(db, "library"));
         **  const dbLength = response.size;
         *
         **  if (dbLength === 0) {
         **     throw new Error(`404 - Not Found`);
         **  }
         *
         **  console.log("Length of Object[]:", response.size);
         **  const books = response.docs.map((doc) => {
         **    return {
         **      id: doc.id,
         **      doc: doc.data(),
         **    };
         **  });
         *
         */
        // Llamada con actualizaciones al modificar la base de datos (recargando la página)
        const unsubscribeResponse = onSnapshot(
          collection(db, "library"),
          (snapshot) => {
            const books: Doc[] = [];
            snapshot.forEach((doc) => {
              books.push({
                id: doc.id,
                doc: doc.data(),
              });
            });
            setData(books);
          },
          async (error) => {
            setError("Error fetching data: " + error.message);
            console.error("Error fetching data: " + error.message);
            const response = await getDocs(collection(db, "library"));
            const dbLength = response.size;
            if (dbLength === 0) {
              throw new Error(`404 - Not Found`);
            }
            console.log("Length of Object[]:", response.size);
          }
        );
        return () => {
          unsubscribeResponse();
        };
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
      <View style={[styles.containerBetween, { backgroundColor: "#7a93a550" }]}>
        <Text style={styles.titleText}>LISTA DE LIBROS</Text>
        {loading && (
          <View style={styles.container}>
            <Text style={[styles.subtitleText, { paddingBottom: 7 }]}>
              Cargando...
            </Text>
            <ActivityIndicator size={"large"} color={"#5a9ae6"} />
          </View>
        )}
        {error && (
          <View style={styles.containerCenterEnd}>
            <Text style={styles.subtitleText}>{`${error}`}</Text>
          </View>
        )}
        <View style={[styles.containerFlatListCenter, styles.containerShadow]}>
          <FlatList
            style={{ width: "90%" }}
            data={data.sort((a: any, b: any) => {
              const titleA = a.doc.title.toLowerCase();
              const titleB = b.doc.title.toLowerCase();
              if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
              return 0;
            })}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) =>
              item && (
                <TouchableOpacity
                  style={{
                    paddingTop: 15,
                    paddingBottom: 5,
                    width: "100%",
                    borderBottomWidth: 1,
                    borderBottomColor: "",
                  }}
                  onPress={() =>
                    props.navigation.navigate("Details", {
                      itemId: item.id,
                    })
                  }
                >
                  <Text>
                    {index}. {item.doc.title.toLocaleUpperCase()}
                  </Text>
                </TouchableOpacity>
              )
            }
          />
        </View>
        <View style={styles.containerCenterEnd}>
          <Button
            title="AGREGAR"
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
            onPress={() => props.navigation.navigate("Create")}
          />
          <Button
            title="HOME"
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
