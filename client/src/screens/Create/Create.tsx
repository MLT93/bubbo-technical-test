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
import axios from "axios";

const db = getFirestore(appFirebase);

const Create = (props: any) => {
  const [state, setState] = useState({
    titulo: "",
    autor: "",
    genero: "",
    fecha: "",
    isbn: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    state.titulo.trim() !== "" &&
    state.autor.trim() !== "" &&
    state.genero.trim() !== "" &&
    state.fecha.trim() !== "" &&
    state.isbn.trim() !== ""
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [state, setIsDisabled]);

  const handleInputChangeText = (name: string, value: string) => {
    setState({ ...state, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const URL = "https://my-json-server.typicode.com/typicode/demo/posts";
  const handleSubmitSavedBook = async () => {
    useEffect(() => {
      setLoading(true);
      (async () => {
        try {
          await addDoc(collection(db, "Library"), {
            ...state,
          });

          Alert.alert(`Éxito!`, `Tu Libro se ha guardado`);
          props;

          let response = await fetch(URL);

          if (!response.ok) {
            throw new Error(
              `Ocurrió un error. Response: ${response.ok}, Status: ${response.status}, StatusText: ${response.statusText}`
            );
          }

          console.log(`Response: ${response.status}`);

          const data = await response.json();

          console.log(data);

          setData(data.fact);
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
      })();
    }, [URL]);

    /*     useEffect(() => {
      setLoading(true);
      ((URL) => {
        axios
          .get(URL)
          .then((res: { data: any }) => setData(res.data))
          .catch((err) => {
            setError(err.message);
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
            console.log(`The process was finished`);
          });
      })(URL);
    }, [URL]); */
    // console.log(state);
  };

  const handleResetForm = () => {
    setState({ titulo: "", autor: "", genero: "", fecha: "", isbn: "" });
  };

  const [buttonColor, setButtonColor] = useState("#f30000ba");
  const { isbn } = state;
  if (isbn) {
    if (state.isbn.length > 10) {
      setButtonColor("#f30000ba");
    } else {
      setButtonColor("green");
    }
  }

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
            value={state.titulo}
          />
        </View>
        <View>
          <TextInput
            placeholder="Autor"
            onChangeText={(value) => handleInputChangeText("autor", value)}
            value={state.autor}
          />
        </View>
        <View>
          <TextInput
            placeholder="Género"
            onChangeText={(value) => handleInputChangeText("genero", value)}
            value={state.genero}
          />
        </View>
        <View>
          <TextInput
            placeholder="Fecha de publicación"
            onChangeText={(value) => handleInputChangeText("fecha", value)}
            value={state.fecha}
          />
        </View>
        <View>
          <TextInput
            placeholder="Código internacional"
            onChangeText={(value) => handleInputChangeText("isbn", value)}
            value={state.isbn}
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
    display: "flex",

    padding: 10,
    margin: 10,
    backgroundColor: "lightblue",
  },
  buttonText: {
    color: "white",
  },
});

export { Create };
