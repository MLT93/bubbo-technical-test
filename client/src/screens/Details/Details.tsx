import React, { useEffect, useRef, useState } from "react";
import {
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { appFirebase } from "../../../credentials";
import { View, Dimensions, Modal } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles/styles";
import { InputForDoc } from "../../../utils/utils";
import { Alert } from "react-native";

// Iniciar la base de datos
const db = getFirestore(appFirebase);
// Obtener las dimensiones de la pantalla que se esté utilizando
const { width, height } = Dimensions.get("window");

const Details = ({ route }: { route: any }) => {
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
  }, [docRef]);
  // Eliminar el documento
  const handleRemoveDoc = async () => {
    try {
      await deleteDoc(docRef);
      console.log("Document deleted ID:", docRef.id);
      navigation.navigate("HOME" as never);
    } catch (error) {
      console.error("Can not remove the document:", error);
    } finally {
      navigation.goBack();
    }
  };
  // Modificar el documento
  const [modifyBook, setModifyBook] = useState<InputForDoc | DocumentData>({
    title: ``,
    author: ``,
    genre: ``,
    publication_date: ``,
  });
  const handleInputOnChangeText = (name: string, value: string) =>
    setModifyBook({ ...modifyBook, [name]: value });
  const [openModal, setOpenModal] = useState(false);
  const handleToggleModal = () => setOpenModal(!openModal);
  const handleUpdateDoc = async () => {
    try {
      await updateDoc(docRef, {
        title: modifyBook ? modifyBook.title : bookDataById?.title,
        author: modifyBook ? modifyBook.author : bookDataById?.author,
        genre: modifyBook ? modifyBook.genre : bookDataById?.genre,
        publication_date: modifyBook
          ? modifyBook.publication_date
          : bookDataById?.publication_date,
      });
      console.log("Document successfully updated!", docRef.id);
    } catch (error) {
      console.error(error);
    } finally {
      handleToggleModal();
    }
  };
  // Focus sobre el primer input del formulario
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // Errores
  const err = {
    title: new Error(`Max 70 caracteres`),
    author: new Error(`Max 30 caracteres`),
    genre: new Error(`Max 15 caracteres`),
  };
  const [titleError, setTitleError] = useState<string>("");
  const [authorError, setAuthorError] = useState<string>("");
  const [genreError, setGenreError] = useState<string>("");
  useEffect(() => {
    if (modifyBook.title.length >= 71) {
      console.error(err.title);
      setTitleError(`${err.title.message}`);
    } else {
      setTitleError(``);
    }
    if (modifyBook.author.length >= 31) {
      console.error(err.author);
      setAuthorError(`${err.author.message}`);
    } else {
      setAuthorError(``);
    }
    if (modifyBook.genre.length >= 16) {
      console.error(err.genre);
      setGenreError(`${err.genre.message}`);
    } else {
      setGenreError(``);
    }
  }, [modifyBook.title, modifyBook.author, modifyBook.genre]);
  // Confirmaciones
  const confirmationAlertUpdateDoc = () => {
    // Alert.alert("title", "text", [options])
    Alert.alert("Modificar Libro", "Estás seguro?", [
      // text: "el texto", style: "estilo del texto", onPress: () => {función al apretar}
      { text: "Si", style: "default", onPress: () => handleUpdateDoc() },
      { text: "No", style: "cancel", onPress: () => console.log(false) },
    ]);
  };
  const confirmationAlertDeleteDoc = () => {
    // Alert.alert("title", "text", [options])
    Alert.alert("Eliminar Libro", "Estás seguro?", [
      // text: "el texto", style: "estilo del texto", onPress: () => {función al apretar}
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => handleRemoveDoc(),
      },
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => console.log(false),
      },
    ]);
  };
  // JSX.Element
  return (
    <>
      <View style={[styles.containerBetween, { backgroundColor: "#7a93a550" }]}>
        <Text style={styles.titleText}>DETALLES</Text>
        {error && (
          <View style={styles.containerCenter}>
            <Text style={styles.subtitleText}>{`${error}`}</Text>
          </View>
        )}
        {bookDataById && (
          <View style={styles.containerShadow}>
            <View
              style={[
                styles.containerCenterRow,
                { padding: 7, alignItems: "baseline" },
              ]}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}
              >
                TÍTULO:
              </Text>
              <Text style={{ fontSize: 16 }}>{bookDataById.title}</Text>
            </View>

            <View
              style={[
                styles.containerCenterRow,
                { padding: 7, alignItems: "baseline" },
              ]}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}
              >
                FECHA:
              </Text>
              <Text style={{ fontSize: 16 }}>
                {bookDataById.publication_date}
              </Text>
            </View>

            <View
              style={[
                styles.containerCenterRow,
                { padding: 7, alignItems: "baseline" },
              ]}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}
              >
                AUTOR:
              </Text>
              <Text style={{ fontSize: 16 }}>{bookDataById.author}</Text>
            </View>

            <View
              style={[
                styles.containerCenterRow,
                { padding: 7, alignItems: "baseline" },
              ]}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}
              >
                GÉNERO:
              </Text>
              <Text style={{ fontSize: 16 }}>{bookDataById.genre}</Text>
            </View>
          </View>
        )}
        <Modal animationType="fade" transparent={true} visible={openModal}>
          <View style={styles.containerCenter}>
            <View style={styles.containerModal}>
              <Input
                style={[styles.placeholderText, { color: "#86939e" }]}
                placeholder={`Título ${bookDataById?.title}`}
                errorStyle={{ color: "red" }}
                errorMessage={titleError}
                ref={inputRef}
                onChangeText={(value) =>
                  handleInputOnChangeText("title", value)
                }
                value={modifyBook?.title}
              />

              <Input
                style={[styles.placeholderText, { color: "#86939e" }]}
                placeholder={`Autor ${bookDataById?.author}`}
                errorStyle={{ color: "red" }}
                errorMessage={authorError}
                onChangeText={(value) =>
                  handleInputOnChangeText("author", value)
                }
                value={modifyBook?.author}
              />

              <Input
                style={[styles.placeholderText, { color: "#86939e" }]}
                placeholder={`Género ${bookDataById?.genre}`}
                errorStyle={{ color: "red" }}
                errorMessage={genreError}
                onChangeText={(value) =>
                  handleInputOnChangeText("genre", value)
                }
                value={modifyBook?.genre}
              />

              <Input
                style={[styles.placeholderText, { color: "#86939e" }]}
                placeholder={`YYYY/MM/DD ${bookDataById?.publication_date}`}
                errorStyle={{ color: "red" }}
                errorMessage={genreError}
                onChangeText={(value) =>
                  handleInputOnChangeText("publication_date", value)
                }
                value={modifyBook?.publication_date}
              />
              <Button
                title="ENVIAR"
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
                  shadowColor: "#86939e",
                  shadowOpacity: 3,
                  shadowRadius: 4,
                  shadowOffset: {
                    width: 0,
                    height: 1.5,
                  },
                }}
                onPress={() => confirmationAlertUpdateDoc()}
              />
              <Button
                title="CANCELAR"
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
                  shadowColor: "#86939e",
                  shadowOpacity: 3,
                  shadowRadius: 4,
                  shadowOffset: {
                    width: 0,
                    height: 1.5,
                  },
                }}
                onPress={() => handleToggleModal()}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.containerCenterEnd}>
          <View style={styles.containerCenterRow}>
            <Button
              title="MODIFICAR"
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 170,
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
              onPress={() => {
                setOpenModal(true);
                navigation.navigate("CRUD" as never);
              }}
            />
            <Button
              title="BORRAR"
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 170,
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
              onPress={() => confirmationAlertDeleteDoc()}
            />
          </View>
          <Button
            title="VOLVER"
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
              navigation.navigate("CRUD" as never);
            }}
          />
        </View>
      </View>
    </>
  );
};

