import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { styles } from "../../../styles/styles";
import DatePicker from "react-datepicker";

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
  // Actualización del input date
  const [startDate, setStartDate] = useState(new Date());
  const handleInputOnChangeDate = (date: string, dateValue: string) =>
    setBook({ ...book, [date]: dateValue });
  // Toggle
  const [visible, setVisible] = useState(false);
  const handleToggle = () => {
    setVisible(!visible);
  };
  // Deshabilitar el botón de guardado si no están todos los campos llenos y sin espacios de más
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    book.title.trim() !== "" &&
    book.author.trim() !== "" &&
    book.genre.trim() !== "" &&
    book.date.trim() !== ""
      ? setIsDisabled(false)
      : setIsDisabled(true);
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

          {/* <TextInput
          placeholder="Fecha de publicación"
          onChange={(value) => handleInputOnChangeDate("date", value)}
          value={book.date}
        /> */}
          <DatePicker
            isClearable
            selected={startDate}
            onChange={(value: any) => handleInputOnChangeDate("date", value)}
          />
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
