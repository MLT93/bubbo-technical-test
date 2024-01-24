import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Pressable, FlatList } from "react-native";

const Library = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  return (
    <>
      <ScrollView>
        <Pressable onPress={() => props.navigation.navigate("Create")}>
          <Text>Add a new book</Text>
        </Pressable>
      </ScrollView>
      <View>
        <Text>Lista de Libros</Text>
      </View>
{/*       <FlatList>

      </FlatList> */}
    </>
  );
};

export default Library;
