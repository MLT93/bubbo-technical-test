import React, { useEffect, useRef, useState } from "react";
import { View, Text, Alert, TouchableOpacity, Modal } from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { styles } from "../../../styles/styles";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";

const db = getFirestore(appFirebase);

const Create = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  // Captura de los valores de cada input al escribir
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    date: "",
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
      book.date.trim() !== "";

    setIsDisabled(!areFieldsFilled);
  }, [book, setIsDisabled]);
  // Llamada a la API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmitSavedBook = async () => {
    try {
      setLoading(true);
      const docAdded = await addDoc(collection(db, "library"), {
        ...book,
      });
      if (!docAdded) {
        throw new Error("You got a problem adding book");
      }
      console.log("Document written with ID:", docAdded.id);
      Alert.alert("Your book has been saved!");
      props.navigation.navigate("Library");
    } catch (error: any) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      if (error instanceof SyntaxError) {
        console.error(error.message);
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  // Focus sobre el primer input del formulario
  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // Reset de los campos escritos
  const handleResetForm = () => {
    setBook({ title: "", author: "", genre: "", date: "" });
    setPlaceholderDate("Fecha de publicación");
    inputRef.current?.focus();
  };
  // Errores
  const err = new Error(`Max 30 caracteres`);
  const [authorError, setAuthorError] = useState<any>();
  useEffect(() => {
    if (book.author.length >= 3) {
      console.error(err);
      setAuthorError(`${err.message}`);
      authorError === true ? `${err}` : null;
    }
  }, [book.author]);

  return (
    <>
      <View style={styles.containerBetween}>
        <Text style={styles.titleText}>AÑADE INFORMACIÓN</Text>
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
        <View style={{}}>
          <Input
            placeholder="Titulo"
            errorStyle={{ color: "red" }}
            errorMessage={"Create an error"}
            ref={inputRef}
            onChangeText={(value) =>
              handleInputOnChangeText("title", value.toLocaleUpperCase())
            }
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
            /**
             * ToDo: crear un error para la correcta visualización de los caracteres
             */
            errorMessage={"Create an error"}
            onChangeText={(value) => handleInputOnChangeText("genre", value)}
            value={book.genre}
          />

          <View style={styles.placeholderContainer}>
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.placeholderText}>{placeholderDate}</Text>
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
                    handleInputOnChangeDate("date", value)
                  }
                  selected={book.date}
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
                  title="CERRAR"
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
              onPress={handleSubmitSavedBook}
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
            onPress={() => props.navigation.navigate("Library")}
          />
        </View>
      </View>
    </>
  );
};

export { Create };
