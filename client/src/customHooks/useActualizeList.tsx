import { useState, useEffect } from "react";
import { appFirebase } from "../../credentials";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { Book } from "../../utils/utils";

const useActualizeList = () => {
  const [listChanged, setListChanged] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirestore(appFirebase);
    const unsubscribe = onSnapshot(collection(db, "library"), (snapshot) => {
      const changedBooks: Book[] = [];
      snapshot.forEach((doc) => {
        changedBooks.push({
          id: doc.id,
          doc: doc.data(),
        });
      });
      setListChanged(changedBooks);
    }, (error) => {
      setError("Error fetching data: " + error.message);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [listChanged, error];
};

export { useActualizeList };


/* Ejemplo de uso: */

/**
 * 
 ** const MyComponent = () => {
 **   const [listChanged, error] = useActualizeList();
 *
 **   if (error) {
 **     return <View><Text>Error: {error}</Text></View>;
 **   }
 *
 **   if (!listChanged) {
 **     return <View><Text>Loading...</Text></View>;
 **   }
 *
 **   return (
 **     <View>
 **       <Text>List of Books:</Text>
 **       <FlatList
 **         data={listChanged}
 **         renderItem={({ item }) => <Text>{item.title}</Text>}
 **         keyExtractor={item => item.id}
 **       />
 **     </View>
 **   );
 ** }; 
 *  
 */
