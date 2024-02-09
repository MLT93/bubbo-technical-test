import React, { EffectCallback, useEffect, useRef, useState } from "react";
import { View, Text, Alert, TouchableOpacity, Modal } from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { styles } from "../../../styles/styles";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const db = getFirestore(appFirebase);

const Create = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  // Hook de navegación entre componentes anidados sin necesidad de pasar la prop.navigation.navigate() a través de la jerarquía de componentes
  const navigation = useNavigation();
  // Captura de los valores de cada input al escribir
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
  });
  const handleInputOnChangeText = (name: string, value: string) =>
    setBook({ ...book, [name]: value });
  // Toggle
  const [visible, setVisible] = useState(false);
  const handleToggle = () => setVisible(!visible);
  // Captura del input fecha, creación de placeholder y actualización del mismo
  const initialDate = getFormatedDate(new Date(), "YYYY/MM/DD");
  const [placeholderDate, setPlaceholderDate] = useState(
    "Fecha de publicación"
  );
  const handleInputOnChangeDate = (date: string, value: string) => {
    setBook({ ...book, [date]: value });
    setPlaceholderDate(value);
  };
  // Deshabilitar el botón de envío si no están todos los campos llenos y sin espacios de más
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const areFieldsFilled =
      book.title.trim() !== "" &&
      book.author.trim() !== "" &&
      book.genre.trim() !== "" &&
      book.publication_date.trim() !== "";

    setIsDisabled(!areFieldsFilled);
  }, [book, setIsDisabled]);
  // Llamada a la API Firestore y creación de un nuevo documento
  const [savingBook, setSavingBook] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmitSavedBook = async () => {
    try {
      setSavingBook(true);
      const docAdded = await addDoc(collection(db, "library"), {
        ...book,
      });
      if (!docAdded) {
        throw new Error("You got a problem adding book");
      }
      console.log("Document written with ID:", docAdded.id);
    } catch (error: any) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      if (error instanceof SyntaxError) {
        console.error(error.message);
      }
      setError(error);
    } finally {
      setSavingBook(false);
      Alert.alert("Your book has been saved!");
      props.navigation.navigate("HOME");
    }
  };
  // Focus sobre el primer input del formulario
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // Reset de los campos escritos
  const handleResetForm = () => {
    setBook({ title: "", author: "", genre: "", publication_date: "" });
    setPlaceholderDate("Fecha de publicación");
    inputRef.current?.focus();
  };
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
    if (book.title.length >= 71) {
      console.error(err.title);
      setTitleError(`${err.title.message}`);
    } else {
      setTitleError(``);
    }
    if (book.author.length >= 31) {
      console.error(err.author);
      setAuthorError(`${err.author.message}`);
    } else {
      setAuthorError(``);
    }
    if (book.genre.length >= 16) {
      console.error(err.genre);
      setGenreError(`${err.genre.message}`);
    } else {
      setGenreError(``);
    }
  }, [book.title, book.author, book.genre]);
  // JSX.Element
  return (
    <>
      <View style={styles.containerBetween}>
        <Text style={styles.titleText}>AÑADE TU LIBRO</Text>
        {savingBook && (
          <Modal animationType="fade" transparent={false}>
            <View style={styles.containerCenter}>
              <Text style={styles.subtitleText}>Guardando tu libro...</Text>
            </View>
          </Modal>
        )}
        {error && (
          <View style={styles.containerCenter}>
            <Text style={styles.subtitleText}>{`${error}`}</Text>
          </View>
        )}
        <View style={{}}>
          <Input
            placeholder="Titulo"
            errorStyle={{ color: "red" }}
            errorMessage={titleError}
            ref={inputRef}
            onChangeText={(value) => handleInputOnChangeText("title", value)}
            value={book.title}
          />

          <Input
            placeholder="Autor"
            errorStyle={{ color: "red" }}
            errorMessage={authorError}
            onChangeText={(value) => handleInputOnChangeText("author", value)}
            value={book.author}
          />

          <Input
            placeholder="Género"
            errorStyle={{ color: "red" }}
            errorMessage={genreError}
            onChangeText={(value) => handleInputOnChangeText("genre", value)}
            value={book.genre}
          />

          <View style={styles.placeholderContainer}>
            <TouchableOpacity onPress={handleToggle}>
              <Text
                style={{
                  ...styles.placeholderText,
                  color:
                    placeholderDate !== "Fecha de publicación"
                      ? "black"
                      : "#86939e",
                }}
              >
                {placeholderDate}
              </Text>
            </TouchableOpacity>
            <View style={styles.placeholderBottom}></View>
            <Text style={styles.placeholderBottomText}></Text>
          </View>
          <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.containerCenter}>
              <View style={styles.containerModal}>
                <DatePicker
                  mode="calendar"
                  maximumDate={initialDate}
                  onDateChange={(value) =>
                    handleInputOnChangeDate("publication_date", value)
                  }
                  selected={book.publication_date}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "white",
                    selectedTextColor: "white",
                    mainColor: "#469ab6",
                    textSecondaryColor: "white",
                    borderColor: "#7a92a51a",
                  }}
                />
                <Button
                  title="SELECCIONAR"
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
                    shadowColor: "#86939e",
                    shadowOpacity: 3,
                    shadowRadius: 4,
                    shadowOffset: {
                      width: 0,
                      height: 1.5,
                    },
                  }}
                  onPress={handleToggle}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.containerCenterEnd}>
          <View style={styles.containerCenterRow}>
            <Button
              title="GUARDAR"
              disabled={isDisabled}
              titleStyle={{ fontWeight: "700" }}
              containerStyle={{
                width: 200,
              }}
              buttonStyle={{
                backgroundColor: "#007900",
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
                handleSubmitSavedBook();
                navigation.goBack();
              }}
            />
            <Button
              title="RESTABLECER"
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
              onPress={handleResetForm}
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
              /* props.navigation.navigate("HOME"); */
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </>
  );
};

export { Create };