export { Details };

/*
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docById = await getDoc(docRef);
        if (!docById.exists()) {
          throw new Error(`No such document!`);
        } else {
          const bookDetails = docById.data();
          setBookDataById(bookDetails);
          setModifyBook(bookDetails); // Llenar el formulario con los detalles actuales del libro
        }
      } catch (error: any) {
        console.error("Error getting document:", error.message);
      }
    };

    fetchData();
  }, [docRef]);

  const handleUpdate = async () => {
    try {
      firestore().collection("library").doc(route.params.itemId).update({
        title: modifyBook.title,
        author: modifyBook.author,
        genre: modifyBook.genre,
        publication_date: modifyBook.publication_date,
      });
      console.log("Document successfully updated!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      {bookDataById && (
        <View style={styles.containerCenter}>
          <Text>Title: {bookDataById.title}</Text>
          <Text>Date: {bookDataById.publication_date}</Text>
          <Text>Author: {bookDataById.author}</Text>
          <Text>Genre: {bookDataById.genre}</Text>
        </View>
      )}
      <View style={styles.containerCenter}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(text) => setModifyBook({ ...modifyBook, title: text })}
          value={modifyBook.title}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          onChangeText={(text) => setModifyBook({ ...modifyBook, author: text })}
          value={modifyBook.author}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          onChangeText={(text) => setModifyBook({ ...modifyBook, genre: text })}
          value={modifyBook.genre}
        />
        <TextInput
          style={styles.input}
          placeholder="Publication Date"
          onChangeText={(text) => setModifyBook({ ...modifyBook, publication_date: text })}
          value={modifyBook.publication_date}
        />
        <Button title="Update" onPress={handleUpdate} />
      </View>
    </>
  );
  
*/
