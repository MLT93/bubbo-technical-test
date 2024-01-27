import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { appFirebase } from "../../../credentials.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Book } from "../../utils";

const db = getFirestore(appFirebase);

const Library = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<Book[]>([]);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      (async () => {
        try {
          setLoading(true);
          const response = await getDocs(collection(db, "library"));
          if (response.size === 0) {
            throw new Error(`404 - Not Found`);
          }
          console.log("Length of Object[]:", response.size);
          const books = response.docs.map((doc) => {
            return {
              id: doc.id,
              doc: doc.data(),
            };
          });
          setData(books);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`There is no document in the API: ${error.message}.`);
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    [
      /* db */
    ]
  );

  return (
    <>
      {loading && (
        <View>
          <Text>Is Loading...</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Text>Add a new book</Text>
      </TouchableOpacity>
      <View>
        <Text>Lista de Libros</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          item && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Read", { itemId: item.id })}
            >
              <View>
                <Text>
                  {index}. {item.doc.title.toLocaleUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }
      />
      {error && (
        <View>
          <Text>{`${error}`}</Text>
        </View>
      )}
    </>
  );
};

export { Library };
