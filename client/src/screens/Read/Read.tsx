import React, { useEffect, useState } from "react";
import { DocumentData, doc, getDoc, getFirestore } from "firebase/firestore";
import { appFirebase } from "../../../credentials";
import { View, Text } from "react-native";

const db = getFirestore(appFirebase);

const Read = ({ route }: { route: any }) => {
  const [bookDataById, setBookDataById] = useState<DocumentData | null>();
  const [error, setError] = useState<null | unknown>(null);
  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, "library", route.params.itemId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error(`No such document!`);
        } else {
          const bookDetails = docSnap.data();
          setBookDataById(bookDetails);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error getting document:", error);
          setError(error);
        }
      }
    })();
  }, [route.params.itemId]);
  return (
    <>
      <View>
        <Text>Details:</Text>
      </View>

      <View>
        {bookDataById && (
          <>
            <Text>Title: {bookDataById.title}</Text>
            <Text>Date: {bookDataById.date}</Text>
            <Text>Author: {bookDataById.author}</Text>
            <Text>Genre: {bookDataById.genre}</Text>
          </>
        )}
      </View>
    </>
  );
};

export { Read };
