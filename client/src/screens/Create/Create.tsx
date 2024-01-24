import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { appFirebase } from "../../../../server/src/firebase/credentials";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

const Create = (props: any) => {
  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    genero: "",
    fecha: "",
    isbn: "",
  });
  const handleInputChangeText = (name: string, value: string) => {
    setBook({ ...book, [name]: value });
  };

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    book.titulo.trim() !== "" &&
    book.autor.trim() !== "" &&
    book.genero.trim() !== "" &&
    book.fecha.trim() !== "" &&
    book.isbn.trim() !== ""
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [book, setIsDisabled]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmitSavedBook = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "bubbo-library"), {
        ...book,
      });
      Alert.alert(`Éxito!`, `Tu Libro se ha guardado`);
      props.navigation.navigate("Library");
    } catch (err: any) {
      setError(err);
      if (err instanceof SyntaxError) {
        console.error(`Error de sintaxis: ${err.message}`);
      }
      if (err instanceof TypeError) {
        console.error(`Error de tipo: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setBook({ titulo: "", autor: "", genero: "", fecha: "", isbn: "" });
  };

  /* const { isbn } = book;
  if (isbn) {
    if (book.isbn.length > 10) {
      setButtonColor("#f30000ba");
    } else {
      setButtonColor("green");
    }
  } */

  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      {loading && <Text>Is Loading...</Text>}
      <ScrollView>
        <Text>Insert information</Text>
        <View>
          <TextInput
            placeholder="Titulo"
            onChangeText={(value) => handleInputChangeText("titulo", value)}
            value={book.titulo}
          />
        </View>
        <View>
          <TextInput
            placeholder="Autor"
            onChangeText={(value) => handleInputChangeText("autor", value)}
            value={book.autor}
          />
        </View>
        <View>
          <TextInput
            placeholder="Género"
            onChangeText={(value) => handleInputChangeText("genero", value)}
            value={book.genero}
          />
        </View>
        <View>
          <TextInput
            placeholder="Fecha de publicación"
            onChangeText={(value) => handleInputChangeText("fecha", value)}
            value={book.fecha}
          />
        </View>
        <View>
          <TextInput
            placeholder="Código internacional"
            onChangeText={(value) => handleInputChangeText("isbn", value)}
            value={book.isbn}
          />
        </View>
      </ScrollView>
      <View>
        <Pressable
          style={styles.button}
          onPress={handleSubmitSavedBook}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
      {error && <Text>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
});

export { Create };
