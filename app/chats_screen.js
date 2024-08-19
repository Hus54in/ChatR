import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function ChatsScreen(data, styles) {
  return (
    <FlatList
      styles={styles}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
Data = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
];

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{item.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  text: {
    color: "white",
  },
});
