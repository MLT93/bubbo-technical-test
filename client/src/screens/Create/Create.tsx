import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { styles } from "../../../styles/styles";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

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
  const handleInputOnChangeDate = (date: string, dateValue: string) => {
    setBook({ ...book, [date]: dateValue });
  };
  const initialDate = getFormatedDate(new Date(), "YYYY/MM/DD");
  const [placeholderDate, setPlaceholderDate] = useState(
    "Fecha de publicación"
  );
  const handleChangeInitialDate = (propDate: React.SetStateAction<string>) => {
    setPlaceholderDate(propDate);
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
  }, [book]);
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
    } catch (err: any) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      if (err instanceof SyntaxError) {
        console.error(err.message);
      }
      if (err instanceof TypeError) {
        console.error(err.message);
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // Reset de los campos escritos
  const handleResetForm = () => {
    setBook({ title: "", author: "", genre: "", date: "" });
  };
  // Focus sobre el primer input del formulario
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <View style={styles.containerCenter}>
        <Text style={styles.titleText}>AÑADE INFORMACIÓN</Text>
        {loading && <Text>Is Loading...</Text>}
        {error && (
          <View>
            <Text>{`${error}`}</Text>
          </View>
        )}
        <View>
          <TextInput
            placeholder="Titulo"
            ref={inputRef}
            onChangeText={(value) =>
              handleInputOnChangeText("title", value.toLocaleUpperCase())
            }
            value={book.title}
          />

          <TextInput
            placeholder="Autor"
            onChangeText={(value) => handleInputOnChangeText("author", value)}
            value={book.author}
          />

          <TextInput
            placeholder="Género"
            onChangeText={(value) => handleInputOnChangeText("genre", value)}
            value={book.genre}
          />

          <TouchableOpacity onPress={handleToggle}>
            <Text>{placeholderDate}</Text>
          </TouchableOpacity>
          <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.containerCenter}>
              <View style={styles.containerModal}>
                <DatePicker
                  mode="calendar"
                  maximumDate={initialDate}
                  selected={book.date}
                  onDateChange={handleChangeInitialDate}
                  onSelectedChange={(dateValue) =>
                    handleInputOnChangeDate("date", dateValue)
                  }
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
                <TouchableOpacity style={styles.button} onPress={handleToggle}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={handleSubmitSavedBook}
            disabled={isDisabled}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleResetForm}>
            <Text style={styles.buttonText}>Restablecer</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => props.navigation.navigate("Library")}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export { Create };
