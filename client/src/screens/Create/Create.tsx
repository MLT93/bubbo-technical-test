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
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);

const Create = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    date: "",
  });
  const handleInputChangeText = (name: string, value: string) => {
    setBook({ ...book, [name]: value });
  };

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    book.title.trim() !== "" &&
    book.author.trim() !== "" &&
    book.genre.trim() !== "" &&
    book.date.trim() !== ""
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [book, setIsDisabled]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmitSavedBook = async () => {
    try {
      setLoading(true);
      const docAdded = await addDoc(collection(db, "library"), {
        ...book,
      });
      console.log(`Document written with ID: ${docAdded.id}`);
      Alert.alert(`Your book has been saved.`);
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
    setBook({ title: "", author: "", genre: "", date: "" });
  };

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
            onChangeText={(value) => handleInputChangeText("title", value)}
            value={book.title}
          />
        </View>
        <View>
          <TextInput
            placeholder="Autor"
            onChangeText={(value) => handleInputChangeText("author", value)}
            value={book.author}
          />
        </View>
        <View>
          <TextInput
            placeholder="Género"
            onChangeText={(value) => handleInputChangeText("genre", value)}
            value={book.genre}
          />
        </View>
        <View>
          <TextInput
            placeholder="Fecha de publicación"
            onChangeText={(value) => handleInputChangeText("date", value)}
            value={book.date}
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
